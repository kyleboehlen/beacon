using System.Collections.Immutable;
using TypeGen.Core.TypeAnnotations;

namespace Features.Units.Models;

[ExportTsInterface]
public class CloakingUnit : Unit, ICloakingUnit
{
    private ImmutableArray<int> _cloakedAttackByTechLevel;
    private ImmutableArray<int> _baseAttackByTechLevel;

    public required char CloakedWeaponClass { get; init; }

    public required ImmutableArray<int> CloakedAttackByTechLevel
    {
        get => _cloakedAttackByTechLevel;
        init
        {
            if (value.IsDefault || value.Length != 2 || value.Any(x => x < 0))
                throw new ArgumentException(
                    "CloakedAttackByTechLevel must have exactly 2 non-negative elements — one per cloaking tech level.");
            _cloakedAttackByTechLevel = value;
        }
    }

    public required ImmutableArray<int> BaseAttackByTechLevel
    {
        get => _baseAttackByTechLevel;
        init
        {
            if (value.IsDefault || value.Length != 2 || value.Any(x => x < 0))
                throw new ArgumentException(
                    "BaseAttackByTechLevel must have exactly 2 non-negative elements — one per cloaking tech level.");
            _baseAttackByTechLevel = value;
        }
    }

    public required int FirstRoundCloakedAttackBonus { get; init; }
    public required int RequiredCloakingTechnology { get; init; }
}