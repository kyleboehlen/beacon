namespace Features.Rules.Services;

using Features.Rules.Models;

public class RulesService
{
    public RulesConfig GetDefaultRulesConfig()
    {
        return new RulesConfig();
    }
}