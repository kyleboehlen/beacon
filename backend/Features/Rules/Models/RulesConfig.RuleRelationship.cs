using Common.Models;
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
        public required RuleKey Source { get; init; }
        public required RuleKey Target { get; init; }
        public required RuleRelationType Type { get; init; }
    }
}