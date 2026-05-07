namespace Features.Units.Models;

public static partial class UnitCatalog
{
    // TODO: Cyber Armor counts as 3 Grav Armor for the purpose of support
    public static readonly Unit CyberArmor = new()
    {
        TypeName = "Cyber Armor",
        TypeAbbreviation = "Cyb",
        WeaponClass = 'B',
        AttackStrength = 8,
        DefenseStrength = 3,
        HullSize = 3,
        GroupCounterCount = 3,
        ConstructionPoints = 5,
        MaintenanceCost = 3,
        RequiredShipSizeTechnology = 0,
        RequiredGroundCombatTechnology = 3,
        IsGroundUnit = true,
    };
}