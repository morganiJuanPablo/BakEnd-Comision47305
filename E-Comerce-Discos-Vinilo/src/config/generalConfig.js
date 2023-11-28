//
import { Command } from "commander";
import dotenv from "dotenv";

dotenv.config();
const program = new Command();

program.option("--mode <mode>", "Entorno de desarrollo", "development");
program.option("--port <port>", "Puerto de ejecución", "3000");
program.parse();

const persistenceMode = program.opts().mode;
const port = program.opts().port;

export const generalConfig = {
  server: {
    port,
  },
  mongo: {
    url: process.env.MONGO_URL,
  },
  github: {
    callbackUrl: process.env.GITHUB_CALLBACK_URL,
    clientId: process.env.GITHUB_CLIENT_ID,
    clientKey: process.env.GITHUB_CLIENT_KEY,
  },
  google: {
    callbackUrl: process.env.GOOGLE_CALLBACK_URL,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientKey: process.env.GOOGLE_CLIENT_KEY,
  },
  tokenJWT: {
    tokenJWTkey: process.env.PRIVATE_KEY_TOKENS,
  },
  environment: {
    persistence: persistenceMode,
  },
};
