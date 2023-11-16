//
import { mongoUserItem } from "../dao/index.js";

export class SessionsService {
  /////////////////////////////////////////////////////
  static async getUser(username) {
    const user = await mongoUserItem.getUser(username);
    return user;
  }
  /////////////////////////////////////////////////////
  static async createUser(newUser) {
    const user = await mongoUserItem.createUser(newUser);
    return user;
  }
}
