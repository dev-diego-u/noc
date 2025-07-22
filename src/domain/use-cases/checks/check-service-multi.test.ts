import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMulti } from "./check-service-multi";

describe("check-service.ts", () => {
  const logRepository1 = {
    saveLog: jest.fn(),
    getLogs: jest.fn().mockReturnValue([]), //return an empty array
  };

  const logRepository2 = {
    saveLog: jest.fn(),
    getLogs: jest.fn().mockReturnValue([]), //return an empty array
  };
  const logRepositories = [logRepository1, logRepository2];
  const successCallback = jest.fn();
  const errorCallback = jest.fn();

  const checkServiceMulti = new CheckServiceMulti(
    logRepositories,
    successCallback,
    errorCallback
  );

  //*clearAllMocks is used to clear the mock calls and instances before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call successCallback when fetch returns true", async () => {
    const wasOk = await checkServiceMulti.execute("https://google.com");
    expect(wasOk).toBe(true);
    expect(logRepository1.saveLog).toHaveBeenCalled();
    expect(logRepository2.saveLog).toHaveBeenCalled();
    expect(successCallback).toHaveBeenCalled();
    expect(errorCallback).not.toHaveBeenCalled();
    expect(logRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(logRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });

  test("should call errorCallback when fetch returns false", async () => {
    const wasOk = await checkServiceMulti.execute(
      "https://goccccccczssogle.com"
    );
    expect(wasOk).toBe(false);
    expect(logRepository1.saveLog).toHaveBeenCalled();
    expect(logRepository2.saveLog).toHaveBeenCalled();
    expect(successCallback).not.toHaveBeenCalled();
    expect(errorCallback).toHaveBeenCalled();
    expect(logRepository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    expect(logRepository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
  });
});
