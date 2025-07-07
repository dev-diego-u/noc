import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

//interface CheckServiceUseCase ,define que método execute que recibe una url y retorna un booleano
interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}
type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}
  public async execute(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error on check service ${url}`);
      }
      // console.log(`${url} is ok`);
      const log = new LogEntity(LogSeverityLevel.low, `${url} is ok`);
      this.logRepository.saveLog(log);
      this.successCallback && this.successCallback();
      return true;
    } catch (error) {
      // console.log(error);
      // console.error(`Check service failed for ${url}`);
      const errorMessage = `${url} is not ok: ${error}`;
      // console.error(errorMessage);
      const log = new LogEntity(LogSeverityLevel.high, errorMessage);
      this.logRepository.saveLog(log);

      this.errorCallback && this.errorCallback(errorMessage);
      return false;
    }
  }
}
