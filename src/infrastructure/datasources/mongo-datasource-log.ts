import { LogModel } from "../../config/data/mongo";
import { LogDataSource } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoDatasource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    // throw new Error("Method not implemented.");
    const newLog = await LogModel.create(log);
    console.log("log created in mongo", newLog.id);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    // throw new Error("Method not implemented.");
    const logs = await LogModel.find({
      level: severityLevel,
    });

    return logs.map((mongoLog) => LogEntity.fromObject(mongoLog));
  }
}
