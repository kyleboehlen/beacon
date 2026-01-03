using Email;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Features.HealthCheck.Services;

public class HealthCheckService(IWebHostEnvironment environment, IMongoDatabase database, EmailService emailService)
{
    private readonly EmailService _emailService = emailService;
    private static readonly HttpClient HttpClient = new HttpClient();

    public async Task<bool> DatabaseConnected()
    {
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

    public async Task<bool> EmailServiceConnected()
    {
        // _emailService.SendHealthCheckEmail(); // THIS IS FOR DEBUGGING PURPOSES ONLY

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

        // We can assume that a production SMTP service is reliable
        return true; // If sending the email doesn't throw an exception, we assume it's working
    }

    public string GetEnvironment()
    {
        return environment.EnvironmentName;
    }
}