//
import fs from "fs";
import { logger } from "../../helpers/logger.js";

export class UsersManagerFs {
  constructor(path) {
    this.users = [];
    this.filePath = path;
  }

  ///////////////////////////////////////////////////////////////////

  fileExist() {
    return fs.existsSync(this.filePath);
  }

  ///////////////////////////////////////////////////////////////////

  async #getId() {
    try {
      let caracters = "AbCcDdEeFfGgHhIiJjKkLlMmOoPpQqRrSsTtUuVvWwZz0123456789";
      let newId = "";
      for (let i = 0; i < 12; i++) {
        let indicesAleatorios = Math.floor(Math.random() * 53);
        newId += caracters[indicesAleatorios];
      }
      return newId;
    } catch (error) {
      throw new Error("Error, intentelo nuevamente.", error);
    }
  }

  ///////////////////////////////////////////////////////////////////

  async #loadUsersFromFile() {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      return (this.users = JSON.parse(data));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  ///////////////////////////////////////////////////////////////////

  async #saveUsersToFile() {
    try {
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(this.users, null, 2),
        "utf-8"
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  ///////////////////////////////////////////////////////////////////

  async createUser(user) {
    try {
      user._id = await this.#getId();
      await this.#loadUsersFromFile();
      this.users.push(user);
      await this.#saveUsersToFile();
      return user;
    } catch (error) {
      logger.error(error.message);
      throw new Error("No se pudo crear el nuevo usuario");
    }
  }

  ///////////////////////////////////////////////////////////////////

  async getUser(email) {
    try {
      if (this.fileExist()) {
        await this.#loadUsersFromFile();
        const user = await this.users.find((u) => u.email === email);
        return user;
      }
    } catch (error) {
      logger.error(error.message);
      throw new Error(`El usuario solicitado no existe en nuestros registros`);
    }
  }

  ///////////////////////////////////////////////////////////////////

  async getProductById(productId) {
    try {
      await this.#loadUsersFromFile();
      const IdExist = this.products.find((p) => p.Id === productId);
      if (IdExist) {
        return IdExist;
      } else {
        throw new Error(`El producto con Id: ${productId} no existe`);
      }
    } catch (error) {
      logger.error(error.message);
      throw new Error("No se pudo obtener el producto.");
    }
  }

  ///////////////////////////////////////////////////////////////////

  async updateProductById(productId, productUpdated) {
    try {
      await this.#loadUsersFromFile();
      const idExist = this.products.find((p) => p.Id === productId);
      if (idExist) {
        const productChanged = {
          ...idExist,
          ...productUpdated,
          Id: productId.Id,
        };
        const newArray = this.products.filter((p) => p.Id !== productId);
        newArray.push(productChanged),
          await fs.promises.writeFile(
            this.filePath,
            JSON.stringify(newArray, null, 2),
            "utf-8"
          );
      } else {
        throw new Error(`El producto con Id: ${productId} no existe`);
      }
    } catch (error) {
      logger.error(error.message);
      throw new Error("No se pudo actualizar el producto.");
    }
  }

  ///////////////////////////////////////////////////////////////////

  async deleteProductById(productId) {
    try {
      const productIndex = this.products.findIndex((p) => p.Id === productId);
      if (productIndex !== -1) {
        await this.products.splice(productIndex, 1);
        await this.#saveUsersToFile();
      } else {
        logger.error("Error: Producto no encontrado");
      }
    } catch (error) {
      logger.error(error.message);
      throw new Error("No se pudo eliminar el producto.");
    }
  }
}
