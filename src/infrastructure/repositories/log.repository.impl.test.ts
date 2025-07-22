import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";

describe("log.repository.impl.ts", () => {
  const mockLogDataSource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const logRepositoryImpl = new LogRepositoryImpl(mockLogDataSource);

  const log = new LogEntity({
    message: "Test log message",
    level: LogSeverityLevel.low,
    origin: "log.repository.impl.test",
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test to avoid interference
  });
  // const logRepositoryImpl = new LogRepositoryImpl();
  // // Add your tests here
  test("should save log", async () => {
    await logRepositoryImpl.saveLog(log);
    expect(mockLogDataSource.saveLog).toHaveBeenCalledWith(log);
  });

  test("should get logs", async () => {
    await logRepositoryImpl.getLogs(LogSeverityLevel.low);
    expect(mockLogDataSource.getLogs).toHaveBeenCalledWith(
      LogSeverityLevel.low
    );
  });
});
