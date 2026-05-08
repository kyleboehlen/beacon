using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using TypeGen.Core.TypeAnnotations;
using Features.Econ.Models;
using Features.Rules.Models;

namespace Features.Game.Models;

[ExportTsInterface]
[BsonIgnoreExtraElements]
public class Game
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    // Snapshot of the rules config at session start — rules are fixed for the duration of play
    [TsNull] [BsonElement("rules")] public RulesConfig Rules { get; set; } = new();

    [BsonElement("econRounds")]
    public EconTransaction[] EconRounds { get; set; } = [];

    [BsonElement("techUpgrades")]
    public TechUpgradeTransaction[] TechUpgrades { get; set; } = [];

    [BsonElement("createdAt")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [BsonElement("updatedAt")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}