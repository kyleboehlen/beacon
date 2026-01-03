using MongoDB.Bson.Serialization.Attributes;

namespace Features.Game.Models;

public partial class RulesConfig
{
    // TODO: list the voting behaviors: standard, variable player order, hidden bids/voting
    // [BsonElement("votingBehavior")]
    // public RuleOption<bool> votingBehavior { get; set; } = new()
    // {
    //     Value = false,
    //     Description =
    //         "",
    //     Category = RuleCategory.Beacon,
    //     Enabled = true
    // };
    
    [BsonElement("shipGroupLimits")]
    public RuleOption<bool> ShipGroupLimits { get; set; } = new()
    {
        Value = true,
        Description =
            "Enforce the ship group limitations imposed by the original game. When disabled you may have as many groups of the same ship type as you can afford to build.",
        Category = RuleCategory.Beacon,
        Enabled = true,
        ReferenceNumber = "7.5.5"
    };
    
    // TODO: lost in space behavior
}