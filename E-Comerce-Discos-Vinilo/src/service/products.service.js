//
import { productsDao } from "../dao/factory.js";

export class ProductsService {
  /////////////////////////////////////////////////////
  static async getProductById(productId) {
    const product = await productsDao.getProductById(productId);
    return product;
  }

  /////////////////////////////////////////////////////
  static async getProducts(category, options) {
    const products = await productsDao.getProducts(category, options);
    return products;
  }

  /////////////////////////////////////////////////////
  static async deleteProductById(idProduct) {
    await productsDao.deleteProductById(idProduct);
  }

  /////////////////////////////////////////////////////
  static async updateProductById(productId, productUpdated) {
    await productsDao.updateProductById(productId, productUpdated);
  }
}
