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
        var mailMessage = new MailMessage
        {
            From = new MailAddress(_configuration["SMTP:From"], "B.E.A.C.O.N. App"),
            Subject = "Health Check",
            Body = "Health check email from Beacon backend.",
            IsBodyHtml = false,
        };
        mailMessage.To.Add(_configuration["SMTP:HealthCheckTo"]);

        _smtpClient.Send(mailMessage);  
    }
}