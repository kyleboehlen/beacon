namespace Features.Units.Models;

public static partial class UnitCatalog
{
    // TODO: Raiders have no cloaking ability in nebulae — this should be enforced by hex/system type modifier logic
    public static readonly CloakingUnit Raider = new()
    {
        TypeName = "Raider",
        TypeAbbreviation = "R",
        WeaponClass = 'D',
        AttackStrength = 4,
        CloakedWeaponClass = 'A',
        CloakedAttackByTechLevel = [4, 5],
        BaseAttackByTechLevel = [4, 5],
        FirstRoundCloakedAttackBonus = 1,
        DefenseStrength = 0,
        HullSize = 2,
        GroupCounterCount = 6,
        ConstructionPoints = 12,
        MaintenanceCost = 2,
        RequiredShipSizeTechnology = 1,
        RequiredCloakingTechnology = 1,
    };
}