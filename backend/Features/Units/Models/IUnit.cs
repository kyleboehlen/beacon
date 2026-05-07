namespace Features.Units.Models;

public interface IUnit
{
    // E.G. Shipyard / SY
    string TypeName { get; }
    string TypeAbbreviation { get; }

    // Firing order in combat — A fires before B, B before C, etc. Null for non-combat units.
    char? WeaponClass { get; }

    // Roll this number or less to score a hit
    int AttackStrength { get; }

    // Subtracted from attacker's attack strength — higher is harder to hit
    int DefenseStrength { get; }

    // Hits required to destroy one unit in the group; also governs tech limits and shipyard construction capacity
    int HullSize { get; }

    // Max number of physical group counters available (rule 7.5.5 — can't build if all are in play)
    int GroupCounterCount { get; }

    // Cost to build during econ phase
    int ConstructionPoints { get; }

    // Differs from hull size for some units (e.g. bases and civilian ships have 0 maintenance)
    int MaintenanceCost { get; }

    int RequiredShipSizeTechnology { get; }
    int RequiredGroundCombatTechnology { get; }

    bool IsGroundUnit { get; }
    
    // Civilian ships, like miners, can't participate in combat
    bool IsCombatCapable { get; }
    
    // Base, DSN, SY, etc can't move
    bool CanMove { get; }

    // Number of hits dealt per successful attack roll — 1 for all units except Titans (2)
    int DamagePerHit { get; }
}