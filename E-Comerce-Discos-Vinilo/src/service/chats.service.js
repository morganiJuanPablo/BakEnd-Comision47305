//
import { mongoChatItem } from "../dao/index.js";

export class ChatsService {
  /////////////////////////////////////////////////////
  static async getChat() {
    const chat = await mongoChatItem.getChat();
    return chat;
  }

  /////////////////////////////////////////////////////
  static async updateChat(newMessage) {
    const newChat = await mongoChatItem.updateChat(newMessage);
    return newChat;
  }

  /////////////////////////////////////////////////////
  static async emptyChat() {
    const emptyCart = await mongoChatItem.deleteMany({});
    return emptyCart;
  }
}
