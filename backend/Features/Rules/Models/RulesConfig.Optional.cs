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
        ReferenceNumber = "30.0",
        RulePage = 29
    };

    [BsonElement("terraformingNebulae")]
    public RuleOption<bool> TerraformingNebulae { get; init; } = new()
    {
        Value = false,
        Description = "Allows miners to generate CP in nebulae systems if it is connected to a colony via an active MS pipeline chain.",
        Category = RuleCategory.Optional,
        ReferenceNumber = "34.0",
        RulePage = 30
    };

    [BsonElement("reactionMovement")]
    public RuleOption<bool> ReactionMovement { get; init; } = new()
    {
        Value = false,
        Description = "Ships equipped with Exploration technology may respond to battles in adjacent hexes.",
        Category = RuleCategory.Optional,
        ReferenceNumber = "35.0",
        RulePage = 31
    };

    [BsonElement("facilities")]
    public RuleOption<bool> Facilities { get; init; } = new()
    {
        Value = false,
        Description = "Enables Logistics Centers (36.5). Ships must be within Supply Range of a friendly colony to remain in supply.",
        Category = RuleCategory.Optional,
        ReferenceNumber = "36.0",
        RulePage = 32
    };

    [BsonElement("advancedConstruction")]
    public RuleOption<bool> AdvancedConstruction { get; init; } = new()
    {
        Value = false,
        Description = "Unlocks advanced ship variants including Destroyer X (DDX), Battle Carriers (BV), Starbases, and Raider X (RX), plus extended technologies for Battleships (BB), Dreadnoughts (DN), and Titans (TN).",
        Category = RuleCategory.Optional,
        ReferenceNumber = "38.0",
        RulePage = 34
    };
}