using Features.Rules.Models;
using TypeGen.Core.TypeAnnotations;

namespace Controllers.Rules.Requests;

[ExportTsInterface]
public class SaveRulesConfigRequest
{
    public required RulesConfig RulesConfig { get; set; }
}