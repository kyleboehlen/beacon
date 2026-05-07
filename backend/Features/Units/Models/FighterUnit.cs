using TypeGen.Core.TypeAnnotations;

namespace Features.Units.Models;

[ExportTsInterface]
public class FighterUnit : Unit, IFighterUnit
{
    public required int[] AttackStrengthByTechLevel { get; init; }
    public required int[] DefenseByTechLevel { get; init; }
    public required int[] PointDefenseDefenseByTechLevel { get; init; }
    public required int RequiredFighterTechnology { get; init; }
}