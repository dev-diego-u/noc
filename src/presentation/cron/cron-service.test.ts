import { CronService } from "./cron-service";

describe("CronService", () => {
  // Add your tests here
  const mockTick = jest.fn();
  test("should create a job with the given cron expression", (done) => {
    const job = CronService.createJob("* * * * * *", mockTick);
    setTimeout(() => {
      expect(mockTick).toHaveBeenCalledTimes(2);
      job.stop();
      done(); // Ensure the job is stopped after the test
    }, 2000);
  });
});
