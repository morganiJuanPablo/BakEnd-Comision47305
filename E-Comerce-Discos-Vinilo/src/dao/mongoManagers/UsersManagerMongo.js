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
      const user = await this.userModel.findOne({ email: userEmail }).lean();
      return user;
    } catch (error) {
      logger.error(error.message);
      throw new Error(`El usuario solicitado no existe en nuestros registros`);
    }
  }

  ///////////////////////////////////////////////////////////////////

  async getUserById(userId) {
    try {
      const user = await this.userModel.findById(userId).lean();
      return user;
    } catch (error) {
      logger.error(error.message);
      throw new Error(`El usuario solicitado no existe en nuestros registros`);
    }
  }
  ///////////////////////////////////////////////////////////////////

  async updateUser(id, user) {
    try {
      const userUpdated = await this.userModel.findOneAndUpdate(id, user);
      return userUpdated;
    } catch (error) {
      logger.error(error.message);
      throw new Error(`El usuario solicitado no existe en nuestros registros`);
    }
  }
}
