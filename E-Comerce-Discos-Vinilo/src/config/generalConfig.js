//
/* import path from "path"; */
import dotenv from "dotenv";
/* import { __dirname } from "../utils.js"; */

/* const pathEnv = path.join(__dirname,"../.env")
 */
dotenv.config(/* {
  path: pathEnv,
} */);
export const generalConfig = {
  server: {
    port: process.env.PORT,
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
    envWork: process.env.NODE_ENV,
  },
};
