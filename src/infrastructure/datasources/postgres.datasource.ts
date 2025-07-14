import { LogDataSource } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from "../../generated/prisma";

const prisma = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};
export class PostgresDatasource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    // throw new Error("Method not implemented.");
    const { message, level, origin, createdAt } = log;

    const newLog = await prisma.logModel.create({
      data: {
        message: message,
        origin: origin,
        level: severityEnum[level],
      },
    });
    console.log("log crated in postgres", newLog.id);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    // throw new Error("Method not implemented.");
    const logs = await prisma.logModel.findMany({
      where: {
        level: severityEnum[severityLevel],
      },
    });
    return logs.map((log) => LogEntity.fromObject(log));
  }
}
