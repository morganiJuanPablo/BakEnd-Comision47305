//
import { v4 as uuidv4 } from "uuid";
import { logger } from "../helpers/logger.js";

export class CartsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  /////////////////////////////////////////////////////
  async createCart() {
    try {
      const cart = await this.dao.createCart();
      return cart;
    } catch (error) {
      logger.error(error.message);
    }
  }

  /////////////////////////////////////////////////////
  async getCarts() {
    try {
      const carts = await this.dao.getCarts();
      return carts;
    } catch (error) {
      logger.error(error.message);
    }
  }

  /////////////////////////////////////////////////////
  async getProductsOk(cartId) {
    try {
      const cart = await this.dao.getCartById(cartId);
      if (cart.products.length) {
        let productsOk = [];
        for (let i = 0; i < cart.products.length; i++) {
          let product = cart.products[i];
          product.productId.stock >= product.quantity &&
            productsOk.push(product);
        }
        for (let i = 0; i < productsOk.length; i++) {
          let product = productsOk[i];
          let subtotal = product.quantity * product.productId.price;
          product.subtotal = subtotal;
        }
        let totalPrice = productsOk.reduce((acc, elem) => {
          return (acc += elem.subtotal);
        }, 0);
        productsOk.totalPrice = totalPrice;
        let code = uuidv4();
        const newTicket = {
          code,
          purchase_date: new Date(),
          amount: productsOk.totalPrice,
        };
        productsOk.ticket = newTicket;
        return productsOk;
      } else {
        return [];
      }
    } catch (error) {
      logger.error(error.message);
    }
  }

  /////////////////////////////////////////////////////
  async getProductsRejected(cartId) {
    try {
      const cart = await this.dao.getCartById(cartId);
      if (cart.products.length) {
        let productsRejected = [];
        for (let i = 0; i < cart.products.length; i++) {
          let product = cart.products[i];
          product.productId.stock < product.quantity &&
            productsRejected.push(product);
        }
        return productsRejected;
      } else {
        return [];
      }
    } catch (error) {
      logger.error(error.message);
    }
  }

  /////////////////////////////////////////////////////
  async updateCart(cartId, newCart) {
    try {
      const cart = await this.dao.getCartById(cartId);
      if (cart) {
        const cartUpdated = await this.dao.updateCart(cartId, newCart);
        return cartUpdated;
      } else {
        return cart;
      }
    } catch (error) {
      logger.error(error.message);
    }
  }

  /////////////////////////////////////////////////////
  async getCartById(cartId) {
    try {
      const cart = await this.dao.getCartById(cartId);
      for (let i = 0; i < cart.products.length; i++) {
        let product = cart.products[i];
        let subtotal = product.quantity * product.productId.price;
        product.subtotal = subtotal;
      }
      let totalPrice = cart.products.reduce((acc, elem) => {
        return (acc += elem.subtotal);
      }, 0);
      cart.totalPrice = totalPrice.toFixed(2);
      return cart;
    } catch (error) {
      logger.error(error.message);
    }
  }

  /////////////////////////////////////////////////////
  async addProduct(cartId, productId, quantity) {
    try {
      const newCart = await this.dao.addProduct(cartId, productId, quantity);
      return newCart;
    } catch (error) {
      logger.error(error.message);
    }
  }

  /////////////////////////////////////////////////////
  async deleteProduct(cartId, productId) {
    try {
      const cart = await this.dao.newCartWithoutProduct(cartId, productId);
      return cart;
    } catch (error) {
      logger.error(error.message);
    }
  }

  /////////////////////////////////////////////////////
  async deleteAllProducts(cartId) {
    try {
      const cart = await this.dao.deleteAllProducts(cartId);
      return cart;
    } catch (error) {
      logger.error(error.message);
    }
  }
}
