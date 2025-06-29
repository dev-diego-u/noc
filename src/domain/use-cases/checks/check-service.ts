//interface CheckServiceUseCase ,define que método execute que recibe una url y retorna un booleano
interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}
type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
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
      this.successCallback();
      return true;
    } catch (error) {
      console.error(`Check service failed for ${url}`);
      this.errorCallback(`Error: ${error} `);
      return false;
    }
  }
}
