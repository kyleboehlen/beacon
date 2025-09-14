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
            return result.ToString() == "{ \"ok\" : 1.0 }";
        }
        catch (Exception ex)
        {
            // TODO: Logging service
            return false;
        }
    }
    
    public async Task<bool> EmailServiceConnected()
    {
        if (_environment.IsDevelopment())
        {
            try
            {
                // Check connection
                HttpResponseMessage response = await HttpClient.GetAsync("http://mailpit:8025"); // only works in docker
                response.EnsureSuccessStatusCode();
                
                // Send health check email
                _emailService.sendHealthCheckEmail();
                return true;
            }
            catch (Exception ex)
            {
                // TODO: logging service
                return false;
            }
        }

        if (true) // TODO: Preview check
        {
            return true;
        }
        
        // TODO: Production check
    }
    
    public string GetEnvironment()
    {
        return _environment.EnvironmentName;
    }
}