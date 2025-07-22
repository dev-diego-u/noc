import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";

describe("check-service.ts", () => {
  const logRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn().mockReturnValue([]), //
  };
  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkService = new CheckService(
    logRepository,
    successCallback,
    errorCallback
  );

  //*clearAllMocks is used to clear the mock calls and instances before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call successCallback when fetch returns true", async () => {
    const wasOk = await checkService.execute("https://google.com");
    expect(wasOk).toBe(true);
    expect(logRepository.saveLog).toHaveBeenCalled();
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
    expect(logRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

  test("should call errorCallback when fetch returns false", async () => {
    const wasOk = await checkService.execute("https://goccccccczssogle.com");
    expect(wasOk).toBe(false);
    expect(logRepository.saveLog).toHaveBeenCalled();
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();
    expect(logRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});
