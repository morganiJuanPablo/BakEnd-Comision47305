//
import fs from "fs";

export class CartsManagerFs {
  constructor(path) {
    this.carts = [];
    this.filePath = path;
  }

  fileExist() {
    return fs.existsSync(this.filePath);
  }

  async getId() {
    try {
      let caracters = "AbCcDdEeFfGgHhIiJjKkLlMmOoPpQqRrSsTtUuVvWwZz0123456789";
      let newId = "";
      for (let i = 0; i < 6; i++) {
        let indicesAleatorios = Math.floor(Math.random() * 53);
        newId += caracters[indicesAleatorios];
      }
      return newId;
    } catch (error) {
      throw new Error("Error, intentelo nuevamente.", error);
    }
  }

  async loadCartsFromFile() {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      this.carts = JSON.parse(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async saveCartsToFile() {
    try {
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(this.carts, null, 2),
        "utf-8"
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createCart() {
    try {
      await this.loadCartsFromFile();
      const IdCart = await this.getId();
      const newCart = {
        IdCart: IdCart,
        products: [],
      };
      this.carts.push(newCart);
      await this.saveCartsToFile();
    } catch (error) {
      throw new Error("No se pudo crear el carrito.");
    }
  }

  async getCarts() {
    try {
      if (this.fileExist()) {
        await this.loadCartsFromFile();
        return this.carts;
      }
    } catch (error) {
      throw new Error("Error al obtener los carritos:", error.message);
    }
  }

  async getCartById(IdCart) {
    try {
      await this.loadCartsFromFile();
      const IdExist = this.carts.find((c) => c.IdCart === IdCart);
      if (IdExist) {
        return IdExist.products;
      } else {
        throw new Error(`El carrito con Id: ${IdCart} no existe`);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteCartById(IdCart) {
    try {
      await this.loadCartsFromFile();
      let newArray;
      const idExist = this.carts.some((c) => c.IdCart === IdCart);
      if (idExist) {
        newArray = this.carts.filter((c) => c.IdCart !== IdCart);
        await fs.promises.writeFile(
          this.filePath,
          JSON.stringify(newArray, null, 2),
          "utf-8"
        );
      } else {
        throw new Error(`El producto con Id: ${IdCart} no existe`);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addProductToCart(IdCart, IdProduct) {
    try {
      await this.loadCartsFromFile();
      const cart = this.carts.find((c) => c.IdCart === IdCart);

      let quantity = 1;

      const cartWithProducts = {
        Id: IdProduct,
        quantity: quantity,
      };

      if (cart) {
        const { products } = cart;
        const indexProduct = products.findIndex((iP) => iP.Id === IdProduct);
        const product = products[indexProduct];

        !product ? products.push(cartWithProducts) : product.quantity++;

        await this.saveCartsToFile();
      } else {
        throw new Error(`El carrito con id: ${IdCart} no existe`);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
