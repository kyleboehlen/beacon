namespace Features.Units.Models;

public static partial class UnitCatalog
{
    // TODO: Militia are not purchasable — they come with the defenders during ground combat
    // TODO: ConstructionPoints is * in the rules — represented here as 0
    public static readonly Unit Militia = new()
    {
        TypeName = "Militia",
        TypeAbbreviation = "Mil",
        WeaponClass = 'E',
        AttackStrength = 5,
        DefenseStrength = 0,
        HullSize = 1,
        GroupCounterCount = 1,
        ConstructionPoints = 0,
        MaintenanceCost = 0,
        RequiredShipSizeTechnology = 0,
        RequiredGroundCombatTechnology = 0,
        IsGroundUnit = true,
    };
}