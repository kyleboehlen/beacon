using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using TypeGen.Core.TypeAnnotations;

namespace Features.Game.Models;

[ExportTsInterface]
[BsonIgnoreExtraElements]
public class Game
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [TsNull]
    [BsonElement("rules")]
    public RulesConfig Rules { get; set; } = new();

    [BsonElement("createdAt")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [BsonElement("updatedAt")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}