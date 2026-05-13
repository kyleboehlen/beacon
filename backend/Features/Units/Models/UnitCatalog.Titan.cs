namespace Features.Units.Models;

public static partial class UnitCatalog
{
    public static readonly FighterCarrierUnit Titan = new()
    {
        TypeName = "Titan",
        TypeAbbreviation = "TN",
        WeaponClass = 'A',
        AttackStrength = 7,
        DefenseStrength = 3,
        HullSize = 5,
        GroupCounterCount = 5,
        ConstructionPoints = 32,
        MaintenanceCost = 5,
        RequiredShipSizeTechnology = 7,
        DamagePerHit = 2,
        MineDamageReceived = 1,
        FighterCapacity = 3,
        RequiredFighterTechnology = 1,
    };
}