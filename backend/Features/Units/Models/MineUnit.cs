using TypeGen.Core.TypeAnnotations;

namespace Features.Units.Models;

[ExportTsInterface]
public class MineUnit : Unit, IMineUnit
{
    public required int MaxMovementTechLevel { get; init; }
}