//
import { mongoProductsItem } from "../dao/index.js";


export class ProductsService {
  /////////////////////////////////////////////////////
  static async getProductById_service(productId) {
    const product = await mongoProductsItem.getProductById(productId);
    return product;
  }
}
