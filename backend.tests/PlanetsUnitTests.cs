using Xunit;
using backend.Features.Planets;

namespace backend.tests;

public class PlanetsUnitTests
{
    [Fact]
    public async Task GetAllPlanets_VerifyEndpointReturns200()
    {
        var PlanetService = new PlanetService();
        var result = await PlanetService.GetAllPlanets();
        Assert.True(result.Count > 0);
    }
    
    [Fact]
    public async Task GetFirstPlanet_VerifyAllValuesArePresent()
    {
        var PlanetService = new PlanetService();
        var result = await PlanetService.GetAllPlanets();
        var tatooine = result[0];
        Assert.False(String.IsNullOrEmpty(tatooine.Name));
    }
    
    [Fact]
    public async Task GetPlanetByTerrarn_VerifyDesertPlanents()
    {
        var PlanetService = new PlanetService();
        var result = await PlanetService.GetPlanetsByTerrain("desert");
        Assert.True(result[0].Name == "Tatooine");
    }
}