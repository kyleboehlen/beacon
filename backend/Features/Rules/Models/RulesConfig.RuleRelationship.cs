using TypeGen.Core.TypeAnnotations;

namespace Features.Rules.Models;

public partial class RulesConfig
{
    [ExportTsEnum]
    public enum RuleRelationType
    {
        Incompatible,
        Requires
    }

    [ExportTsInterface]
    public class RuleRelationship
    {
        public required string Source { get; init; }
        public required string Target { get; init; }
        public required RuleRelationType Type { get; init; }
    }
}