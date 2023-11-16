//
import { mongoProductsItem } from "../dao/index.js";

export class ProductsService {
  /////////////////////////////////////////////////////
  static async getProductById(productId) {
    const product = await mongoProductsItem.getProductById(productId);
    return product;
  }

  /////////////////////////////////////////////////////
  static async getProducts(category, options) {
    const products = await mongoProductsItem.getProducts(category, options);
    return products;
  }

  /////////////////////////////////////////////////////
  static async getProductsAdmin() {
    const products = await mongoProductsItem.getProductsAdmin();
    return products;
  }
  /////////////////////////////////////////////////////
  static async deleteProductById(idProduct) {
    await mongoProductsItem.deleteProductById(idProduct);
  }

  /////////////////////////////////////////////////////
  static async updateProductById(productId, productUpdated) {
    await mongoProductsItem.updateProductById(productId, productUpdated);
  }
}
