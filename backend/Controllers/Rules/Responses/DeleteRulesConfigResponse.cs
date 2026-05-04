using TypeGen.Core.TypeAnnotations;

namespace Controllers.Rules.Responses;

[ExportTsInterface]
public class DeleteRulesConfigResponse
{
    public required bool Deleted { get; set; }
}
