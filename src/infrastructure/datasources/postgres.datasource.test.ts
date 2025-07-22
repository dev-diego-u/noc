import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PostgresDatasource } from "./postgres.datasource";
import { PrismaClient, SeverityLevel } from "../../generated/prisma";
describe("postgres.datasource.ts", () => {
  const postgresDatasource = new PostgresDatasource(); // Instancia de la clase que se va a probar
  const logSpy = jest.spyOn(console, "log");
  const log = new LogEntity({
    message: "Test log message",
    level: LogSeverityLevel.low,
    origin: "test-origin",
    createdAt: new Date(),
  });

  // Configurar PrismaClient para usar una base de datos de prueba
  const prisma = new PrismaClient();

  //limpiar mock
  beforeEach(async () => {
    logSpy.mockClear();
    await prisma.logModel.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
  test("should save log in postgres", async () => {
    await postgresDatasource.saveLog(log);
    // Ahora consulta la base de datos para verificar que el log existe
    const logs = await postgresDatasource.getLogs(LogSeverityLevel.low);
    expect(logs).toHaveLength(1);
    expect(logs[0]).toEqual(
      expect.objectContaining({
        message: "Test log message",
        level: SeverityLevel.LOW,
        origin: "test-origin",
      })
    );
  });
});
