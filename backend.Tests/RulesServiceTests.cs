using Features.Rules.Models;
using Features.Rules.Services;

namespace backend.Tests;

public class RulesServiceTests
{
    [Fact]
    public void ValidateRuleRelationships_DefaultConfig_ReturnsNoViolations()
    {
        var config = new RulesConfig();

        var violations = RulesService.ValidateRuleRelationships(config);

        Assert.Empty(violations);
    }

    [Fact]
    public void ValidateRuleRelationships_IncompatibleRulesBothEnabled_ReturnsViolation()
    {
        var config = new RulesConfig();
        config.Replicators.Value = true;
        config.TerraformingNebulae.Value = true;

        var violations = RulesService.ValidateRuleRelationships(config);

        Assert.Single(violations);
        Assert.Contains("Replicators", violations[0]);
        Assert.Contains("TerraformingNebulae", violations[0]);
    }

    [Fact]
    public void ValidateRuleRelationships_RequiresRuleViolated_ReturnsViolation()
    {
        var config = new RulesConfig();
        config.SecurityForces.Value = true;

        var violations = RulesService.ValidateRuleRelationships(config);

        Assert.Single(violations);
        Assert.Contains("SecurityForces", violations[0]);
        Assert.Contains("BoardingShips", violations[0]);
    }

    [Fact]
    public void ValidateRuleRelationships_UnsupportedRuleEnabled_ReturnsViolation()
    {
        var config = new RulesConfig();
        config.InstantUpgrades.Value = true;

        var violations = RulesService.ValidateRuleRelationships(config);

        Assert.Single(violations);
        Assert.Contains("InstantUpgrades", violations[0]);
    }
}