using System.Collections.Immutable;
using TypeGen.Core.TypeAnnotations;

namespace Features.Units.Models;

[ExportTsInterface]
public class FighterUnit : Unit, IFighterUnit
{
    private ImmutableArray<int> _attackStrengthByTechLevel;
    private ImmutableArray<int> _defenseByTechLevel;
    private ImmutableArray<int> _pointDefenseDefenseByTechLevel;

    public required ImmutableArray<int> AttackStrengthByTechLevel
    {
        get => _attackStrengthByTechLevel;
        init
        {
            if (value.IsDefault || value.Length != 4 || value.Any(x => x < 0))
                throw new ArgumentException(
                    "AttackStrengthByTechLevel must have exactly 4 non-negative elements — one per fighter tech level.");
            _attackStrengthByTechLevel = value;
        }
    }

    public required ImmutableArray<int> DefenseByTechLevel
    {
        get => _defenseByTechLevel;
        init
        {
            if (value.IsDefault || value.Length != 4 || value.Any(x => x < 0))
                throw new ArgumentException(
                    "DefenseByTechLevel must have exactly 4 non-negative elements — one per fighter tech level.");
            _defenseByTechLevel = value;
        }
    }

    public required ImmutableArray<int> PointDefenseDefenseByTechLevel
    {
        get => _pointDefenseDefenseByTechLevel;
        init
        {
            if (value.IsDefault || value.Length != 4 || value.Any(x => x < 0))
                throw new ArgumentException(
                    "PointDefenseDefenseByTechLevel must have exactly 4 non-negative elements — one per fighter tech level.");
            _pointDefenseDefenseByTechLevel = value;
        }
    }

    public required int RequiredFighterTechnology { get; init; }
}