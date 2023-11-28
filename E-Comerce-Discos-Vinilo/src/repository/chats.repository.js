//
export class ChatsRepository {
  constructor(dao) {
    this.dao = dao;
  }
  /////////////////////////////////////////////////////
  async getChat() {
    const chat = await this.dao.getChat();
    return chat;
  }

  /////////////////////////////////////////////////////
  async updateChat(newMessage) {
    const newChat = await this.dao.updateChat(newMessage);
    return newChat;
  }

  /////////////////////////////////////////////////////
  async emptyChat() {
    const emptyCart = await this.dao.deleteMany({});
    return emptyCart;
  }
}
