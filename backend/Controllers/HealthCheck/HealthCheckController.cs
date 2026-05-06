using Controllers.HealthCheck.Requests;
using Controllers.HealthCheck.Responses;
using Features.HealthCheck.Services;
using Microsoft.AspNetCore.Mvc;

namespace Controllers.HealthCheck;

[ApiController]
[Route("api/[controller]")]
public class HealthCheckController(HealthCheckService healthCheckService) : ControllerBase
{
    [HttpGet("HealthCheck")]
    public async Task<BeaconResponse<GetHealthCheckResponse>> Get([FromQuery] GetHealthCheckRequest request)
    {
        var payload = new GetHealthCheckResponse()
        {
            Database = await healthCheckService.DatabaseConnected(request.Database),
            EmailService = await healthCheckService.EmailServiceConnected(request.EmailService),
            Environment = healthCheckService.GetEnvironment(),
        };

        return new BeaconResponse<GetHealthCheckResponse>()
        {
            Success = true,
            Payload = payload
        };
    }
}