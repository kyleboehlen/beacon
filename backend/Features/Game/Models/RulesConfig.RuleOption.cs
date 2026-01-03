namespace Features.Game.Models;

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
        [BsonIgnore] public required string Description { get; init; } = string.Empty;

        // A way to organize each rule option for UI and codebase organization. 
        // Please separate RulesConfig classes as such, RulesConfig.{RuleCategory}.cs
        [BsonIgnore] public required RuleCategory Category { get; init; }

        // For defining whether using the rule is acceptable with the state of the config.
        // I.E. there are a lot of rules that are not compatible when playing with the Replicators faction.
        [BsonIgnore] public required bool Enabled { get; init; }
        
        // Rulebook reference number in xx.xx.xx format.
        [BsonIgnore] public string ReferenceNumber { get; init; } = string.Empty;
    }
}