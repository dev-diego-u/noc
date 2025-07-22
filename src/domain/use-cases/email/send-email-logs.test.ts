import { EmailService } from "../../../presentation/email/email-service";
import { LogEntity } from "../../entities/log.entity";
import { SendsEmailLogs } from "./send-email-logs";

describe("send-email-logs.ts", () => {
  const emailService = {
    sendWithFileSystemLogs: jest.fn().mockResolvedValue(true), // o false para simular error
  } as unknown as EmailService;
  const logRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn().mockReturnValue([]), //
  };
  const sendsEmailLogs = new SendsEmailLogs(emailService, logRepository);

  beforeEach(() => {
    jest.clearAllMocks(); // Limpiar mocks antes de cada prueba
  });

  test("should call sendMail and saveLog ", async () => {
    const result = await sendsEmailLogs.execute("diegoubillaramos@gmail.com");
    expect(result).toBe(true);
    expect(emailService.sendWithFileSystemLogs).toHaveBeenCalled();
    expect(logRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

  test("should return false if emailService.sendWithFileSystemLogs fails", async () => {
    emailService.sendWithFileSystemLogs = jest.fn().mockResolvedValue(false);
    const result = await sendsEmailLogs.execute("diegoubillaramos@gmail.com");
    expect(result).toBe(false);
    expect(emailService.sendWithFileSystemLogs).toHaveBeenCalled(); //verigificar que se ha llamado
    // verificar que se ha llamado 1 vez
    expect(emailService.sendWithFileSystemLogs).toHaveBeenCalledTimes(1);

    expect(logRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});
