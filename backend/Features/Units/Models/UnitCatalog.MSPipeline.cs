namespace Features.Units.Models;

public static partial class UnitCatalog
{
    public static readonly Unit MSPipeline = new()
    {
        TypeName = "MS Pipeline",
        TypeAbbreviation = "MS",
        WeaponClass = null,
        AttackStrength = 0,
        DefenseStrength = 0,
        HullSize = 1,
        GroupCounterCount = 27,
        ConstructionPoints = 3,
        MaintenanceCost = 0,
        RequiredShipSizeTechnology = 1,
        IsCombatCapable = false,
    };
}