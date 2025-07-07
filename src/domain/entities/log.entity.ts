export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;

  constructor(level: LogSeverityLevel, message: string) {
    this.level = level;
    this.message = message;
    this.createdAt = new Date();
  }

  static fromJson(json: string): LogEntity {
    const { message, level, createdAt } = JSON.parse(json); //toma el mensaje, el nivel y la fecha de creación del JSON

    const log = new LogEntity(message, level); // Create a new instance of LogEntity
    log.createdAt = new Date(createdAt); // Convert string to Date object
    return log;
  }
}
