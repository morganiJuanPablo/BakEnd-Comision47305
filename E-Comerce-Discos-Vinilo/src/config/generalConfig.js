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
    urlProduction: process.env.MONGO_URL_PRODUCTION,
    urlDevTest: process.env.MONGO_URL_DEV_TEST,
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
  gmail: {
    account: process.env.GMAIL_ACCOUNT,
    password: process.env.GMAIL_PASS,
    tokenPass: process.env.GMAIL_TOKEN_PASS
  },
  tokenJWT: {
    tokenJWTkey: process.env.PRIVATE_KEY_TOKENS,
  },
  environment: {
    persistence: persistenceMode,
  },
  managers: {
    domainManagers: process.env.DOMAIN_EMAIL_MANAGERS,
  },
};
