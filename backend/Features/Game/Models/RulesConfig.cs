using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using TypeGen.Core.TypeAnnotations;

namespace Features.Game.Models;

[ExportTsInterface]
[BsonIgnoreExtraElements]
public class RulesConfig
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [BsonElement("raiders")]
    public bool Raiders { get; set; }

    [BsonElement("msPipelines")]
    public bool MsPipelines { get; set; }

    [BsonElement("mines")]
    public bool Mines { get; set; }

    [BsonElement("fighters")]
    public bool Fighters { get; set; }

    [BsonElement("createdAt")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [BsonElement("updatedAt")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}