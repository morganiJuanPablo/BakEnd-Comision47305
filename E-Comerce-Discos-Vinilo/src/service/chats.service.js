//
import { chatsDao } from "../dao/factory.js";

export class ChatsService {
  /////////////////////////////////////////////////////
  static async getChat() {
    const chat = await chatsDao.getChat();
    return chat;
  }

  /////////////////////////////////////////////////////
  static async updateChat(newMessage) {
    const newChat = await chatsDao.updateChat(newMessage);
    return newChat;
  }

  /////////////////////////////////////////////////////
  static async emptyChat() {
    const emptyCart = await chatsDao.deleteMany({});
    return emptyCart;
  }
}
