namespace Features.Game.Models;

using MongoDB.Bson.Serialization.Attributes;

public partial class RulesConfig
{
    [BsonElement("msPipelines")]
    public RuleOption<bool> MsPipelines { get; set; } = new()
    {
        Value = false,
        Description =
            "Enables the MS Pipeline ship type.",
        Category = RuleCategory.Basic,
        Enabled = true,
        ReferenceNumber = "13.0"
    };
    
    [BsonElement("defenseSatelliteNetworks")]
    public RuleOption<bool> DefenseSatelliteNetworks { get; set; } = new()
    {
        Value = false,
        Description =
            "In addition to shipyards (SY) and bases you can build defense satellite networks (DSN).",
        Category = RuleCategory.Basic,
        Enabled = true,
        ReferenceNumber = "14.0"
    };
    
    [BsonElement("fighters")]
    public RuleOption<bool> Fighters { get; set; } = new()
    {
        Value = false,
        Description = "Enabling fighters also enables carriers (CV) and point defense technology for scouts.",
        Category = RuleCategory.Basic,
        Enabled = true,
        ReferenceNumber = "15.0"
    };

    [BsonElement("cloaking")]
    public RuleOption<bool> Cloaking { get; set; } = new()
    {
        Value = false,
        Description =
            "Cloaking allows for building raiders (R) as well as enables the scanner technology for destroyers (DD).",
        Category = RuleCategory.Basic,
        Enabled = true,
        ReferenceNumber = "16.0"
    };
    
    [BsonElement("mines")]
    public RuleOption<bool> Mines { get; set; } = new()
    {
        Value = false,
        Description =
            "Allows building mines, as well as the mine sweeper (SW) ship type.",
        Category = RuleCategory.Basic,
        Enabled = true,
        ReferenceNumber = "17.0"
    };
    
    [BsonElement("nonPlayerAliens")]
    public RuleOption<bool> NonPlayerAliens { get; set; } = new()
    {
        Value = false,
        Description =
            "Non player aliens spawn on non-homeworld baren planets and must be cleared before terraforming them. If playing with alien technology cards then landing a colony ship on a non-player alien baren planet will yield an alien technology card.",
        Category = RuleCategory.Basic,
        Enabled = true,
        ReferenceNumber = "18.0"
    };
    
    [BsonElement("boardingShips")]
    public RuleOption<bool> BoardingShips { get; set; } = new()
    {
        Value = false,
        Description =
            "Boarding ships allow capturing of other players ships and technologies. It is highly recommended that you also play with security forces.",
        Category = RuleCategory.Basic,
        Enabled = true,
        ReferenceNumber = "19.0"
    };
    
    [BsonElement("securityForces")]
    public RuleOption<bool> SecurityForces { get; set; } = new()
    {
        Value = false,
        Description =
            "The counter to boarding ships, trains your crew to fend off boarding troops.",
        Category = RuleCategory.Basic,
        // TODO: only enable if boarding ships is true
        Enabled = true,
        ReferenceNumber = "20.0"
    };
    
    [BsonElement("groundCombat")]
    public RuleOption<bool> GroundCombat { get; set; } = new()
    {
        Value = false,
        Description =
            "Allows for building transports, which can carry ground troops and fighters, as well as enabling ground combat including planetary bombardment.",
        Category = RuleCategory.Basic,
        Enabled = true,
        ReferenceNumber = "21.0"
    };
    
    // TODO: types of supported ground troops
    
    [BsonElement("titans")]
    public RuleOption<bool> Titans { get; set; } = new()
    {
        Value = false,
        Description =
            "Unlocks the titan ship type.",
        Category = RuleCategory.Basic,
        Enabled = true,
        ReferenceNumber = "21.0"
    };
    
    [BsonElement("flagships")]
    public RuleOption<bool> Flagships { get; set; } = new()
    {
        Value = false,
        Description =
            "Each player starts with a flagship. They pay no maintenance, can use exploration 1 and fast 1 technology, and cannot be rebuilt when they are destroyed.",
        Category = RuleCategory.Basic,
        Enabled = true,
        ReferenceNumber = "21.0"
    };
    
    // TODO: types of supported ground troops
}