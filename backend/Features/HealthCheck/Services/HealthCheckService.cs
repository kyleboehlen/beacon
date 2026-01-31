using Email;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Features.HealthCheck.Services;

public class HealthCheckService(IWebHostEnvironment environment, IMongoDatabase database, EmailService emailService)
{
    private static readonly HttpClient HttpClient = new HttpClient();

    public async Task<bool> DatabaseConnected(bool check)
    {
        if (!check) return false;

        try
        {
            // Simple ping command
            var result = await database.RunCommandAsync((Command<BsonDocument>)"{ping:1}");
            return result.ToString() == "{ \"ok\" : 1.0 }" || result.ToString() == "{ \"ok\" : 1 }";
        }
        catch
        {
            // TODO: Logging service
            return false;
        }
    }

    public async Task<bool> EmailServiceConnected(bool check)
    {
        // ReSharper disable once InvertIf
        if (check)
        {
            if (environment.IsDevelopment())
            {
                try
                {
                    // Check connection
                    var response = await HttpClient.GetAsync("http://mailpit:8025"); // only works in docker
                    response.EnsureSuccessStatusCode();

                    return true;
                }
                catch
                {
                    // TODO: logging service
                    return false;
                }
            }
            // ReSharper disable once RedundantIfElseBlock
            else
            {
                emailService.SendHealthCheckEmail();
            }
        }

        return true;
    }

    public string GetEnvironment()
    {
        return environment.EnvironmentName;
    }
}