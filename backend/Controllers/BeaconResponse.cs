using TypeGen.Core.TypeAnnotations;

namespace Controllers;

[ExportTsInterface]
public class BeaconResponse<T>
{
    public required bool Success { get; set; }
    public required T Payload { get; set; }
}