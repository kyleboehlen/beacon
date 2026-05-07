namespace Features.Units.Models;

public static partial class UnitCatalog
{
    // TODO: rules show attack and defense as * and * (null) — represented here as 0 and 0
    public static readonly Unit Decoy = new()
    {
        TypeName = "Decoy",
        TypeAbbreviation = "Decoy",
        WeaponClass = null,
        AttackStrength = 0,
        DefenseStrength = 0,
        HullSize = 0,
        GroupCounterCount = 4,
        ConstructionPoints = 1,
        MaintenanceCost = 0,
        RequiredShipSizeTechnology = 1,
        IsCombatCapable = false,
    };
}