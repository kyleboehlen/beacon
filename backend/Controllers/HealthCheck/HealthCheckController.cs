using Controllers.HealthCheck.Responses;
using Features.HealthCheck.Services;
using Microsoft.AspNetCore.Mvc;

namespace Controllers.HealthCheck;

[ApiController]
[Route("api/[controller]")]
public class HealthCheckController : ControllerBase
{
    private readonly HealthCheckService _healthCheckService;

    public HealthCheckController(HealthCheckService healthCheckService)
    {
        _healthCheckService = healthCheckService;
    }
    
    [HttpGet(Name = "HealthCheck")]
    public async Task<BeaconResponse<HealthCheckResponse>> Get()
    {
        var payload = new HealthCheckResponse()
        {
            Database = await _healthCheckService.DatabaseConnected(),
            EmailService = await _healthCheckService.EmailServiceConnected(),
            Environment = _healthCheckService.GetEnvironment(),
        };
        
        return new BeaconResponse<HealthCheckResponse>()
        {
            Success = true,
            Payload = payload
        };
    }
}