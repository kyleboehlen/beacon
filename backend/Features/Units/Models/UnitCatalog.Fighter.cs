namespace Features.Units.Models;

public static partial class UnitCatalog
{
    public static readonly FighterUnit Fighter = new()
    {
        TypeName = "Fighter",
        TypeAbbreviation = "F",
        WeaponClass = 'B',
        AttackStrength = 5,
        DefenseStrength = 0,
        HullSize = 1,
        GroupCounterCount = 10,
        ConstructionPoints = 5,
        MaintenanceCost = 0,
        RequiredShipSizeTechnology = 1,
        RequiredFighterTechnology = 1,
        AttackStrengthByTechLevel = [5, 6, 7, 8],
        DefenseByTechLevel = [0, 0, 1, 2],
        PointDefenseDefenseByTechLevel = [0, 1, 2, 2],
    };
}