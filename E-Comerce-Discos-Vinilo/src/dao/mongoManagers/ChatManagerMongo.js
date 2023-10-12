//
import { chatModel } from "./modelsDB/chat.model.js";

export class ChatManagerMongo {
  constructor() {
    this.chatModel = chatModel;
  }

  ///////////////////////////////////////////////////////////////////

  async createChat() {
    try {
      const chat = await this.chatModel.create();
      return chat;
    } catch (error) {
      console.log(error.message);
      throw new Error("No se pudo crear el chat.");
    }
  }

  ///////////////////////////////////////////////////////////////////

  async getChat() {
    try {
      const chat = await chatModel.find().lean();
      return chat;
    } catch (error) {
      console.log(error.message);
      throw new Error("No se pudo obtener el chat.");
    }
  }

  ///////////////////////////////////////////////////////////////////

  async updateChat(newMessage) {
    try {
      const result = await this.chatModel.create(newMessage);
      return result;
    } catch (error) {
      console.log(error.message);
      throw new Error("No se pudo cargar el nuevo mensaje.");
    }
  }

  ///////////////////////////////////////////////////////////////////

  async emptyChat() {
    try {
      const emptyCart = await this.chatModel.deleteMany({});
      return emptyCart;
    } catch (error) {
      console.log(error.message);
      throw new Error("No se pudo vaciar el chat.");
    }
  }
}
