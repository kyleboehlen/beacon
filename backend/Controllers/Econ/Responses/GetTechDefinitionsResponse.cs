using Features.Econ.Models;
using TypeGen.Core.TypeAnnotations;

namespace Controllers.Econ.Responses;

[ExportTsInterface]
public class GetTechDefinitionsResponse
{
    public required TechDefinition[] TechDefinitions { get; set; }
}