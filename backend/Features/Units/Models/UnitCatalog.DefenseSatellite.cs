namespace Features.Units.Models;

public static partial class UnitCatalog
{
    public static readonly Unit DefenseSatellite = new()
    {
        TypeName = "Defense Satellite",
        TypeAbbreviation = "DS",
        WeaponClass = 'B',
        AttackStrength = 4,
        DefenseStrength = 1,
        HullSize = 2,
        GroupCounterCount = 4,
        ConstructionPoints = 6,
        MaintenanceCost = 0,
        RequiredShipSizeTechnology = 2,
        CanMove = false,
    };
}