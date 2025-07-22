import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDataSource } from "./log.datasources";

describe("log.datasources.ts", () => {
  const newLog: LogEntity = {
    level: LogSeverityLevel.low,
    message: "Test log message",
    origin: "Test origin",
    createdAt: new Date(),
  };

  class MockLogDatasource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [newLog];
    }
  }
  test("should implement all required methods from LogDataSource", async () => {
    const logDatasource = new MockLogDatasource();
    expect(logDatasource).toBeInstanceOf(MockLogDatasource);
    expect(logDatasource).toHaveProperty("saveLog");
    expect(logDatasource).toHaveProperty("getLogs");
    expect(typeof logDatasource.saveLog).toBe("function");
    expect(typeof logDatasource.getLogs).toBe("function");

    //verificar return types
    const saveLogResult = await logDatasource.saveLog(newLog);
    expect(saveLogResult).toBeUndefined(); // verifica que el resultado sea undefined
    const logs = await logDatasource.getLogs(LogSeverityLevel.low);
    expect(logs).toBeInstanceOf(Array); //verifica que sea un array
  });
});
