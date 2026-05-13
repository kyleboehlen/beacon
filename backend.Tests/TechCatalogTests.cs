using Features.Econ.Models;

namespace backend.Tests;

public class TechCatalogTests
{
    [Fact]
    public void AllTechKeys_ShouldAppearExactlyOnceInCatalog()
    {
        var allKeys = Enum.GetValues<TechKey>();
        var catalogKeys = TechCatalog.All.Select(t => t.Key).ToList();

        var missing = allKeys.Except(catalogKeys).ToList();
        var duplicates = catalogKeys.GroupBy(k => k).Where(g => g.Count() > 1).Select(g => g.Key).ToList();

        Assert.Empty(missing);
        Assert.Empty(duplicates);
    }

    [Fact]
    public void AllTechDefinitions_UpgradeCostsLength_ShouldMatchMaxMinusStartingLevel()
    {
        var violations = TechCatalog.All
            .Where(t => t.UpgradeCosts.Length != t.MaxLevel - t.StartingLevel)
            .Select(t => $"{t.Key}: UpgradeCosts.Length={t.UpgradeCosts.Length}, expected {t.MaxLevel - t.StartingLevel}")
            .ToList();

        Assert.Empty(violations);
    }

    [Fact]
    public void AllTechDefinitions_LevelNotes_WhenSet_ShouldMatchUpgradeCostsLength()
    {
        var violations = TechCatalog.All
            .Where(t => t.LevelNotes != null && t.LevelNotes.Length != t.UpgradeCosts.Length)
            .Select(t => $"{t.Key}: LevelNotes.Length={t.LevelNotes!.Length}, expected {t.UpgradeCosts.Length}")
            .ToList();

        Assert.Empty(violations);
    }

    [Fact]
    public void AllTechDefinitions_GatedFromLevel_WhenSet_ShouldBeWithinValidRange()
    {
        var violations = TechCatalog.All
            .Where(t => t.GatedFromLevel.HasValue)
            .Where(t => t.GatedFromLevel!.Value <= t.StartingLevel || t.GatedFromLevel!.Value > t.MaxLevel)
            .Select(t => $"{t.Key}: GatedFromLevel={t.GatedFromLevel}, must be in ({t.StartingLevel}, {t.MaxLevel}]")
            .ToList();

        Assert.Empty(violations);
    }
}