using MongoDB.Bson.Serialization.Attributes;
using TypeGen.Core.TypeAnnotations;

namespace Features.Econ.Models;

[ExportTsInterface]
public class TechUpgradeTransaction
{
    [BsonElement("round")]
    public int Round { get; set; }

    [BsonElement("tech")]
    public TechKey Tech { get; set; }

    // Space Wrecks (rule 28.0) allow an additional free upgrade in the same round
    [BsonElement("spaceWreck")]
    public bool SpaceWreck { get; set; }
}