using TypeGen.Core.TypeAnnotations;

namespace Controllers.HealthCheck.Requests;

[ExportTsInterface]
public class GetHealthCheckRequest
{
    public bool Database { get; set; } = true;
    public bool EmailService { get; set; } = false;
}
