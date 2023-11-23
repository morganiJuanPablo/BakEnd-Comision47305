//
/* import path from "path";
import dotenv from "dotenv";
import { Command } from "commander";
import { __dirname } from "../utils.js";


const program = new Command();

program.option("--mode <modo>", "Modo de entorno de trabajo", "development");
program.parse();

const applicationArgs = program.opts();
const applicationEnv = applicationArgs.mode;

const pathEnv =
  applicationEnv === "production"
    ? path.join(__dirname,"../.env.production")
    : path.join(__dirname,"../.env.development");

dotenv.config({
  path: pathEnv,
}); */
//
import dotenv from "dotenv";
dotenv.config();

export const generalConfig = {
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
};
console.log(generalConfig);
