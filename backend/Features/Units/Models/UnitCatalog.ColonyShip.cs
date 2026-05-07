namespace Features.Units.Models;

public static partial class UnitCatalog
{
    // TODO: the 16 group counters are shared between colony ships and colonies themselves, but not the home colony
    public static readonly Unit ColonyShip = new()
    {
        TypeName = "Colony Ship",
        TypeAbbreviation = "CO",
        WeaponClass = null,
        AttackStrength = 0,
        DefenseStrength = 0,
        HullSize = 1,
        GroupCounterCount = 16,
        ConstructionPoints = 8,
        MaintenanceCost = 0,
        RequiredShipSizeTechnology = 1,
        IsCombatCapable = false,
    };
}