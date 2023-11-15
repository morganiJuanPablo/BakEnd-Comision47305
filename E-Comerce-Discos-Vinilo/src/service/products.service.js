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
}
