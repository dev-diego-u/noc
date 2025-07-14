export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  createdAt?: Date;
  origin: string;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { level, message, createdAt = new Date(), origin } = options;
    this.level = level;
    this.message = message;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  //* Crea una instancia de LogEntity a partir de un string JSON.
  static fromJson(json: string): LogEntity {
    json = json === "" ? "{}" : json;
    const { message, level, createdAt, origin } = JSON.parse(json); //toma el mensaje, el nivel y la fecha de creación del JSON

    // const log = new LogEntity(message, level); // Create a new instance of LogEntity
    const log = new LogEntity({ message, level, createdAt, origin }); // Create a new instance of LogEntity
    log.createdAt = new Date(createdAt); // Convert string to Date object
    return log;
  }
  //* Crea una instancia de LogEntity a partir de un docuemto mongo
  static fromObject(object: { [key: string]: any }): LogEntity {
    const { level, message, createdAt, origin } = object;
    const log = new LogEntity({
      level,
      message,
      createdAt,
      origin,
    });
    return log;
  }
}
