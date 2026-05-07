namespace Features.Units.Models;

public static partial class UnitCatalog
{
    // TODO: Dreadnought can mount Shield Projectors with AC1
    public static readonly Unit Dreadnought = new()
    {
        TypeName = "Dreadnought",
        TypeAbbreviation = "DN",
        WeaponClass = 'A',
        AttackStrength = 6,
        DefenseStrength = 3,
        HullSize = 3,
        GroupCounterCount = 5,
        ConstructionPoints = 24,
        MaintenanceCost = 3,
        RequiredShipSizeTechnology = 6,
    };
}