namespace Features.Rules.Models;

using MongoDB.Bson.Serialization.Attributes;
using TypeGen.Core.TypeAnnotations;

public partial class RulesConfig
{
    [ExportTsInterface]
    public class RuleOption<T>
    {
        // For holding the actual value of the rule as configured, most rules will be a boolean.
        [BsonElement("value")] public required T Value { get; set; }

        // Immutable description to be declared in the codebase
        [BsonIgnore] public string Description { get; init; } = string.Empty;

        // A way to organize each rule option for UI and codebase organization.
        // Please separate RulesConfig classes as such, RulesConfig.{RuleCategory}.cs
        [BsonIgnore] public RuleCategory Category { get; init; }

        // Rulebook reference number in xx.xx.xx format.
        [BsonIgnore] public string ReferenceNumber { get; init; } = string.Empty;

        // The page in the rulebook PDF where the ReferenceNumber is
        [BsonIgnore] public int RulePage { get; init; } = 0;
    }
}