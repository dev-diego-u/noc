import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { EmailService } from "./email/email-service";
import { SendsEmailLogs } from "../domain/use-cases/email/send-email-logs";
const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
  //aqui eventualmente podras usar otro datasource
  // new MongoDBDataSource()
);

const emailService = new EmailService();

export class ServerApp {
  public static start(): void {
    console.log("Server is starting...");

    new SendsEmailLogs(emailService, fileSystemLogRepository).execute([
      "diegoubillaramos@gmail.com",
      "diego_ubilla@hotmail.com",
    ]);

    //todo mandar email
    // const emailService = new EmailService(fileSystemLogRepository);

    // emailService.sendWithFileSystemLogs([
    //   "diegoubillaramos@gmail.com",
    //   "diego_ubilla@hotmail.com",
    // ]);
    // emailService.sendEmail({
    //   to: "diego_ubilla@hotmail.com",
    //   subject: "Logs del servidor",
    //   htmlBody: `
    //     <h1>Logs de sistema - NOC</h1>
    //     <p>Saludos, Diego Alfaro</p>
    //     <p>Se adjuntan los logs del sistema.</p>
    //   `,
    // });

    // // Additional server initialization logic can go here
    // CronService.createJob(
    //   "*/5 * * * * *", // This cron expression runs the job every hour
    //   () => {
    //     const url = "https://google.com"; // URL to check
    //     new CheckService(
    //       fileSystemLogRepository, // Injecting the log repository
    //       () => console.log(`${url} is ok`), // Success callback
    //       (error) => console.error(`Check service failed: ${error}`)
    //     ).execute(url); // Execute the check service with the URL
    //     // new CheckService().execute("http://localhost:3000");
    //   }
    // );
  }
}
