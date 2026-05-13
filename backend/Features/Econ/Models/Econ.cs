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

    // TEMPORARY: manually entered colony income until colony state is fully transactional
    // (tracked via build/attack transactions). Remove and derive from colony history then.
    [BsonElement("colonyIncome")]
    public int ColonyIncome { get; set; }

    [BsonElement("bid")]
    public int Bid { get; set; }
}