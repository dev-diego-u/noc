import { envs } from "./envs.plugin";

describe("envs.plugins.ts", () => {
  test("should return environment options", () => {
    // console.log(envs);

    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: "gmail",
      MAILER_EMAIL: "dev.diego.ur@gmail.com",
      MAILER_SECRET_KEY: "ezryzrvmtkwwjrap",
      PROD: false,
      MONGO_URL: "mongodb://diego:123456@localhost:27018/",
      MONGO_DB_NAME: "noc-test",
      MONGO_USER: "diego",
      MONGO_PASS: "123456",
    });
  });

  test("should return error if not found env", async () => {
    jest.resetModules();
    process.env.PORT = "ABC";

    try {
      await import("./envs.plugin");
      expect(true).toBe(false); // Si no lanza error, falla la prueba
    } catch (error) {
      // console.log("Mensaje de error:", error);
      // Puedes seguir usando tu expect si quieres
      expect(`${error}`).toMatch(/\bPORT\b/i);
    }
  });
});
