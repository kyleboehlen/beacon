using Features.Rules.Models;
using TypeGen.Core.TypeAnnotations;

namespace Controllers.Rules.Responses;

[ExportTsInterface]
public class CreateRulesConfigResponse
{
    public required RulesConfig RulesConfig { get; set; }
}