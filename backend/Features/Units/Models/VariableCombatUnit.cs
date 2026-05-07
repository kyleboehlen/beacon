using TypeGen.Core.TypeAnnotations;

namespace Features.Units.Models;

[ExportTsInterface]
public class VariableCombatUnit : Unit, IVariableCombatUnit
{
    public required char AggressorWeaponClass { get; init; }
    public required int AggressorAttackStrength { get; init; }
}