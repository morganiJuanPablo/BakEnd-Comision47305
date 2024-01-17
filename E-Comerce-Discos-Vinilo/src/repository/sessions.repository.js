//
export class SessionsRepository {
  constructor(dao) {
    this.dao = dao;
  }
  /////////////////////////////////////////////////////
  async getUsers() {
    const users = await this.dao.getUsers();
    return users;
  }
  /////////////////////////////////////////////////////
  async getUser(username) {
    const user = await this.dao.getUser(username);
    return user;
  }
  /////////////////////////////////////////////////////
  async getUserById(userId) {
    const user = await this.dao.getUserById(userId);
    return user;
  }
  /////////////////////////////////////////////////////
  async createUser(newUser) {
    const user = await this.dao.createUser(newUser);
    return user;
  }
  /////////////////////////////////////////////////////
  async updateUser(id, user) {
    const userUpdated = await this.dao.updateUser(id, user);
    return userUpdated;
  }
}
