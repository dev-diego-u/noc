import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class ServerApp {
  public static start(): void {
    console.log("Server is starting...");
    // Additional server initialization logic can go here
    CronService.createJob(
      "*/5 * * * * *", // This cron expression runs the job every hour
      () => {
        new CheckService(
          () => console.log("Check service executed successfully"),
          (error) => console.error(`Check service failed: ${error}`)
        ).execute("https://google.com");
        // new CheckService().execute("http://localhost:3000");
      }
    );
  }
}
