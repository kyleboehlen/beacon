namespace Features.Units.Models;

public static partial class UnitCatalog
{
    // TODO: add Starbase upgrade
    public static readonly Unit Base = new()
    {
        TypeName = "Base",
        TypeAbbreviation = "Base",
        WeaponClass = 'A',
        AttackStrength = 7,
        DefenseStrength = 2,
        HullSize = 3,
        GroupCounterCount = 4,
        ConstructionPoints = 12,
        MaintenanceCost = 0,
        RequiredShipSizeTechnology = 2,
        CanMove = false,
    };
}