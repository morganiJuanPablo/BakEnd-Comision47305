//
export class SessionsRepository {
  constructor(dao) {
    this.dao = dao;
  }
  /////////////////////////////////////////////////////
  async getUsers() {
    try {
      const users = await this.dao.getUsers();
      return users;
    } catch (error) {
      logger.error(error.message);
    }
  }
  /////////////////////////////////////////////////////
  async getUser(username) {
    try {
      const user = await this.dao.getUser(username);
      return user;
    } catch (error) {
      logger.error(error.message);
    }
  }
  /////////////////////////////////////////////////////
  async getUserById(userId) {
    try {
      const user = await this.dao.getUserById(userId);
      return user;
    } catch (error) {
      logger.error(error.message);
    }
  }
  /////////////////////////////////////////////////////
  async createUser(newUser) {
    try {
      const user = await this.dao.createUser(newUser);
      return user;
    } catch (error) {
      logger.error(error.message);
    }
  }
  /////////////////////////////////////////////////////
  async updateUser(id, user) {
    try {
      const userUpdated = await this.dao.updateUser(id, user);
      return userUpdated;
    } catch (error) {
      logger.error(error.message);
    }
  }
}
