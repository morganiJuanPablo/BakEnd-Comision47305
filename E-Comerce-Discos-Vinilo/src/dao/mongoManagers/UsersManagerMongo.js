//
import { userModel } from "./modelsDB/users.model.js";
import { logger } from "../../helpers/logger.js";

export class UsersManagerMongo {
  constructor() {
    this.userModel = userModel;
  }

  ///////////////////////////////////////////////////////////////////

  async createUser(newUserInfo) {
    try {
      const newUser = await this.userModel.create(newUserInfo);
      return newUser;
    } catch (error) {
      logger.error(error.message);
      throw new Error("No se pudo crear el nuevo usuario");
    }
  }

  ///////////////////////////////////////////////////////////////////

  async getUser(userEmail) {
    try {
      const user = await this.userModel.findOne({ email: userEmail });
      return user;
    } catch (error) {
      logger.error(error.message);
      throw new Error(`El usuario solicitado no existe en nuestros registros`);
    }
  }

  ///////////////////////////////////////////////////////////////////

  async getUserById(userId) {
    try {
      const user = await this.userModel.findById(userId);
      return user;
    } catch (error) {
      logger.error(error.message);
      throw new Error(`El usuario solicitado no existe en nuestros registros`);
    }
  }
}
