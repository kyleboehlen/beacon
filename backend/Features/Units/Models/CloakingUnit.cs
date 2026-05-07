using TypeGen.Core.TypeAnnotations;

namespace Features.Units.Models;

[ExportTsInterface]
public class CloakingUnit : Unit, ICloakingUnit
{
    public required char CloakedWeaponClass { get; init; }
    public required int[] CloakedAttackByTechLevel { get; init; }
    public required int[] BaseAttackByTechLevel { get; init; }
    public required int FirstRoundCloakedAttackBonus { get; init; }
    public required int RequiredCloakingTechnology { get; init; }
}