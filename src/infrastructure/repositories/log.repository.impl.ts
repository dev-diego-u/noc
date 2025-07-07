import { LogDataSource } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository {
  constructor(private readonly logDataSource: LogDataSource) {}

  saveLog(log: LogEntity): Promise<void> {
    // throw new Error("Method not implemented.");
    return this.logDataSource.saveLog(log); // guarda el log en el datasource
  }
  getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    // throw new Error("Method not implemented.");
    return this.logDataSource.getLogs(severityLevel); // devuelve un array de LogEntity
  }
}
