import mongoose from "mongoose";
import { LogModel, mongoDatabase } from "../../config/data/mongo";
import { envs } from "../../config/plugins/envs.plugin";
import { MongoDatasource } from "./mongo-datasource-log";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe("mongo-datasource-log.test.ts", () => {
  const mongoDatasource = new MongoDatasource();
  const log = new LogEntity({
    message: "Test log message",
    level: LogSeverityLevel.low,
    origin: "mongo-datasource-log.test",
  });

  // Connect to the MongoDB database before running tests
  beforeAll(async () => {
    await mongoDatabase.connect({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME,
    });
  });

  afterAll(async () => {
    // Close the connection after all tests
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Clear the logs collection before each test
    await LogModel.deleteMany({});
  });

  test("should save a log", async () => {
    const logSpy = jest.spyOn(console, "log");

    await mongoDatasource.saveLog(log);
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(
      "log created in mongo",
      expect.any(String)
    );
  });

  test("should get logs by severity level", async () => {
    await mongoDatasource.saveLog(log);
    const logs = await mongoDatasource.getLogs(LogSeverityLevel.low);

    expect(logs.length).toBe(1);
    expect(logs[0].level).toBe(LogSeverityLevel.low);
  });
});
