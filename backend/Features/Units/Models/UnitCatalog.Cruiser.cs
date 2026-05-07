namespace Features.Units.Models;

public static partial class UnitCatalog
{
    public static readonly Unit Cruiser = new()
    {
        TypeName = "Cruiser",
        TypeAbbreviation = "CA",
        WeaponClass = 'C',
        AttackStrength = 4,
        DefenseStrength = 1,
        HullSize = 2,
        GroupCounterCount = 6,
        ConstructionPoints = 12,
        MaintenanceCost = 2,
        RequiredShipSizeTechnology = 3,
    };
}