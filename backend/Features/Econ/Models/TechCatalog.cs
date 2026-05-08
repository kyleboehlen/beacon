using Common.Models;

namespace Features.Econ.Models;

public static class TechCatalog
{
    public static readonly TechDefinition[] All =
    [
        new()
        {
            Key = TechKey.Attack,
            DisplayName = "Attack",
            StartingLevel = 0,
            MaxLevel = 4,
            UpgradeCosts = [20, 30, 25, 10],
            GateRuleKey = RuleKey.AdvancedConstruction,
            GatedFromLevel = 4,
            Notes = "Increases ship attack ratings in battle. Cannot exceed the ship's Hull Size (9.2). Level 4 is restricted to Starbases and Titans only and requires Advanced Construction tech level 1.",
            LevelNotes =
            [
                "Add 1 to this ship's attack rating when in battle.",
                "Add 2 to this ship's attack rating when in battle (cannot exceed Hull Size).",
                "Add 3 to this ship's attack rating when in battle (cannot exceed Hull Size).",
                "Add 4 to attack rating for Starbases and Titans only. TODO: requires Advanced Construction tech level 1 — tech-on-tech dependency not yet enforced."
            ]
        },
        new()
        {
            Key = TechKey.Defense,
            DisplayName = "Defense",
            StartingLevel = 0,
            MaxLevel = 3,
            UpgradeCosts = [20, 30, 25],
            Notes = "Increases ship defense ratings in battle. Cannot exceed the ship's Hull Size (9.2).",
            LevelNotes =
            [
                "Add 1 to this ship's defense rating when in battle.",
                "Add 2 to this ship's defense rating when in battle (cannot exceed Hull Size).",
                "Add 3 to this ship's defense rating when in battle (cannot exceed Hull Size)."
            ]
        },
        new()
        {
            Key = TechKey.Tactics,
            DisplayName = "Tactics",
            StartingLevel = 0,
            MaxLevel = 3,
            UpgradeCosts = [15, 15, 15],
            Notes = "When opposing ships share the same Weapon Class (E, D, C, etc.), the side with the higher Tactics rating fires first. If Tactics ratings also tie, the defender fires first. Not limited by Hull Size."
        },
        new()
        {
            Key = TechKey.Fighters,
            DisplayName = "Fighters",
            StartingLevel = 0,
            MaxLevel = 4,
            UpgradeCosts = [25, 20, 25, 25],
            GateRuleKey = RuleKey.Fighters,
            Notes = "Requires Fighters rule. Level 0 provides no capability.",
            LevelNotes =
            [
                "Unlocks Carriers (CV) and Fighter 1 units.",
                "Fighter units may be built and upgraded to Fighter 2.",
                "Fighter units may be built and upgraded to Fighter 3.",
                "Fighter units may be built and upgraded to Fighter 4. TODO: requires Advanced Construction tech level 2 — tech-on-tech dependency not yet enforced."
            ]
        },
        new()
        {
            Key = TechKey.PointDefense,
            DisplayName = "Point Defense",
            StartingLevel = 0,
            MaxLevel = 3,
            UpgradeCosts = [20, 20, 20],
            GateRuleKey = RuleKey.Fighters,
            Notes = "Requires Fighters rule. Scouts gain the ability to fire at fighters during combat. Level 0 provides no capability.",
            LevelNotes =
            [
                "Scouts (SC) fire at fighters with Attack Strength A6.",
                "Scouts (SC) fire at fighters with Attack Strength A7.",
                "Scouts (SC) fire at fighters with Attack Strength A8."
            ]
        },
        new()
        {
            Key = TechKey.MilitaryAcademy,
            DisplayName = "Military Academy",
            StartingLevel = 0,
            MaxLevel = 2,
            UpgradeCosts = [10, 20],
            Notes = "Improves the starting experience level of newly built ships.",
            LevelNotes =
            [
                "Newly built ships start as Skilled.",
                "Newly built ships start as Skilled, and subtract 1 from die rolls when gaining an experience level."
            ]
        },
        new()
        {
            Key = TechKey.Boarding,
            DisplayName = "Boarding",
            StartingLevel = 0,
            MaxLevel = 2,
            UpgradeCosts = [20, 25],
            GateRuleKey = RuleKey.BoardingShips,
            Notes = "Requires Boarding Ships rule. Level 0 provides no capability.",
            LevelNotes =
            [
                "Unlocks Boarding Ships (BD).",
                "Boarding Ships increase in attack strength."
            ]
        },
        new()
        {
            Key = TechKey.SecurityForces,
            DisplayName = "Security Forces",
            StartingLevel = 0,
            MaxLevel = 2,
            UpgradeCosts = [15, 15],
            GateRuleKey = RuleKey.SecurityForces,
            Notes = "Requires Security Forces rule. All existing units are instantly equipped when a new level is purchased — no ship is exempt from the mandatory security training seminar.",
            LevelNotes =
            [
                "All units instantly gain Security Forces 1. Add 1 to hull strength when defending against a Boarding Ship.",
                "All units instantly gain Security Forces 2. Add 2 to hull strength when defending against a Boarding Ship."
            ]
        },
        new()
        {
            Key = TechKey.GroundCombat,
            DisplayName = "Ground Combat",
            StartingLevel = 1,
            MaxLevel = 3,
            UpgradeCosts = [10, 15],
            GateRuleKey = RuleKey.GroundCombat,
            Notes = "Requires Ground Combat rule. Starting level 1 allows building Transports (T) and Infantry (INF) for ground combat and planetary bombardment.",
            LevelNotes =
            [
                "Unlocks Space Marines and Heavy Infantry.",
                "Unlocks Grav Armor. Transports are equipped with drop ships and their defense strength increases to 2."
            ]
        },
        new()
        {
            Key = TechKey.ShipSize,
            DisplayName = "Ship Size",
            StartingLevel = 1,
            MaxLevel = 7,
            UpgradeCosts = [10, 15, 20, 20, 20, 30],
            Notes = "Starting level 1 allows building Scouts (SC), Colony Ships (CO), Shipyards (SY), Mining Ships, Decoys, and MS Pipelines. Higher levels unlock progressively larger hull classes.",
            LevelNotes =
            [
                "Unlocks Destroyer (DD) and Base.",
                "Unlocks Cruiser (CA).",
                "Unlocks Battlecruiser (BC).",
                "Unlocks Battleship (BB).",
                "Unlocks Dreadnought (DN).",
                "Unlocks Titan (TN)."
            ]
        },
        new()
        {
            Key = TechKey.Move,
            DisplayName = "Move",
            StartingLevel = 1,
            MaxLevel = 7,
            UpgradeCosts = [20, 25, 25, 25, 20, 20],
            Notes = "Determines how many hexes ships can move each turn in a 3-turn cycle before the economic phase.",
            LevelNotes =
            [
                "Movement: 1 / 1 / 2 (turns 1, 2, 3).",
                "Movement: 1 / 2 / 2.",
                "Movement: 2 / 2 / 2.",
                "Movement: 2 / 2 / 3.",
                "Movement: 2 / 3 / 3.",
                "Movement: 3 / 3 / 3."
            ]
        },
        new()
        {
            Key = TechKey.Shipyards,
            DisplayName = "Shipyards",
            StartingLevel = 1,
            MaxLevel = 3,
            UpgradeCosts = [20, 25],
            Notes = "Determines hull points buildable per Shipyard per econ phase. Level 1: each Shipyard produces 1 hull point. Two Shipyards in the same system combine their capacity.",
            LevelNotes =
            [
                "Each Shipyard produces 1.5 hull points per econ phase (rounded down).",
                "Each Shipyard produces 2 hull points per econ phase."
            ]
        },
        new()
        {
            Key = TechKey.Cloaking,
            DisplayName = "Cloaking",
            StartingLevel = 0,
            MaxLevel = 2,
            UpgradeCosts = [30, 30],
            GateRuleKey = RuleKey.Cloaking,
            Notes = "Requires Cloaking rule. Level 0 provides no capability.",
            LevelNotes =
            [
                "Unlocks Raiders (R).",
                "Raiders increase in attack strength and become harder to detect."
            ]
        },
        new()
        {
            Key = TechKey.Scanners,
            DisplayName = "Scanners",
            StartingLevel = 0,
            MaxLevel = 2,
            UpgradeCosts = [20, 20],
            GateRuleKey = RuleKey.Cloaking,
            Notes = "Requires Cloaking rule. Level 0 provides no capability. Allows Destroyers (DD) to detect cloaked Raiders.",
            LevelNotes =
            [
                "Destroyers (DD) can detect Raiders with Cloaking technology 1.",
                "Destroyers (DD) can detect Raiders with Cloaking technology 2."
            ]
        },
        new()
        {
            Key = TechKey.MissileBoats,
            DisplayName = "Missile Boats",
            StartingLevel = 0,
            MaxLevel = 2,
            UpgradeCosts = [20, 15],
            GateRuleKey = RuleKey.MissileBoats,
            Notes = "Requires Missile Boats faction (not yet implemented). Level 0 provides no capability. TODO: add per-level notes when faction is implemented."
        },
        new()
        {
            Key = TechKey.Jamming,
            DisplayName = "Jamming",
            StartingLevel = 0,
            MaxLevel = 2,
            UpgradeCosts = [15, 15],
            GateRuleKey = RuleKey.MissileBoats,
            Notes = "Requires Missile Boats faction (not yet implemented). Allows Cruisers (CA) to counter Missile attacks. Level 0 provides no capability.",
            LevelNotes =
            [
                "Cruisers (CA) may mount Jammer Technology. Reduces the Attack Strength of Missiles by 2.",
                "In addition to the Attack Strength reduction, if 2 Cruisers (CA) with Jammer 2 are present, Missiles have Attack Strength of 0."
            ]
        },
        new()
        {
            Key = TechKey.FastBattleCruiser,
            DisplayName = "Fast BC",
            StartingLevel = 0,
            MaxLevel = 2,
            UpgradeCosts = [10, 10],
            GateRuleKey = RuleKey.AdvancedConstruction,
            GatedFromLevel = 2,
            Notes = "Equips ships with Fast technology, allowing one extra hex of movement on turn 1 only.",
            LevelNotes =
            [
                "Battlecruisers (BC), Flagships, and Decoys may move one extra hex on turn 1.",
                "Destroyer X (DDX), Battle Carriers (BV), and Raider X (RX) may also move one extra hex on turn 1. Requires Advanced Construction rule. DDX and RX are advanced unit variants not yet in the unit catalog."
            ]
        },
        new()
        {
            Key = TechKey.TractorBeams,
            DisplayName = "Tractor Beams",
            StartingLevel = 0,
            MaxLevel = 1,
            UpgradeCosts = [10],
            GateRuleKey = RuleKey.AdvancedConstruction,
            Notes = "Requires Advanced Construction rule. Only installable on Battleships (BB). Level 0 provides no capability. TODO: requires Advanced Construction tech level 1 — tech-on-tech dependency not yet enforced. TODO: add effect description.",
            LevelNotes =
            [
                "Battleships (BB) may be equipped with Tractor Beams."
            ]
        },
        new()
        {
            Key = TechKey.ShieldProjectors,
            DisplayName = "Shield Projectors",
            StartingLevel = 0,
            MaxLevel = 1,
            UpgradeCosts = [10],
            GateRuleKey = RuleKey.AdvancedConstruction,
            Notes = "Requires Advanced Construction rule. Only installable on Dreadnoughts (DN). Level 0 provides no capability. TODO: requires Advanced Construction tech level 1 — tech-on-tech dependency not yet enforced. TODO: add effect description.",
            LevelNotes =
            [
                "Dreadnoughts (DN) may be equipped with Shield Projectors."
            ]
        },
        new()
        {
            Key = TechKey.SupplyRange,
            DisplayName = "Supply Range",
            StartingLevel = 1,
            MaxLevel = 4,
            UpgradeCosts = [10, 15, 15],
            GateRuleKey = RuleKey.Facilities,
            Notes = "Only used when playing with Logistics Facilities (36.5). Supply Range is the maximum distance a non-Scout, non-Raider combat ship can be from a friendly Colony and still be in Supply. A lone ship equipped with Exploration Technology in Deep Space has unlimited Supply Range. Starting level 1 = 1 hex from a friendly Colony.",
            LevelNotes =
            [
                "Supply Range increases to 2 hexes from a friendly Colony.",
                "Supply Range increases to 3 hexes from a friendly Colony.",
                "Supply Range increases to 4 hexes from a friendly Colony."
            ]
        },
        new()
        {
            Key = TechKey.Terraform,
            DisplayName = "Terraform",
            StartingLevel = 0,
            MaxLevel = 2,
            UpgradeCosts = [20, 25],
            GateRuleKey = RuleKey.TerraformingNebulae,
            GatedFromLevel = 2,
            Notes = "Level 0: can only colonize non-barren planets.",
            LevelNotes =
            [
                "Colony Ships may colonize any unoccupied planet including Barren Planets. Only Colony Ships purchased after this tech benefit (9.7).",
                "Mining Ships may harvest resources from Nebulae systems. Requires Terraforming Nebulae optional rule (34.0)."
            ]
        },
        new()
        {
            Key = TechKey.Exploration,
            DisplayName = "Exploration",
            StartingLevel = 0,
            MaxLevel = 2,
            UpgradeCosts = [15, 15],
            GateRuleKey = RuleKey.ReactionMovement,
            GatedFromLevel = 2,
            Notes = "Extends exploration capabilities. At level 0, ships explore by moving into an adjacent hex as normal.",
            LevelNotes =
            [
                "Cruisers (CA) may be equipped with Exploration technology, allowing them to peek at or flip one adjacent System Marker before moving (9.8).",
                "Bases, Shipyards (SY), Cruisers (CA), Flagships, Battle Carriers (BV), and Unique Ships with Exploration Technology may respond to battles in adjacent hexes (Reaction Movement). Bases and Shipyards are auto-upgraded but do not gain Exploration 1 benefits. Requires Reaction Movement optional rule (35.0)."
            ]
        },
        new()
        {
            Key = TechKey.Mines,
            DisplayName = "Mines",
            StartingLevel = 0,
            MaxLevel = 1,
            UpgradeCosts = [30],
            GateRuleKey = RuleKey.Mines,
            Notes = "Requires Mines rule. Level 0 provides no capability.",
            LevelNotes =
            [
                "Unlocks the ability to build and deploy Mines."
            ]
        },
        new()
        {
            Key = TechKey.MineSweeper,
            DisplayName = "Mine Sweeper",
            StartingLevel = 0,
            MaxLevel = 3,
            UpgradeCosts = [10, 15, 20],
            GateRuleKey = RuleKey.Mines,
            Notes = "Requires Mines rule. Level 0 provides no capability.",
            LevelNotes =
            [
                "Unlocks Mine Sweeper (SW) ships. Each Minesweeper sweeps 1 Mine before combat.",
                "Each Minesweeper sweeps 2 Mines before combat.",
                "Each Minesweeper sweeps 3 Mines before combat."
            ]
        },
        new()
        {
            Key = TechKey.AdvancedConstruction,
            DisplayName = "Advanced Construction",
            StartingLevel = 0,
            MaxLevel = 3,
            UpgradeCosts = [10, 10, 10],
            GateRuleKey = RuleKey.AdvancedConstruction,
            Notes = "Optional rule. Unlocks advanced ship variants and extended technologies. Level 0 provides no capability. TODO: AC1 requires a Ship Size 4+ ship to already be built — ship-existence dependency not yet enforced.",
            LevelNotes =
            [
                "Unlocks Destroyer X (DDX), Advanced Bases, and new technologies for Battleship (BB), Dreadnought (DN), and Titan (TN).",
                "Unlocks Battle Carriers (BV), Starbases, Fighter 4, and Mining Ship X (up to 4). Also unlocks Cyber Armor if Ground Combat 3 has been researched. TODO: Cyber Armor gate is a tech-on-tech dependency not yet enforced.",
                "Unlocks Raider X (RX), Scout X at Ship Size 7 (SCX#7), and allows upgrading the Flagship."
            ]
        },
        new()
        {
            Key = TechKey.AntiReplicator,
            DisplayName = "Anti-Replicator",
            StartingLevel = 0,
            MaxLevel = 1,
            UpgradeCosts = [10],
            GateRuleKey = RuleKey.Replicators,
            Notes = "Only relevant when playing against the Replicators faction.",
            LevelNotes =
            [
                "Transports positioned over a Replicator Colony at the Colony Start stage of growth may eliminate that Colony."
            ]
        },
    ];
}