namespace Features.Units.Models;

public static partial class UnitCatalog
{
    public static readonly Unit Destroyer = new()
    {
        TypeName = "Destroyer",
        TypeAbbreviation = "DD",
        WeaponClass = 'D',
        AttackStrength = 4,
        DefenseStrength = 0,
        HullSize = 1,
        GroupCounterCount = 6,
        ConstructionPoints = 9,
        MaintenanceCost = 1,
        RequiredShipSizeTechnology = 2,
    };
}