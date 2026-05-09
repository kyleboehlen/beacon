using Common.Models;
using MongoDB.Bson.Serialization.Attributes;

namespace Features.Rules.Models;

public partial class RulesConfig
{
    // TODO: list the voting behaviors: standard, variable player order, hidden bids/voting
    // [BsonElement("votingBehavior")]
    // public RuleOption<bool> votingBehavior { get; init; } = new()
    // {
    //     Value = false,
    //     Description = "",
    //     Category = RuleCategory.Beacon,
    //     Enabled = true
    // };

    [BsonElement("shipGroupLimits")]
    public RuleOption<bool> ShipGroupLimits { get; init; } = new()
    {
        Value = true,
        Key = RuleKey.ShipGroupLimits,
        Description = "Enforce the ship group limitations imposed by the original game. When disabled you may have as many groups of the same ship type as you can afford to build.",
        Category = RuleCategory.Beacon,
        ReferenceNumber = "7.5.5",
        RulePage = 11
    };

    // TODO: lost in space behavior
}