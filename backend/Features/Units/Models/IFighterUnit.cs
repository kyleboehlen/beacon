using System.Collections.Immutable;

namespace Features.Units.Models;

// Fighters are unique in that both attack and defense scale with fighter tech level.
// WeaponClass and AttackStrength on IUnit represent tech 1 values.
// Defense also differs depending on whether the attacker is using point defense.
public interface IFighterUnit : IUnit
{
    // Attack strength by fighter tech level (index 0 = tech 1, index 3 = tech 4)
    ImmutableArray<int> AttackStrengthByTechLevel { get; }

    // Defense against normal attacks by fighter tech level
    ImmutableArray<int> DefenseByTechLevel { get; }

    // Defense when targeted by point defense by fighter tech level
    ImmutableArray<int> PointDefenseDefenseByTechLevel { get; }

    int RequiredFighterTechnology { get; }
}