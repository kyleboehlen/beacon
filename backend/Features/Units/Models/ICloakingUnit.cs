namespace Features.Units.Models;

// Units capable of cloaking (improved stats based on scanners during combat, doesn't always trigger combat)
// WeaponClass and AttackStrength on IUnit represent the uncloaked (visible) stats
public interface ICloakingUnit : IUnit
{
    // Weapon class used when the unit is cloaked (enemy has no scanners)
    char CloakedWeaponClass { get; }

    // Attack strength when cloaked, indexed by cloaking tech level (index 0 = tech 1, index 1 = tech 2)
    int[] CloakedAttackByTechLevel { get; }

    // Base (uncloaked) attack strength by tech level (index 0 = tech 1, index 1 = tech 2)
    int[] BaseAttackByTechLevel { get; }

    // Added to attack strength in round 1 of combat only while cloaked
    int FirstRoundCloakedAttackBonus { get; }

    int RequiredCloakingTechnology { get; }
}