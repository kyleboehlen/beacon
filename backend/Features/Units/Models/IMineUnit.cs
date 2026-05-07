namespace Features.Units.Models;

// Mines are placed in hexes and trigger against enemy ships entering.
// They do not participate in traditional combat — WeaponClass and AttackStrength are * in the rules (represented as null/0).
// TODO: Mines cannot enter hexes or systems containing enemy ships
// TODO: Each mine that survives sweeping destroys one aggressor ship, except against Titans which only take 1 damage per mine
public interface IMineUnit : IUnit
{
    // Mines are always locked to this movement tech level regardless of the player's current movement technology
    int MaxMovementTechLevel { get; }
}