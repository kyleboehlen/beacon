namespace Features.Units.Models;

public static partial class UnitCatalog
{
    // TODO: RequiredShipSizeTechnology is 0 because Transport requires ground combat technology, not ship size technology
    // TODO: DefenseStrength increases from 1 to 2 when Ground Combat 3 is researched
    public static readonly Unit Transport = new()
    {
        TypeName = "Transport",
        TypeAbbreviation = "T",
        WeaponClass = 'E',
        AttackStrength = 1,
        DefenseStrength = 1,
        HullSize = 1,
        GroupCounterCount = 6,
        ConstructionPoints = 6,
        MaintenanceCost = 1,
        RequiredShipSizeTechnology = 0,
        RequiredGroundCombatTechnology = 1,
    };
}