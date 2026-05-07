namespace Features.Units.Models;

public static partial class UnitCatalog
{
    public static readonly VariableCombatUnit HeavyInfantry = new()
    {
        TypeName = "Heavy Infantry",
        TypeAbbreviation = "HI",
        WeaponClass = 'C',
        AttackStrength = 6,
        AggressorWeaponClass = 'D',
        AggressorAttackStrength = 4,
        DefenseStrength = 2,
        HullSize = 2,
        GroupCounterCount = 10,
        ConstructionPoints = 3,
        MaintenanceCost = 2,
        RequiredShipSizeTechnology = 0,
        RequiredGroundCombatTechnology = 2,
        IsGroundUnit = true,
    };
}