//
import { cartsDao } from "../dao/factory.js";

export class CartsService {
  /////////////////////////////////////////////////////
  static async getCartById(cartId) {
    const cart = await cartsDao.getCartById(cartId);
    return cart;
  }
  /////////////////////////////////////////////////////
  static async addProduct(cartId, productId) {
    const newCart = await cartsDao.addProduct(cartId, productId);
    return newCart;
  }
  /////////////////////////////////////////////////////
  static async deleteProduct(cartId, productId) {
    const cart = await cartsDao.newCartWithoutProduct(cartId, productId);
    return cart;
  }
  /////////////////////////////////////////////////////
  static async deleteAllProducts(cartId) {
    const cart = await cartsDao.deleteAllProducts(cartId);
    return cart;
  }
}
