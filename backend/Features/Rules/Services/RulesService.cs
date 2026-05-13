namespace Features.Rules.Services;

using System.Reflection;
using Common.Models;
using Features.Rules.Models;
using MongoDB.Driver;

public class RulesService(IMongoDatabase database)
{
    private readonly IMongoCollection<RulesConfig> _rulesConfigs = database.GetCollection<RulesConfig>("rulesConfigs");

    public RulesConfig GetDefaultRulesConfig()
    {
        return new RulesConfig();
    }

    public async Task<RulesConfig> CreateRulesConfig(RulesConfig rulesConfig)
    {
        var violations = ValidateRuleRelationships(rulesConfig);
        if (violations.Length > 0)
            throw new InvalidOperationException(string.Join("; ", violations));

        await _rulesConfigs.InsertOneAsync(rulesConfig);
        return rulesConfig;
    }

    public async Task<RulesConfig?> GetRulesConfigById(string id)
    {
        var fromDb = await _rulesConfigs.Find(r => r.Id == id).FirstOrDefaultAsync();
        if (fromDb == null) return null;
        return MergeWithDefaults(fromDb);
    }

    public async Task<bool> UpdateRulesConfig(string id, RulesConfig rulesConfig)
    {
        var violations = ValidateRuleRelationships(rulesConfig);
        if (violations.Length > 0)
            throw new InvalidOperationException(string.Join("; ", violations));

        rulesConfig.UpdatedAt = DateTime.UtcNow;
        var result = await _rulesConfigs.ReplaceOneAsync(r => r.Id == id, rulesConfig);
        return result.ModifiedCount > 0;
    }

    public async Task<bool> DeleteRulesConfig(string id)
    {
        var result = await _rulesConfigs.DeleteOneAsync(r => r.Id == id);
        return result.DeletedCount > 0;
    }

    // Only Value is persisted per rule — Description, Category, ReferenceNumber, etc. are [BsonIgnore]
    // and come back null from the DB. We start from a fresh default (which has all static fields populated)
    // and copy the persisted Value from the DB version into each matching property.
    // Reflection means new rules added to RulesConfig are picked up automatically with no changes here.
    private RulesConfig MergeWithDefaults(RulesConfig fromDb)
    {
        var config = GetDefaultRulesConfig();

        // Copy the persisted identity and timestamps from the DB record
        config.Id = fromDb.Id;
        config.Status = fromDb.Status;
        config.CreatedAt = fromDb.CreatedAt;
        config.UpdatedAt = fromDb.UpdatedAt;

        // Find every RuleOption<bool> property on RulesConfig and copy its Value from the DB record
        var properties = typeof(RulesConfig)
            .GetProperties(BindingFlags.Public | BindingFlags.Instance)
            .Where(p => p.PropertyType == typeof(RulesConfig.RuleOption<bool>));

        foreach (var property in properties)
            ((RulesConfig.RuleOption<bool>)property.GetValue(config)!).Value =
                ((RulesConfig.RuleOption<bool>)property.GetValue(fromDb)!).Value;

        return config;
    }

    private static readonly RuleKey[] UnsupportedRules = [RuleKey.InstantUpgrades];

    public static string[] ValidateRuleRelationships(RulesConfig config)
    {
        // Build a lookup from RuleKey → enabled/disabled by parsing each property name as a RuleKey enum value.
        // Properties that don't map to a RuleKey (e.g. Id, Status) are skipped via TryParse.
        var ruleValues = typeof(RulesConfig)
            .GetProperties(BindingFlags.Public | BindingFlags.Instance)
            .Where(p => p.PropertyType == typeof(RulesConfig.RuleOption<bool>))
            .Where(p => Enum.TryParse<RuleKey>(p.Name, out _))
            .ToDictionary(
                p => Enum.Parse<RuleKey>(p.Name),
                p => ((RulesConfig.RuleOption<bool>)p.GetValue(config)!).Value
            );

        var violations = new List<string>();

        foreach (var ruleKey in UnsupportedRules)
        {
            if (ruleValues.TryGetValue(ruleKey, out var value) && value)
                violations.Add($"{ruleKey} is not supported");
        }

        foreach (var relationship in config.RuleRelationships)
        {
            if (!ruleValues.TryGetValue(relationship.Source, out var sourceValue)) continue;
            if (!ruleValues.TryGetValue(relationship.Target, out var targetValue)) continue;

            var isViolated = relationship.Type switch
            {
                RulesConfig.RuleRelationType.Incompatible => sourceValue && targetValue,
                RulesConfig.RuleRelationType.Requires     => sourceValue && !targetValue,
                _                                         => false
            };

            if (!isViolated) continue;

            violations.Add(relationship.Type switch
            {
                RulesConfig.RuleRelationType.Incompatible => $"{relationship.Source} is incompatible with {relationship.Target}",
                RulesConfig.RuleRelationType.Requires     => $"{relationship.Source} requires {relationship.Target} to be enabled",
                _                                         => $"Rule relationship violation: {relationship.Source} -> {relationship.Target}"
            });
        }

        return violations.ToArray();
    }
}