//
import fs from "fs";

export class ProductsManagerFs {
  constructor(path) {
    this.products = [];
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

  async loadProductsFromFile() {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      return (this.products = JSON.parse(data));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async saveProductsToFile() {
    try {
      await fs.promises.writeFile(
        this.filePath,
        JSON.stringify(this.products, null, 2),
        "utf-8"
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addProduct(product) {
    try {
      await this.loadProductsFromFile();
      const { title, description, price, code, stock, /* status, */ category } =
        product;
      if (
        !title ||
        !description ||
        !price ||
        !code ||
        !stock ||
        /* !status || */
        !category
      ) {
        throw new Error("Todos los campos son obligatorios.");
      } else {
        const Id = await this.getId();
        product.Id = Id;
        const codeExist = this.products.find((elem) => elem.code === code);
        if (codeExist) {
          throw new Error("Producto con ese código ya existe.");
        } else {
          this.products.push(product);
          await this.saveProductsToFile();
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProducts() {
    try {
      if (this.fileExist()) {
        await this.loadProductsFromFile();
      }
      return this.products;
    } catch (error) {
      throw new Error("Error al obtener los productos:", error.message);
    }
  }

  async getProductById(Id) {
    try {
      await this.loadProductsFromFile();
      const IdExist = this.products.find((p) => p.Id === Id);
      if (IdExist) {
        return IdExist;
      } else {
        throw new Error(`El producto con Id: ${Id} no existe`);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProductById(Id) {
    try {
      const productIndex = this.products.findIndex((p) => p.Id === Id);
      if (productIndex !== -1) {
        await this.products.splice(productIndex, 1);
        await this.saveProductsToFile();
      } else {
        console.log("Error: Producto no encontrado");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProduct(Id, productChanged) {
    try {
      await this.loadProductsFromFile();
      const productId = this.products.find((p) => p.Id === Id);
      if (productId) {
        const productUpdated = {
          ...productId,
          ...productChanged,
          Id: productId.Id,
        };
        const newArray = this.products.filter((p) => p.Id !== Id);
        newArray.push(productUpdated),
          await fs.promises.writeFile(
            this.filePath,
            JSON.stringify(newArray, null, 2),
            "utf-8"
          );
      } else {
        throw new Error(`El producto con Id: ${Id} no existe`);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
