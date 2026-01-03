using Controllers.HealthCheck.Responses;
using Features.HealthCheck.Services;
using Microsoft.AspNetCore.Mvc;

namespace Controllers.HealthCheck;

[ApiController]
[Route("api/[controller]")]
public class HealthCheckController(HealthCheckService healthCheckService) : ControllerBase
{
    [HttpGet("HealthCheck")]
    public async Task<BeaconResponse<HealthCheckResponse>> Get()
    {
        var payload = new HealthCheckResponse()
        {
            Database = await healthCheckService.DatabaseConnected(),
            EmailService = await healthCheckService.EmailServiceConnected(),
            Environment = healthCheckService.GetEnvironment(),
        };

        return new BeaconResponse<HealthCheckResponse>()
        {
            Success = true,
            Payload = payload
        };
    }
}