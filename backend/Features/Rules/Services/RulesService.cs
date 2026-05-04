namespace Features.Rules.Services;

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
        rulesConfig.UpdatedAt = DateTime.UtcNow;
        var result = await _rulesConfigs.ReplaceOneAsync(r => r.Id == id, rulesConfig);
        return result.ModifiedCount > 0;
    }

    public async Task<bool> DeleteRulesConfig(string id)
    {
        var result = await _rulesConfigs.DeleteOneAsync(r => r.Id == id);
        return result.DeletedCount > 0;
    }

    // Only Value is persisted per rule (all other RuleOption fields are BsonIgnore and defined in code).
    // This restores the static fields by merging saved values into a fresh default instance.
    private RulesConfig MergeWithDefaults(RulesConfig fromDb)
    {
        var config = GetDefaultRulesConfig();

        config.Id = fromDb.Id;
        config.Status = fromDb.Status;
        config.CreatedAt = fromDb.CreatedAt;
        config.UpdatedAt = fromDb.UpdatedAt;

        // Basic
        config.MsPipelines.Value = fromDb.MsPipelines.Value;
        config.DefenseSatelliteNetworks.Value = fromDb.DefenseSatelliteNetworks.Value;
        config.Fighters.Value = fromDb.Fighters.Value;
        config.Cloaking.Value = fromDb.Cloaking.Value;
        config.Mines.Value = fromDb.Mines.Value;
        config.NonPlayerAliens.Value = fromDb.NonPlayerAliens.Value;
        config.BoardingShips.Value = fromDb.BoardingShips.Value;
        config.SecurityForces.Value = fromDb.SecurityForces.Value;
        config.GroundCombat.Value = fromDb.GroundCombat.Value;
        config.Titans.Value = fromDb.Titans.Value;
        config.Flagships.Value = fromDb.Flagships.Value;

        // Optional
        config.InstantUpgrades.Value = fromDb.InstantUpgrades.Value;
        config.TerraformingNebulae.Value = fromDb.TerraformingNebulae.Value;

        // Beacon
        config.ShipGroupLimits.Value = fromDb.ShipGroupLimits.Value;

        // Factions
        config.Replicators.Value = fromDb.Replicators.Value;

        return config;
    }
}