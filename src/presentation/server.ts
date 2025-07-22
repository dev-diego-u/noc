import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { EmailService } from "./email/email-service";
import { SendsEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { MongoDatasource } from "../infrastructure/datasources/mongo-datasource-log";
import { LogSeverityLevel, LogEntity } from "../domain/entities/log.entity";
import { PostgresDatasource } from "../infrastructure/datasources/postgres.datasource";
import { CheckServiceMulti } from "../domain/use-cases/checks/check-service-multi";
const postgresLogRepository = new LogRepositoryImpl(
  // new FileSystemDataSource()
  // new MongoDatasource()
  //aqui eventualmente podras usar otro datasource
  // new MongoDBDataSource()
  new PostgresDatasource()
);

const mongoLogRepository = new LogRepositoryImpl(new MongoDatasource());

const fsLogRepository = new LogRepositoryImpl(new FileSystemDataSource());

// const emailService = new EmailService();

export class ServerApp {
  public static async start(): Promise<void> {
    console.log("Server is starting...");

    CronService.createJob(
      "*/5 * * * * *", // This cron expression runs the job every hour
      () => {
        const url = "https://google.com"; // URL to check
        new CheckServiceMulti(
          [postgresLogRepository, mongoLogRepository, fsLogRepository], // Injecting the log repository
          () => console.log(`${url} is ok`), // Success callback
          (error) => console.error(`Check service failed: ${error}`)
        ).execute(url); // Execute the check service with the URL
        // new CheckService().execute("http://localhost:3000");
      }
    );

    //*guardar y obtener logs
    // const log = await logRepository.saveLog({
    //   message: "Servidor iniciado correctamente",
    //   level: LogSeverityLevel.low,
    //   origin: "ServerApp.start",
    //   createdAt: new Date(),
    // });
    // const logs = await logRepository.getLogs(LogSeverityLevel.medium);
    // console.log(logs);

    //*envias servicio email ,repositorio y executas con los correos a donde se enviaran las notificaciones
    // new SendsEmailLogs(emailService, fileSystemLogRepository).execute([
    //   "diegoubillaramos@gmail.com",
    //   "diego_ubilla@hotmail.com",
    // ]);

    //* mandar email
    const emailService = new EmailService();

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
    //       logRepository, // Injecting the log repository
    //       () => console.log(`${url} is ok`), // Success callback
    //       (error) => console.error(`Check service failed: ${error}`)
    //     ).execute(url); // Execute the check service with the URL
    //     // new CheckService().execute("http://localhost:3000");
    //   }
    // );
  }
}
