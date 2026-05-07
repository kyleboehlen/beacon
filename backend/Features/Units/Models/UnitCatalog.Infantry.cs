namespace Features.Units.Models;

public static partial class UnitCatalog
{
    public static readonly Unit Infantry = new()
    {
        TypeName = "Infantry",
        TypeAbbreviation = "Inf",
        WeaponClass = 'D',
        AttackStrength = 5,
        DefenseStrength = 1,
        HullSize = 1,
        GroupCounterCount = 9,
        ConstructionPoints = 2,
        MaintenanceCost = 0,
        RequiredShipSizeTechnology = 0,
        RequiredGroundCombatTechnology = 1,
        IsGroundUnit = true,
    };
}