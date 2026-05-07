namespace Features.Units.Models;

public static partial class UnitCatalog
{
    // TODO: Scout can perform point defense — needs IPointDefenseUnit interface (A6/A7/A8 at PD tech 1/2/3)
    public static readonly Unit Scout = new()
    {
        TypeName = "Scout",
        TypeAbbreviation = "SC",
        WeaponClass = 'E',
        AttackStrength = 3,
        DefenseStrength = 0,
        HullSize = 1,
        GroupCounterCount = 6,
        ConstructionPoints = 6,
        MaintenanceCost = 1,
        RequiredShipSizeTechnology = 1,
    };
}