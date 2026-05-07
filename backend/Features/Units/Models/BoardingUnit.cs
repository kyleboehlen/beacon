using TypeGen.Core.TypeAnnotations;

namespace Features.Units.Models;

[ExportTsInterface]
public class BoardingUnit : Unit, IBoardingUnit
{
    public required char BoardingWeaponClass { get; init; }
    public required int[] BoardingAttackByTechLevel { get; init; }
    public required int RequiredBoardingTechnology { get; init; }
}