//
import { mongoUserItem } from "../dao/index.js";
import { UsersDto } from "../dao/dto/users.dto.js";

export class SessionsService {
  /////////////////////////////////////////////////////
  static async getUser(username) {
    const user = await mongoUserItem.getUser(username);
    return user;
  }
  /////////////////////////////////////////////////////
  static async createUser(newUser) {
    /* const newUser = req.body; */
    const newUserDto = new UsersDto(newUser);
    const user = await mongoUserItem.createUser(newUserDto);
    return user;
  }
}
