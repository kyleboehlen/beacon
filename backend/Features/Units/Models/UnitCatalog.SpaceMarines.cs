namespace Features.Units.Models;

public static partial class UnitCatalog
{
    public static readonly VariableCombatUnit SpaceMarines = new()
    {
        TypeName = "Space Marines",
        TypeAbbreviation = "Mar",
        WeaponClass = 'D',
        AttackStrength = 5,
        AggressorWeaponClass = 'C',
        AggressorAttackStrength = 6,
        DefenseStrength = 1,
        HullSize = 2,
        GroupCounterCount = 8,
        ConstructionPoints = 3,
        MaintenanceCost = 2,
        RequiredShipSizeTechnology = 0,
        RequiredGroundCombatTechnology = 2,
        IsGroundUnit = true,
    };
}