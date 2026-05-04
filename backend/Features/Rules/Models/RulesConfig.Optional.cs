using MongoDB.Bson.Serialization.Attributes;

namespace Features.Rules.Models;

public partial class RulesConfig
{
    [BsonElement("instantUpgrades")]
    public RuleOption<bool> InstantUpgrades { get; init; } = new()
    {
        Value = false,
        Description = "No.",
        Category = RuleCategory.Optional,
        Enabled = false,
        ReferenceNumber = "30.0",
        RulePage = 29
    };

    [BsonElement("terraformingNebulae")]
    public RuleOption<bool> TerraformingNebulae { get; init; } = new()
    {
        Value = false,
        Description = "Allows miners to generate CP in nebulae systems if it is connected to a colony via an active MS pipeline chain.",
        Category = RuleCategory.Optional,
        // TODO: Check whether or not replicators is enabled to determine whether this is enabled
        Enabled = true,
        ReferenceNumber = "34.0",
        RulePage = 30
    };
}