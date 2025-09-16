using Email;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Features.HealthCheck.Services;

public class HealthCheckService
{
    private readonly IWebHostEnvironment _environment;
    private readonly IMongoDatabase _database;
    private readonly EmailService _emailService;
    private static readonly HttpClient HttpClient = new HttpClient();
    
    public HealthCheckService(IWebHostEnvironment environment, IMongoDatabase database, EmailService emailService)
    {
        _environment = environment;
        _database = database;
        _emailService = emailService;
    }
    
    public async Task<bool> DatabaseConnected()
    {
        try
        {
            // Simple ping command
            var result = await _database.RunCommandAsync((Command<BsonDocument>)"{ping:1}");
            return result.ToString() == "{ \"ok\" : 1.0 }" || result.ToString() == "{ \"ok\" : 1 }";
        }
        catch (Exception ex)
        {
            // TODO: Logging service
            return false;
        }
    }
    
    public async Task<bool> EmailServiceConnected()
    {
        _emailService.SendHealthCheckEmail();
        
        if (_environment.IsDevelopment())
        {
            try
            {
                // Check connection
                HttpResponseMessage response = await HttpClient.GetAsync("http://mailpit:8025"); // only works in docker
                response.EnsureSuccessStatusCode();
                
                return true;
            }
            catch (Exception ex)
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
        return _environment.EnvironmentName;
    }
}