using TypeGen.Core.TypeAnnotations;

namespace Features.Game.Models;

public partial class RulesConfig
{
    [ExportTsEnum]
    public enum RuleCategory
    {
        Basic,
        Cards,
        Beacon,
        Optional,
        Factions
    }
}