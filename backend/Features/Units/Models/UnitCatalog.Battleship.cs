namespace Features.Units.Models;

public static partial class UnitCatalog
{
    // TODO: Battleship can mount Tractor Beams with AC1
    public static readonly Unit Battleship = new()
    {
        TypeName = "Battleship",
        TypeAbbreviation = "BB",
        WeaponClass = 'A',
        AttackStrength = 5,
        DefenseStrength = 2,
        HullSize = 3,
        GroupCounterCount = 6,
        ConstructionPoints = 20,
        MaintenanceCost = 3,
        RequiredShipSizeTechnology = 5,
    };
}