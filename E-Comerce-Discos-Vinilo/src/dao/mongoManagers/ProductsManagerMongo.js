import { productModel } from "./modelsDB/products.model.js";

export class ProductsManagerMongo {
  constructor() {
    this.model = productModel;
  }

  ///////////////////////////////////////////////////////////////////

  async addProduct(product) {
    try {
      const newProduct = await this.model.create(product);
      return newProduct;
    } catch (error) {
      console.log(error.message);
      throw new Error("No se pudo crear el producto.");
    }
  }

  ///////////////////////////////////////////////////////////////////

  async getProducts(category, options) {
    try {
      let products;
      if (category) {
        products = await this.model.paginate({ category: category }, options);
      }
      if (category === "inicio") {
        products = await this.model.paginate({}, options);
      }
      return products;
    } catch (error) {
      console.log(error.message);
      throw new Error("No se pudo obtener los productos.");
    }
  }

  ///////////////////////////////////////////////////////////////////

  async getProductById(productId) {
    try {
      const product = await this.model.find({ _id: productId }).lean();
      return product;
    } catch (error) {
      console.log(error.message);
      throw new Error("No se pudo obtener el producto.");
    }
  }

  ///////////////////////////////////////////////////////////////////

  async getCategoryProducts(category) {
    try {
      const products = await this.model.find({ category: category }).lean();
      return products;
    } catch (error) {
      console.log(error.message);
      throw new Error("No se pudo obtener los productos.");
    }
  }

  ///////////////////////////////////////////////////////////////////

  async updateProductById(productId, productUpdated) {
    try {
      const product = await this.model.updateOne(
        {
          _id: productId,
        },
        productUpdated,
        { new: true }
      );
      if (!product) {
        throw new Error(`El producto con Id: ${productId} no existe.`);
      }
      return product;
    } catch (error) {
      console.log(error.message);
      throw new Error("No se pudo actualizar el producto.");
    }
  }

  ///////////////////////////////////////////////////////////////////

  async deleteProductById(productId) {
    try {
      const product = await this.model.findByIdAndDelete(productId);
      if (!product) {
        throw new Error(`El producto con Id: ${productId} no existe.`);
      }
      return product;
    } catch (error) {
      console.log(error.message);
      throw new Error("No se pudo eliminar el producto.");
    }
  }
}
