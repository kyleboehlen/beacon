using Features.Game.Models;
using MongoDB.Driver;

namespace Features.Game.Services;

public class GameService(IMongoDatabase database)
{
    private readonly IMongoCollection<Models.Game> _games = database.GetCollection<Models.Game>("games");

    // TODO: below is placeholder for typical service behavior
    // public async Task<Models.Game> CreateGame(Models.Game game)
    // {
    //     await _games.InsertOneAsync(game);
    //     return game;
    // }
    //
    // public async Task<Models.Game?> GetGameById(string id)
    // {
    //     return await _games.Find(g => g.Id == id).FirstOrDefaultAsync();
    // }
    //
    // public async Task<List<Models.Game>> GetAllGames()
    // {
    //     return await _games.Find(_ => true).ToListAsync();
    // }
    //
    // public async Task<bool> UpdateGame(string id, Models.Game game)
    // {
    //     game.UpdatedAt = DateTime.UtcNow;
    //     var result = await _games.ReplaceOneAsync(g => g.Id == id, game);
    //     return result.ModifiedCount > 0;
    // }
    //
    // public async Task<bool> DeleteGame(string id)
    // {
    //     var result = await _games.DeleteOneAsync(g => g.Id == id);
    //     return result.DeletedCount > 0;
    // }
}
