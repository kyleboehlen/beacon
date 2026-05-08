using Common.Models;
using TypeGen.Core.TypeAnnotations;

namespace Features.Econ.Models;

[ExportTsInterface]
public class TechDefinition
{
    public required TechKey Key { get; init; }
    public required string DisplayName { get; init; }
    public required int StartingLevel { get; init; }
    public required int MaxLevel { get; init; }

    // One cost per upgrade step; length must equal MaxLevel - StartingLevel.
    public required int[] UpgradeCosts { get; init; }

    // Null means this tech is always available regardless of rules configuration.
    [TsNull]
    public RuleKey? GateRuleKey { get; init; }

    // When set, the gate only applies at this level and above.
    // Levels below GatedFromLevel remain purchasable even when the rule is disabled.
    // Example: Terraform level 2 requires TerraformingNebulae, but level 1 does not.
    [TsNull]
    public int? GatedFromLevel { get; init; }

    // General description of what this tech tree does.
    [TsNull]
    public string? Notes { get; init; }

    // Per-level notes, parallel to UpgradeCosts. Index 0 = note for upgrading from StartingLevel to StartingLevel+1.
    // Null entries for steps that need no extra explanation.
    [TsNull]
    public string?[]? LevelNotes { get; init; }
}