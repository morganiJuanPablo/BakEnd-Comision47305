//
import { usersDao } from "../dao/factory.js";
import { UsersDto } from "../dao/dto/users.dto.js";

export class SessionsService {
  /////////////////////////////////////////////////////
  static async getUser(username) {
    const user = await usersDao.getUser(username);
    return user;
  }
  /////////////////////////////////////////////////////
  static async createUser(newUser) {
    const newUserDto = new UsersDto(newUser);
    const user = await usersDao.createUser(newUserDto);
    return user;
  }
}
