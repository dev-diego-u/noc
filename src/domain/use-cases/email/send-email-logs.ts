import { EmailService } from "../../../presentation/email/email-service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendsEmailLogs implements SendLogEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]) {
    try {
      const sent = await this.emailService.sendWithFileSystemLogs(to); //envia correo cond atos adjuntos
      if (!sent) {
        throw new Error("Error sending email");
      }

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: "Email sent successfully",
        origin: "send-email-logs.ts",
      });
      await this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: `${error}`,
        origin: "send-email-logs.ts",
      });
      await this.logRepository.saveLog(log);
      return false;
    }
  }
}
