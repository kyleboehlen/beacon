using TypeGen.Core.TypeAnnotations;

namespace Features.Units.Models;

[ExportTsInterface]
public class Unit : IUnit
{
    public required string TypeName { get; init; }
    public required string TypeAbbreviation { get; init; }
    public char? WeaponClass { get; init; }
    public required int AttackStrength { get; init; }
    public required int DefenseStrength { get; init; }
    public required int HullSize { get; init; }
    public required int GroupCounterCount { get; init; }
    public required int ConstructionPoints { get; init; }
    public required int MaintenanceCost { get; init; }
    public required int RequiredShipSizeTechnology { get; init; }
    public int RequiredGroundCombatTechnology { get; init; } = 0;
    public bool IsGroundUnit { get; init; } = false;
    public bool IsCombatCapable { get; init; } = true;
    public bool CanMove { get; init; } = true;
    public int DamagePerHit { get; init; } = 1;
}