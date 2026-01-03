using System.Net;
using System.Net.Mail;

namespace Email;

public class EmailService
{
    private readonly SmtpClient _smtpClient;
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;

        string? password = _configuration["SMTP:Password"];
        if (string.IsNullOrEmpty(password))
        {
            password = Environment.GetEnvironmentVariable("SMTP_PASSWORD");
        }

        _smtpClient = new SmtpClient(_configuration["SMTP:Host"])
        {
            Port = _configuration.GetValue<int>("SMTP:Port"),
            Credentials = new NetworkCredential(_configuration["SMTP:Username"], password),
            EnableSsl = _configuration.GetValue<bool>("SMTP:EnableSsl"),
        };
    }

    public void SendHealthCheckEmail()
    {
        var fromAddress = _configuration["SMTP:From"]
            ?? throw new InvalidOperationException("SMTP:From configuration is missing");
        var toAddress = _configuration["SMTP:HealthCheckTo"]
            ?? throw new InvalidOperationException("SMTP:HealthCheckTo configuration is missing");

        var mailMessage = new MailMessage
        {
            From = new MailAddress(fromAddress, "B.E.A.C.O.N. App"),
            Subject = "Health Check",
            Body = "Health check email from Beacon backend.",
            IsBodyHtml = false,
        };
        mailMessage.To.Add(toAddress);

        _smtpClient.Send(mailMessage);
    }
}