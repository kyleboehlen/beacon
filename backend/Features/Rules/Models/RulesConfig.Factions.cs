using MongoDB.Bson.Serialization.Attributes;

namespace Features.Rules.Models;

public partial class RulesConfig
{
    [BsonElement("replicators")]
    public RuleOption<bool> Replicators { get; init; } = new()
    {
        Value = false,
        Description = "Enables playing the replicators faction and the anti-replicator technology. Disables the use of: facilities, terraforming nebulae, unique ships, ship experience, reaction movement, space amoebas, blood brother alliances, mission cards, and the galactic capitol.",
        Category = RuleCategory.Factions,
        Enabled = true,
        ReferenceNumber = "40.0",
        RulePage = 39
    };
}