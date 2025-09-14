using TypeGen.Core.TypeAnnotations;

namespace Controllers.HealthCheck.Responses;

[ExportTsInterface]
public class HealthCheckResponse
{
    public bool Database { get; set; } = false;
    public bool EmailService { get; set; } = false;
    public string Environment { get; set; } = string.Empty;
}