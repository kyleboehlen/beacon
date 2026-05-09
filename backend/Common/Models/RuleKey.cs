using TypeGen.Core.TypeAnnotations;

namespace Common.Models;

// Typed identifiers for RulesConfig properties.
// Used by Rules as canonical rule IDs and by Econ to declare tech tree gate conditions.
// Lives in Common/ so any feature can import it without a direct feature-to-feature dependency.
[ExportTsEnum]
public enum RuleKey
{
    MsPipelines,
    DefenseSatelliteNetworks,
    Fighters,
    Cloaking,
    Mines,
    NonPlayerAliens,
    BoardingShips,
    SecurityForces,
    GroundCombat,
    Titans,
    Flagships,
    InstantUpgrades,
    TerraformingNebulae,
    ShipGroupLimits,
    Replicators,
    Facilities,
    AdvancedConstruction,
    ReactionMovement,
    AlternateEmpires,
}