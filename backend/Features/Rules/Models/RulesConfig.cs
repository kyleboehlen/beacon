using Common.Models;
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
    
    [BsonIgnore]
    public RuleRelationship[] RuleRelationships { get; init; } =
    [
        // Replicators (40.0) disables the following rules
        new() { Source = RuleKey.Replicators, Target = RuleKey.TerraformingNebulae, Type = RuleRelationType.Incompatible },
        // TODO: new() { Source = RuleKey.Replicators, Target = RuleKey.Facilities, Type = RuleRelationType.Incompatible },
        // TODO: new() { Source = RuleKey.Replicators, Target = RuleKey.ReactionMovement, Type = RuleRelationType.Incompatible },
        // TODO: new() { Source = RuleKey.Replicators, Target = ???uniqueShips, Type = RuleRelationType.Incompatible },
        // TODO: new() { Source = RuleKey.Replicators, Target = ???shipExperience, Type = RuleRelationType.Incompatible },
        // TODO: new() { Source = RuleKey.Replicators, Target = ???spaceAmoebas, Type = RuleRelationType.Incompatible },
        // TODO: new() { Source = RuleKey.Replicators, Target = ???bloodBrotherAlliances, Type = RuleRelationType.Incompatible },
        // TODO: new() { Source = RuleKey.Replicators, Target = ???galacticCapitol, Type = RuleRelationType.Incompatible },
        // TODO: new() { Source = RuleKey.Replicators, Target = ???missionCards, Type = RuleRelationType.Incompatible },

        // Security Forces requires Boarding Ships
        new() { Source = RuleKey.SecurityForces, Target = RuleKey.BoardingShips, Type = RuleRelationType.Requires },
    ];

    [BsonElement("createdAt")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [BsonElement("updatedAt")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}