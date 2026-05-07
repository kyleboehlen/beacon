namespace Features.Units.Models;

public static partial class UnitCatalog
{
    // TODO: Grav Armor may support other units in addition to their attack
    public static readonly Unit GravArmor = new()
    {
        TypeName = "Grav Armor",
        TypeAbbreviation = "Grav",
        WeaponClass = 'C',
        AttackStrength = 6,
        DefenseStrength = 2,
        HullSize = 2,
        GroupCounterCount = 5,
        ConstructionPoints = 4,
        MaintenanceCost = 2,
        RequiredShipSizeTechnology = 0,
        RequiredGroundCombatTechnology = 3,
        IsGroundUnit = true,
    };
}