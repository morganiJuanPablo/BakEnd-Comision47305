//
import { CreateUsersDto, GetUsersDto } from "../dao/dto/users.dto.js";

export class SessionsRepository {
  constructor(dao) {
    this.dao = dao;
  }
  /////////////////////////////////////////////////////
  async getUser(username) {
    const user = await this.dao.getUser(username);
    const userDto = new GetUsersDto(user)   
    return userDto;
  }
  /////////////////////////////////////////////////////
  async createUser(newUser) {
    const user = await this.dao.createUser(newUser);
    const userDto = new CreateUsersDto(user)
    return userDto; 
  }
}
