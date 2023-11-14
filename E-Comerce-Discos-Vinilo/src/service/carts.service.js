//
import { mongoCartItem } from "../dao/index.js";

export class CartsService {
  /////////////////////////////////////////////////////
  static async getCartById_service(cartId) {
    const cart = await mongoCartItem.getCartById(cartId);
    return cart;
  }
  /////////////////////////////////////////////////////
  static async addProduct_service(cartId, productId) {
    const newCart = await mongoCartItem.addProduct(cartId, productId);
    return newCart;
  }
  /////////////////////////////////////////////////////
  static async deleteProduct_service(cartId, productId) {
    const cart = await mongoCartItem.newCartWithoutProduct(cartId, productId);
    return cart;
  }
  /////////////////////////////////////////////////////
  static async deleteAllProducts_service(cartId) {
    const cart = await mongoCartItem.deleteAllProducts(cartId);
    return cart;
  }
}
