namespace Features.Units.Models;

public static partial class UnitCatalog
{
    public static readonly Unit Shipyard = new()
    {
        TypeName = "Shipyard",
        TypeAbbreviation = "SY",
        WeaponClass = 'C',
        AttackStrength = 3,
        DefenseStrength = 0,
        HullSize = 1,
        GroupCounterCount = 7,
        ConstructionPoints = 6,
        MaintenanceCost = 0,
        RequiredShipSizeTechnology = 1,
        CanMove = false,
    };
}