using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using TypeGen.Core.TypeAnnotations;

namespace Features.Rules.Models;

[ExportTsInterface]
[BsonIgnoreExtraElements]
public partial class RulesConfig
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;

    [BsonElement("status")]
    public RulesConfigStatus Status { get; set; } = RulesConfigStatus.Draft;

    [BsonElement("createdAt")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [BsonElement("updatedAt")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}