namespace Features.Units.Models;

public static partial class UnitCatalog
{
    // TODO: Battle Carrier also requires Advanced Construction 2 (AC2) to build
    // TODO: Battle Carrier can mount Fast 2
    // TODO: Battle Carrier can mount Exploration 2
    // TODO: Battle Carrier has anti-sensor hulls
    public static readonly FighterCarrierUnit BattleCarrier = new()
    {
        TypeName = "Battle Carrier",
        TypeAbbreviation = "BV",
        WeaponClass = 'B',
        AttackStrength = 5,
        DefenseStrength = 1,
        HullSize = 3,
        GroupCounterCount = 6,
        ConstructionPoints = 20,
        MaintenanceCost = 3,
        RequiredShipSizeTechnology = 1,
        RequiredFighterTechnology = 1,
        FighterCapacity = 6,
    };
}