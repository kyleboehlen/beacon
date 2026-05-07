namespace Features.Units.Models;

// Units that can carry and deploy fighter groups.
public interface IFighterCarrier : IUnit
{
    // Number of fighter groups this unit can carry
    int FighterCapacity { get; }

    int RequiredFighterTechnology { get; }
}