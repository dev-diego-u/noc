import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

//interface CheckServiceUseCase ,define que método execute que recibe una url y retorna un booleano
interface CheckServiceMultiUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckServiceMulti implements CheckServiceMultiUseCase {
  constructor(
    private readonly logRepository: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  private async callLogs(log: LogEntity) {
    for (const repository of this.logRepository) {
      try {
        await repository.saveLog(log);
      } catch (err) {
        console.error("Error al guardar log en un repositorio:", err);
      }
    }
  }
  public async execute(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);
      // console.log(`${url} is ok`);

      if (!response.ok) {
        throw new Error(`Error on check service ${url}`);
      }
      // console.log(`${url} is ok`);

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: `${url} is ok`,
        origin: "CheckService",
      });
      await this.callLogs(log);
      // this.logRepositories.saveLog(log);
      this.successCallback && this.successCallback();
      return true;
    } catch (error) {
      // console.log(error);
      // console.error(`Check service failed for ${url}`);
      const errorMessage = `${url} is not ok: ${error}`;
      // console.error(errorMessage);
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: errorMessage,
        origin: "CheckService",
      });
      await this.callLogs(log);
      // this.logRepositories.saveLog(log);

      this.errorCallback && this.errorCallback(errorMessage);
      return false;
    }
  }
}
