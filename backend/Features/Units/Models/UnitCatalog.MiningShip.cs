namespace Features.Units.Models;

public static partial class UnitCatalog
{
    // TODO: Mining Ship group counters are shared with terraformed nebulae
    public static readonly Unit MiningShip = new()
    {
        TypeName = "Mining Ship",
        TypeAbbreviation = "Miner",
        WeaponClass = null,
        AttackStrength = 0,
        DefenseStrength = 0,
        HullSize = 1,
        GroupCounterCount = 6,
        ConstructionPoints = 5,
        MaintenanceCost = 0,
        RequiredShipSizeTechnology = 1,
        IsCombatCapable = false,
    };
}