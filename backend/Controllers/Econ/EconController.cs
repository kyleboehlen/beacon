using Controllers.Econ.Responses;
using Features.Econ.Models;
using Microsoft.AspNetCore.Mvc;

namespace Controllers.Econ;

[ApiController]
[Route("api/[controller]")]
public class EconController : ControllerBase
{
    [HttpGet("GetTechDefinitions")]
    public BeaconResponse<GetTechDefinitionsResponse> GetTechDefinitions()
    {
        return new BeaconResponse<GetTechDefinitionsResponse>
        {
            Success = true,
            Payload = new GetTechDefinitionsResponse { TechDefinitions = TechCatalog.All }
        };
    }
}