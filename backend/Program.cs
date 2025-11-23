using Email;
using Features.HealthCheck.Services;
using MongoDB.Driver;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

// Configure CORS
var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>() ?? [];
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(allowedOrigins)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

// DI
builder.Services.AddScoped<HealthCheckService>();
builder.Services.AddScoped<EmailService>();

var connectionString = builder.Configuration.GetConnectionString("MongoDB");

if (string.IsNullOrEmpty(connectionString))
{
    connectionString = Environment.GetEnvironmentVariable("MONGODB_CONNECTION_STRING");
}

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddSingleton<IMongoClient>(serviceProvider =>
    {
        var clientSettings = MongoClientSettings.FromConnectionString(connectionString);
        clientSettings.ApplicationName = "beacon";
        return new MongoClient(clientSettings);
    });
}
else
{
    builder.Services.AddSingleton<IMongoClient>(serviceProvider => { return new MongoClient(connectionString); });
}

builder.Services.AddScoped<IMongoDatabase>(serviceProvider =>
{
    var client = serviceProvider.GetService<IMongoClient>();
    return client.GetDatabase("beacon");
});

var app = builder.Build();

// Scalar API Reference
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

if (app.Environment.IsProduction())
{
    app.UseHttpsRedirection();
}

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();