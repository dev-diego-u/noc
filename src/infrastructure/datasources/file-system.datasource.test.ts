import { FileSystemDataSource } from "./file-system.datasource";
import fs from "fs";
import path from "path";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe("file-system.datasource.ts", () => {
  const logPath = path.join(__dirname, "../../../logs");
  // console.log("logPath:", logPath);
  beforeEach(() => {
    // Clean up the logs directory before each test
    if (fs.existsSync(logPath)) {
      fs.rmSync(logPath, { recursive: true, force: true });
    }
  });

  test("should create log files if they do not exist", () => {
    new FileSystemDataSource();
    const files = fs.readdirSync(logPath); // List files in the logs directory
    // console.log("Files in logs directory:", files);
    expect(files).toEqual(["logs-all.log", "logs-high.log", "logs-medium.log"]);
  });

  test("should save a log in logs-all.log", async () => {
    const dataSource = new FileSystemDataSource();
    const log = new LogEntity({
      level: LogSeverityLevel.low,
      message: "Test log message",
      createdAt: new Date(),
      origin: "test-origin",
    });
    await dataSource.saveLog(log);
    const allLogs = fs.readFileSync(
      path.join(logPath, "logs-all.log"),
      "utf-8"
    );

    // console.log(allLogs);
    expect(allLogs).toContain(JSON.stringify(log));
  });

  test("should save a log in logs-all.log and logs-medium.log", async () => {
    const dataSource = new FileSystemDataSource();
    const log = new LogEntity({
      level: LogSeverityLevel.medium,
      message: "Test log message",
      createdAt: new Date(),
      origin: "test-origin",
    });
    await dataSource.saveLog(log);
    const allLogs = fs.readFileSync(
      path.join(logPath, "logs-all.log"),
      "utf-8"
    );
    const mediumLogs = fs.readFileSync(
      path.join(logPath, "logs-medium.log"),
      "utf-8"
    );

    // console.log(allLogs);
    expect(allLogs).toContain(JSON.stringify(log));
    expect(mediumLogs).toContain(JSON.stringify(log));
  });

  test("should save a log in logs-all.log and logs-high.log", async () => {
    const dataSource = new FileSystemDataSource();
    const log = new LogEntity({
      level: LogSeverityLevel.high,
      message: "Test log message",
      createdAt: new Date(),
      origin: "test-origin",
    });
    await dataSource.saveLog(log);
    const allLogs = fs.readFileSync(
      path.join(logPath, "logs-all.log"),
      "utf-8"
    );
    const highLogs = fs.readFileSync(
      path.join(logPath, "logs-high.log"),
      "utf-8"
    );

    // console.log(allLogs);
    expect(allLogs).toContain(JSON.stringify(log));
    expect(highLogs).toContain(JSON.stringify(log));
  });

  test("should return all logs", async () => {
    const dataSource = new FileSystemDataSource();
    const logLow = new LogEntity({
      level: LogSeverityLevel.low,
      message: "Test log message",
      createdAt: new Date(),
      origin: "test-origin",
    });
    const logMedium = new LogEntity({
      level: LogSeverityLevel.medium,
      message: "Test log message",
      createdAt: new Date(),
      origin: "test-origin",
    });

    const logHigh = new LogEntity({
      level: LogSeverityLevel.high,
      message: "Test log message",
      createdAt: new Date(),
      origin: "test-origin",
    });
    await dataSource.saveLog(logLow);
    await dataSource.saveLog(logMedium);
    await dataSource.saveLog(logHigh);

    const logsLow = await dataSource.getLogs(LogSeverityLevel.low);
    const logsMedium = await dataSource.getLogs(LogSeverityLevel.medium);
    const logsHigh = await dataSource.getLogs(LogSeverityLevel.high);
    // console.log(logsLow);
    expect(logsLow).toEqual([logLow, logMedium, logHigh]);
    expect(logsMedium).toEqual([logMedium]);
    expect(logsHigh).toEqual([logHigh]);
  });

  test("should return empty array for non-existent severity level", async () => {
    const dataSource = new FileSystemDataSource();
    const logs = await dataSource.getLogs(LogSeverityLevel.low);
    expect(logs).toEqual([]);
  });

  test("should throw error for invalid severity level", async () => {
    const dataSource = new FileSystemDataSource();
    const invalidSeverity = "invalid" as LogSeverityLevel; // Simulate an invalid severity level
    try {
      await dataSource.getLogs(invalidSeverity);
      expect(true).toBe(false); // This should not be reached
    } catch (error) {
      const errorMessage = `${error}`;
      // console.log(errorMessage);
      expect(errorMessage).toContain("Invalid severity level");
    }
  });
});
