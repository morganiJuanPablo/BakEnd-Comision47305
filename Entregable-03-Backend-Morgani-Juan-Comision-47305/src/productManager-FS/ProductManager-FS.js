//
import fs from "fs"

export class ProductManagerFs{
  constructor(path) {
    this.products = [];
    this.filePath = path;
  }

  fileExist() {
    return fs.existsSync(this.filePath);
  }

  async loadProductsFromFile() {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      this.products = JSON.parse(data);
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  }

  async saveProductsToFile() {
    await fs.promises.writeFile(
      this.filePath,
      JSON.stringify(this.products, null, 2),
      "utf-8"
    );
  }

  async addProduct(product) {
    try {
      await this.loadProductsFromFile();
      const { title, description, price, code, thumbnail, stock } = product;
      if (!title || !description || !price || !code || !thumbnail || !stock) {
        console.log("Error: Todos los campos son obligatorios");
      } else {
        let newId;
        if (this.products.length === 0) {
          newId = 1;
        } else {
          newId = this.products[this.products.length - 1].Id + 1;
        }
        product.Id = newId;
        const codeExist = this.products.find((elem) => elem.code === code);
        if (codeExist) {
          return console.log("El producto con el código ingresado ya existe");
        } else {
          this.products.push(product);
          await this.saveProductsToFile();
          console.log("Añadido exitosamente");
        }
      }
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  }

  async getProducts() {
    try {
      if (this.fileExist()) {
        await this.loadProductsFromFile();
        return this.products;       
      } else {
        console.log(this.products);
      }
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  }

  async getProductById(Id) {
    try {
      await this.loadProductsFromFile();
      const IdExist = this.products.find((elem) => elem.Id === Id);
      if (IdExist) {
        console.log(`El producto según el Id indicado es: 
        ${JSON.stringify(IdExist, null, 2)}`);
      } else {
        console.log(`El producto con Id: ${Id} no existe`);
      }
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  }

  async deleteProductById(Id) {
    try {
      await this.loadProductsFromFile();
      let newArray;
      const idExist = this.products.some((elem) => elem.Id === Id);
      if (idExist) {
        newArray = this.products.filter((elem) => elem.Id !== Id);
        console.log(`El producto con Id: ${Id} ha sido eliminado`);
        await fs.promises.writeFile(
          this.filePath,
          JSON.stringify(newArray, null, 2),
          "utf-8"
        );
      } else {
        console.log(`El producto con Id: ${Id} no existe`);
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  }

  async updateProduct(Id, productoChanged) {
    try {
      await this.loadProductsFromFile();
      const productId = this.products.find((elem) => elem.Id === Id);
      if (productId) {
        const productUpdated = {
          ...productId,
          ...productoChanged,
          Id: productId.Id,
        };
        const arrayWithoutProduct = this.products.filter(
          (elem) => elem.Id !== Id
        );
        arrayWithoutProduct.push(productUpdated),
          await fs.promises.writeFile(
            this.filePath,
            JSON.stringify(arrayWithoutProduct, null, 2),
            "utf-8"
          );
        console.log("Producto actualizado con éxito.");
      } else {
        console.log("El producto ingresado no existe.");
      }
    } catch (error) {
      console.log("No se pudo actualizar el producto.");
    }
  }
}


