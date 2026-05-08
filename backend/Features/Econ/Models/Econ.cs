using MongoDB.Bson.Serialization.Attributes;
using TypeGen.Core.TypeAnnotations;

namespace Features.Econ.Models;

[ExportTsInterface]
public class EconTransaction
{
    [BsonElement("round")]
    public int Round { get; set; }

    [BsonElement("mineralIncome")]
    public int MineralIncome { get; set; }

    [BsonElement("bid")]
    public int Bid { get; set; }
}