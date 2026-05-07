namespace Features.Units.Models;

public static partial class UnitCatalog
{
    // TODO: attack and defense are * in the rules — represented here as null/0
    public static readonly MineUnit Mines = new()
    {
        TypeName = "Mine",
        TypeAbbreviation = "Mines",
        WeaponClass = null,
        AttackStrength = 0,
        DefenseStrength = 0,
        HullSize = 1,
        GroupCounterCount = 9,
        ConstructionPoints = 5,
        MaintenanceCost = 0,
        RequiredShipSizeTechnology = 1,
        IsCombatCapable = false,
        DamagePerTrigger = 1,
        MaxMovementTechLevel = 1,
    };
}