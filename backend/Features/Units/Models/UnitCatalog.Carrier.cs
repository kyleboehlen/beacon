namespace Features.Units.Models;

public static partial class UnitCatalog
{
    // TODO: Carrier can mount Fast 2
    // TODO: Carrier can mount Exploration 2
    public static readonly FighterCarrierUnit Carrier = new()
    {
        TypeName = "Carrier",
        TypeAbbreviation = "CV",
        WeaponClass = 'E',
        AttackStrength = 3,
        DefenseStrength = 0,
        HullSize = 1,
        GroupCounterCount = 6,
        ConstructionPoints = 12,
        MaintenanceCost = 1,
        RequiredShipSizeTechnology = 1,
        RequiredFighterTechnology = 1,
        FighterCapacity = 3,
    };
}