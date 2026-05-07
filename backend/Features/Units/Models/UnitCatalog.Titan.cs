namespace Features.Units.Models;

public static partial class UnitCatalog
{
    public static readonly Unit Titan = new()
    {
        TypeName = "Titan",
        TypeAbbreviation = "TN",
        WeaponClass = 'A',
        AttackStrength = 7,
        DefenseStrength = 3,
        HullSize = 5,
        GroupCounterCount = 5,
        ConstructionPoints = 32,
        MaintenanceCost = 5,
        RequiredShipSizeTechnology = 7,
    };
}