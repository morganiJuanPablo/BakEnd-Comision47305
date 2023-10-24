//
import dotenv from "dotenv";
dotenv.config();

export const generalConfig = {
  server: {
    secretSession: process.env.SESSION_KEY,
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
};
