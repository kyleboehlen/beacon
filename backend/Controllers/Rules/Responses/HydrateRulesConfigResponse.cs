using Features.Rules.Models;
using TypeGen.Core.TypeAnnotations;

namespace Controllers.Rules.Responses;

[ExportTsInterface]
public class HydrateRulesConfigResponse
{
    public required RulesConfig DefaultRulesConfig { get; set; }
}