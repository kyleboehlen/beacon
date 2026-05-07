namespace Features.Units.Models;

public static partial class UnitCatalog
{
    public static readonly BoardingUnit BoardingShip = new()
    {
        TypeName = "Boarding Ship",
        TypeAbbreviation = "BD",
        WeaponClass = 'F',
        AttackStrength = 1,
        BoardingWeaponClass = 'F',
        BoardingAttackByTechLevel = [5, 6],
        DefenseStrength = 0,
        HullSize = 2,
        GroupCounterCount = 6,
        ConstructionPoints = 12,
        MaintenanceCost = 2,
        RequiredShipSizeTechnology = 1,
        RequiredBoardingTechnology = 1,
    };
}