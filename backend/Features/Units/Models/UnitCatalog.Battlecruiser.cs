namespace Features.Units.Models;

public static partial class UnitCatalog
{
    // TODO: Battlecruiser can mount Fast 1
    public static readonly Unit Battlecruiser = new()
    {
        TypeName = "Battlecruiser",
        TypeAbbreviation = "BC",
        WeaponClass = 'B',
        AttackStrength = 5,
        DefenseStrength = 1,
        HullSize = 2,
        GroupCounterCount = 6,
        ConstructionPoints = 15,
        MaintenanceCost = 2,
        RequiredShipSizeTechnology = 4,
    };
}