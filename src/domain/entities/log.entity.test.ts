import { LogEntity, LogSeverityLevel } from "./log.entity";

describe("log.entity.ts", () => {
  test("should create a LogEntity instance ", () => {
    const logObject = {
      level: LogSeverityLevel.low,
      message: "Test message",
      origin: "Test origin",
    };
    const log = new LogEntity(logObject);
    expect(log).toBeInstanceOf(LogEntity);
    expect(log.level).toBe(LogSeverityLevel.low);
    expect(log.message).toBe("Test message");
    expect(log.origin).toBe("Test origin");
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test("should create a LogEntity from JSON", () => {
    const json = JSON.stringify({
      level: LogSeverityLevel.medium,
      message: "Test message from JSON",
      createdAt: new Date(), // Convert to ISO string
      origin: "Test origin from JSON",
    });
    const log = LogEntity.fromJson(json);
    expect(log).toBeInstanceOf(LogEntity);
    expect(log.level).toBe(LogSeverityLevel.medium);
    expect(log.message).toBe("Test message from JSON");
    expect(log.origin).toBe("Test origin from JSON");
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test("should create a LogEntity from object", () => {
    const object = {
      level: LogSeverityLevel.high,
      message: "Test message from object",
      createdAt: new Date(),
      origin: "Test origin from object",
    };
    const log = LogEntity.fromObject(object);
    expect(log).toBeInstanceOf(LogEntity);
    expect(log.level).toBe(LogSeverityLevel.high);
    expect(log.message).toBe("Test message from object");
    expect(log.origin).toBe("Test origin from object");
    expect(log.createdAt).toBeInstanceOf(Date);
  });
});
