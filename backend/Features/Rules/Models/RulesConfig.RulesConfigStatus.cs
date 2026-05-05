using TypeGen.Core.TypeAnnotations;

namespace Features.Rules.Models;

public partial class RulesConfig
{
    [ExportTsEnum]
    public enum RulesConfigStatus
    {
        // Currently being configured in the rules wizard
        Draft,
        // In use by an active game
        Active,
        // Saved as a reusable template
        Template,
        // No longer in use
        Archived
    }
}