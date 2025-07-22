import { envs } from "../../config/plugins/envs.plugin";
import { EmailService, SendMailOptions } from "./email-service";

describe("EmailService", () => {
  // Add your tests here
  test("should send an email ", async () => {
    // console.log(envs);
    const emailService = new EmailService();
    const option: SendMailOptions = {
      to: "black99.gol@gmail.com",
      subject: "Test Email",
      htmlBody: "<h1>This is a test email</h1>",
    };
    const result = await emailService.sendEmail(option);
    expect(result).toBeTruthy();
  });

  test("should return false when email sending fails", async () => {
    const emailService = new EmailService();
    const option: SendMailOptions = {
      to: "invalid-email",
      subject: "Test Email",
      htmlBody: "<h1>This is a test email</h1>",
    };
    const result = await emailService.sendEmail(option);
    expect(result).toBeFalsy();
  });

  test("should send an email with attachments", async () => {
    const emailService = new EmailService();

    const result = await emailService.sendWithFileSystemLogs(
      "black99.gol@gmail.com"
    );
    expect(result).toBeTruthy();
  });
});
