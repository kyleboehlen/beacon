namespace Features.Units.Models;

// Units whose attack stats differ depending on whether they are the aggressor or defender.
// WeaponClass and AttackStrength on IUnit represent the defender (base) stats.
public interface IVariableCombatUnit : IUnit
{
    // Weapon class used when this unit initiates combat
    char AggressorWeaponClass { get; }

    // Attack strength used when this unit initiates combat
    int AggressorAttackStrength { get; }
}