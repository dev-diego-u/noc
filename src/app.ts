// import { envs } from "./config/plugins/env.plugins";
import { LogModel, mongoDatabase } from "./config/data/mongo";
import { envs } from "./config/plugins/env.plugins";
import { PrismaClient } from "./generated/prisma";
import { ServerApp } from "./presentation/server";

(() => {
  main();
})();

async function main(): Promise<void> {
  await mongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  ServerApp.start();
  // console.log(envs);
}

//mongo
//*guardar un log en mongo
// const newLog = await LogModel.create({
//   message: "test message desde mongo",
//   origin: "app.ts",
//   level: "low",
// });

// await newLog.save();
//*mongo
//*buscar todos los logs en mongo
// const logs = await LogModel.find();
// console.log(logs[1].message);

//* Crear un log básico usando Prisma
// const newLog = await prisma.logModel.create({
//   data: {
//     message: "Test message desde Prisma",
//     origin: "app.ts",
//     level: "HIGH",
//   },
// });
// console.log(newLog);

//*prisma
//*buscar logs usando prisma
// const logs = await prisma.logModel.findMany({
//   where: {
//     level: "LOW",
//   },
// });
// console.log(logs);

/*
  Better Comments types:
  !  - Highlight (important, warning)
  *  - Highlight (star, info)
  // - Normal comment
  ?  - Question
  TODO: - Task to do
  @param, @return, etc. - Documentation
*/
