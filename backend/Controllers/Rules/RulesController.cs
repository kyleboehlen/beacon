using Controllers.Rules.Responses;
using Features.Rules.Services;
using Microsoft.AspNetCore.Mvc;

namespace Controllers.Rules;

[ApiController]
[Route("api/[controller]")]
public class RulesController(RulesService rulesService) : ControllerBase
{
    [HttpGet("HydrateRulesConfig")]
    public BeaconResponse<HydrateRulesConfigResponse> HydrateRulesConfig()
    {
        var defaultRulesConfig = rulesService.GetDefaultRulesConfig();
        var payload = new HydrateRulesConfigResponse()
        {
            DefaultRulesConfig = defaultRulesConfig,
        };

        return new BeaconResponse<HydrateRulesConfigResponse>()
        {
            Success = true,
            Payload = payload
        };
    }
}