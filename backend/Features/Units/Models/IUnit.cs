namespace Features.Units.Models;

public interface IUnit
{
    string TypeName { get; }
    string TypeAbbreviation { get; }
    char? WeaponClass { get; }
    int AttackStrength { get; }
    int DefenseStrength { get; }
    int HullSize { get; }
    int GroupCounterCount { get; }
    int ConstructionPoints { get; }
    int MaintenanceCost { get; }
    int RequiredShipSizeTechnology { get; }
    int RequiredGroundCombatTechnology { get; }
    bool IsGroundUnit { get; }
    bool IsCombatCapable { get; }
    bool CanMove { get; }
}