//
import { productModel } from "./modelsDB/products.model.js";
import { logger } from "../../helpers/logger.js";

export class ProductsManagerMongo {
  constructor() {
    this.model = productModel;
  }

  ///////////////////////////////////////////////////////////////////

  async createProduct(product) {
    try {
      const newProduct = await this.model.create(product);
      return newProduct;
    } catch (error) {
      logger.error(error.message);
      throw new Error("No se pudo crear el producto.");
    }
  }

  ///////////////////////////////////////////////////////////////////

  async getProducts(category, options) {
    try {
      let products;
      if (category && options) {
        if (category) {
          products = await this.model.paginate({ category: category }, options);
        }
        if (category === "inicio") {
          products = await this.model.paginate({}, options);
        }
        return products;
      } else {
        products = await this.model.find();
        return products;
      }
    } catch (error) {
      logger.error(error.message);
      throw new Error("No se pudo obtener los productos.");
    }
  }

  ///////////////////////////////////////////////////////////////////

  async getProductById(productId) {
    try {
      const product = await this.model.find({ _id: productId }).lean();
      return product;
    } catch (error) {
      logger.error(error.message);
      throw new Error("No se pudo obtener el producto.");
    }
  }

  ///////////////////////////////////////////////////////////////////

  async getCategoryProducts(category) {
    try {
      const products = await this.model.find({ category: category }).lean();
      return products;
    } catch (error) {
      logger.error(error.message);
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
      logger.error(error.message);
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
      logger.error(error.message);
      throw new Error("No se pudo eliminar el producto.");
    }
  }
}
