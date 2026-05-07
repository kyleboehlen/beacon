namespace Features.Units.Models;

// Units capable of performing boarding actions to capture enemy ships.
// WeaponClass and AttackStrength on IUnit represent standard combat stats.
// Boarding stats only apply during a dedicated boarding action, not normal combat.
public interface IBoardingUnit : IUnit
{
    // Weapon class used during a boarding action
    char BoardingWeaponClass { get; }

    // Attack strength during boarding, indexed by boarding tech level (index 0 = tech 1, index 1 = tech 2)
    int[] BoardingAttackByTechLevel { get; }

    int RequiredBoardingTechnology { get; }
}