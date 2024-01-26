//
export class ChatsRepository {
  constructor(dao) {
    this.dao = dao;
  }
  /////////////////////////////////////////////////////
  async getChat() {
    try {
      const chat = await this.dao.getChat();
      return chat;
    } catch (error) {
      logger.error(error.message);
    }
  }

  /////////////////////////////////////////////////////
  async updateChat(newMessage) {
    try {
      const newChat = await this.dao.updateChat(newMessage);
      return newChat;
    } catch (error) {
      logger.error(error.message);
    }
  }

  /////////////////////////////////////////////////////
  async emptyChat() {
    try {
      const emptyCart = await this.dao.deleteMany({});
      return emptyCart;
    } catch (error) {
      logger.error(error.message);
    }
  }
}
