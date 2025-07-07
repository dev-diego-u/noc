import { envs } from "./config/plugins/env.plugins";
import { ServerApp } from "./presentation/server";

(() => {
  main();
})();

function main(): void {
  // ServerApp.start();
  console.log(envs.PORT);
}
