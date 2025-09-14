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
        _smtpClient = new SmtpClient(_configuration["SMTP:Host"])
        {
            Port = _configuration.GetValue<int>("SMTP:Port"),
            Credentials = new NetworkCredential(_configuration["SMTP:Username"], _configuration["SMTP:Password"]),
            EnableSsl = _configuration.GetValue<bool>("SMTP:EnableSsl"),
        };
    }

    public void sendHealthCheckEmail()
    {
        var mailMessage = new MailMessage
        {
            From = new MailAddress(_configuration["SMTP:From"]),
            Subject = "Health Check",
            Body = "Health check email from Beacon backend.",
            IsBodyHtml = false,
        };
        mailMessage.To.Add(_configuration["SMTP:HealthCheckTo"]);

        _smtpClient.Send(mailMessage);  
    }
}