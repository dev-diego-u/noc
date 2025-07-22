const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  setupFiles: ["<rootDir>/setupTest.ts"], //esto lo que hace es cargar el archivo setupTest.ts antes de correr los tests
  coveragePathIgnorePatterns: ["<rootDir>/src/generated/prisma/"],
  roots: ["<rootDir>/src"], //define la carpeta raíz donde se encuentran los tests
};
