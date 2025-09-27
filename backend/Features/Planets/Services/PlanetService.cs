using System.Text.Json;

namespace backend.Features.Planets;

public class PlanetService
{
    private static readonly HttpClient _httpClient = new HttpClient();
    public async Task<List<Planet>> GetAllPlanets()
    {
        var response = await _httpClient.GetAsync("https://challenges.hackajob.co/swapi/api/planets");
        response.EnsureSuccessStatusCode();
        var stringResponse = await response.Content.ReadAsStringAsync();
        var planetResponse = JsonSerializer.Deserialize<PlanentResponse>(stringResponse, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true 
        });
        return planetResponse.Results;
    }

    public async Task<List<Planet>> GetPlanetsByTerrain(string terrain)
    {
        var allPlanets = await GetAllPlanets();
        return allPlanets.Where(p => p.Terrain == terrain).ToList();
    }
}