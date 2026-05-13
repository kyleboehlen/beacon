using Common.Models;
using MongoDB.Bson.Serialization.Attributes;

namespace Features.Rules.Models;

public partial class RulesConfig
{
    [BsonElement("replicators")]
    public RuleOption<bool> Replicators { get; init; } = new()
    {
        Value = false,
        Key = RuleKey.Replicators,
        Description = "Enables playing the replicators faction and the anti-replicator technology. Disables the use of: facilities, terraforming nebulae, unique ships, ship experience, reaction movement, space amoebas, blood brother alliances, mission cards, and the galactic capitol.",
        Category = RuleCategory.Factions,
        ReferenceNumber = "40.0",
        RulePage = 39
    };

    [BsonElement("alternateEmpires")]
    public RuleOption<bool> AlternateEmpires { get; init; } = new()
    {
        Value = false,
        Key = RuleKey.AlternateEmpires,
        Description = "Enables playing alternate empire factions with missile boats, carrier-less fighters, and technology stealing boarding ships.",
        Category = RuleCategory.Factions,
        ReferenceNumber = "24.0",
        RulePage = 24
    };
}