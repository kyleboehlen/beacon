using Controllers.Rules.Requests;
using Controllers.Rules.Responses;
using Features.Rules.Services;
using Microsoft.AspNetCore.Mvc;
using Features.Rules.Models;

namespace Controllers.Rules;

[ApiController]
[Route("api/[controller]")]
public class RulesController(RulesService rulesService) : ControllerBase
{
    [HttpGet("HydrateRulesConfig")]
    public BeaconResponse<HydrateRulesConfigResponse> HydrateRulesConfig()
    {
        var defaultRulesConfig = rulesService.GetDefaultRulesConfig();
        return new BeaconResponse<HydrateRulesConfigResponse>()
        {
            Success = true,
            Payload = new HydrateRulesConfigResponse { DefaultRulesConfig = defaultRulesConfig }
        };
    }

    // TODO: Add authentication and authorization guards
    [HttpPost("CreateRulesConfig")]
    public async Task<BeaconResponse<CreateRulesConfigResponse>> CreateRulesConfig(
        [FromBody] SaveRulesConfigRequest request)
    {
        try
        {
            var created = await rulesService.CreateRulesConfig(request.RulesConfig);
            return new BeaconResponse<CreateRulesConfigResponse>
            {
                Success = true,
                Payload = new CreateRulesConfigResponse { RulesConfig = created }
            };
        }
        catch (InvalidOperationException ex)
        {
            return new BeaconResponse<CreateRulesConfigResponse>
            {
                Success = false,
                Payload = null!,
                Errors = [new BeaconError { Message = ex.Message }]
            };
        }
    }

    // TODO: Auth
    [HttpGet("GetRulesConfig/{id}")]
    public async Task<BeaconResponse<GetRulesConfigResponse>> GetRulesConfig(string id)
    {
        var rulesConfig = await rulesService.GetRulesConfigById(id);

        if (rulesConfig == null)
        {
            return new BeaconResponse<GetRulesConfigResponse>()
            {
                Success = false,
                Payload = new GetRulesConfigResponse { RulesConfig = null! }
            };
        }

        return new BeaconResponse<GetRulesConfigResponse>()
        {
            Success = true,
            Payload = new GetRulesConfigResponse { RulesConfig = rulesConfig }
        };
    }

    // TODO: Add authentication and authorization guards
    [HttpPut("UpdateRulesConfig/{id}")]
    public async Task<BeaconResponse<UpdateRulesConfigResponse>> UpdateRulesConfig(
        string id,
        [FromBody] SaveRulesConfigRequest request)
    {
        try
        {
            var updated = await rulesService.UpdateRulesConfig(id, request.RulesConfig);

            if (!updated)
                return new BeaconResponse<UpdateRulesConfigResponse>
                {
                    Success = false,
                    Payload = null!,
                    Errors = [new BeaconError { Message = $"No rules config found with id {id}" }]
                };

            return new BeaconResponse<UpdateRulesConfigResponse>
            {
                Success = true,
                Payload = new UpdateRulesConfigResponse { RulesConfig = request.RulesConfig }
            };
        }
        catch (InvalidOperationException ex)
        {
            return new BeaconResponse<UpdateRulesConfigResponse>
            {
                Success = false,
                Payload = null!,
                Errors = [new BeaconError { Message = ex.Message }]
            };
        }
    }

    // TODO: Add authentication and authorization guards
    [HttpDelete("DeleteRulesConfig/{id}")]
    public async Task<BeaconResponse<DeleteRulesConfigResponse>> DeleteRulesConfig(string id)
    {
        var deleted = await rulesService.DeleteRulesConfig(id);
        return new BeaconResponse<DeleteRulesConfigResponse>()
        {
            Success = deleted,
            Payload = new DeleteRulesConfigResponse { Deleted = deleted }
        };
    }
}