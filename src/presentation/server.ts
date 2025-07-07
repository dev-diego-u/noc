import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
  //aqui eventualmente podras usar otro datasource
  // new MongoDBDataSource()
);

export class ServerApp {
  public static start(): void {
    console.log("Server is starting...");
    // Additional server initialization logic can go here
    CronService.createJob(
      "*/5 * * * * *", // This cron expression runs the job every hour
      () => {
        const url = "https://google.com"; // URL to check
        new CheckService(
          fileSystemLogRepository, // Injecting the log repository
          () => console.log(`${url} is ok`), // Success callback
          (error) => console.error(`Check service failed: ${error}`)
        ).execute(url); // Execute the check service with the URL
        // new CheckService().execute("http://localhost:3000");
      }
    );
  }
}
