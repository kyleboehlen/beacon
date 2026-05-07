using TypeGen.Core.TypeAnnotations;

namespace Features.Units.Models;

[ExportTsInterface]
public class FighterCarrierUnit : Unit, IFighterCarrier
{
    public required int FighterCapacity { get; init; }
    public required int RequiredFighterTechnology { get; init; }
}