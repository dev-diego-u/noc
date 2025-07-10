import { LogDataSource } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import fs from "fs";

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath = "logs/";
  private readonly allLogsPath = "logs/logs-all.log";
  private readonly mediumLogsPath = "logs/logs-medium.log";
  private readonly highLogsPath = "logs/logs-high.log";

  constructor() {
    this.createLogsFiles(); //cuando se instancia la clase, se crean los archivos de logs
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath, { recursive: true });
    }

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (filePath) => {
        if (!fs.existsSync(filePath)) {
          fs.writeFileSync(filePath, ""); //flag lo que hace es
        }
      }
    );
  };

  async saveLog(newlog: LogEntity): Promise<void> {
    // throw new Error("Method not implemented.");
    const logAsJson = `${JSON.stringify(newlog)}\n`; //convierte el log a json y agrega un salto de línea al final
    fs.appendFileSync(this.allLogsPath, logAsJson);

    if (newlog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, `${logAsJson}`);
    }

    if (newlog.level === LogSeverityLevel.high) {
      fs.appendFileSync(this.highLogsPath, `${logAsJson}`);
    }
  }

  //metodo privado que lee el archivo de logs y devuelve un array de LogEntity
  private getLogsFromFile = (path: string): LogEntity[] => {
    const content = fs.readFileSync(path, "utf-8");
    const logs = content.split("\n").map((log) => LogEntity.fromJson(log)); // Convert each line to a LogEntity
    return logs;
  };

  // metodo que recibe un nivel de severidad y devuelve un array de LogEntity
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    // throw new Error("Method not implemented.");
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogsPath);
      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath);
      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogsPath);
      default:
        throw new Error("Invalid severity level");
    }
  }
}
