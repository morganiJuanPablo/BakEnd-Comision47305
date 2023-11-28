//
import { v4 as uuidv4 } from "uuid";

export class CartsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  /////////////////////////////////////////////////////
  async getProductsOk(cartId) {
    const cart = await this.dao.getCartById(cartId);
    if (cart.products.length) {
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

        productsOk.totalPrice = totalPrice /* .toFixed(2) */;

        const newTicket = {
          code: uuidv4(),
          purchase_date: new Date(),
          amount: productsOk.totalPrice,
        };
        productsOk.ticket = newTicket;
        return productsOk;
      } else {
        res.json({ status: "error", message: "El carrito está vacío." });
      }
    }
  }

  /////////////////////////////////////////////////////
  async getProductsRejected(cartId) {
    const cart = await this.dao.getCartById(cartId);
    if (cart.products.length) {
      if (cart.products.length) {
        let productsRejected = [];
        for (let i = 0; i < cart.products.length; i++) {
          let product = cart.products[i];
          product.productId.stock < product.quantity &&
            productsRejected.push(product);
        }
  /*       for (let i = 0; i < productsRejected.length; i++) {
          let product = productsRejected[i];
          delete product.quantity;
        } */
        return productsRejected;
      } else {
        res.json({ status: "error", message: "El carrito está vacío." });
      }
    }
  }

  /////////////////////////////////////////////////////
  async cartUpdated(cartId, newCart) {
    try {
      const cart = await this.dao.getCartById(cartId);
      if (cart) {
        const cartUpdated = await this.dao.cartUpdated(cartId, newCart);
        return cartUpdated;
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  /////////////////////////////////////////////////////
  async getCartById(cartId) {
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
  }

  /////////////////////////////////////////////////////
  async addProduct(cartId, productId, quantity) {
    const newCart = await this.dao.addProduct(cartId, productId, quantity);
    return newCart;
  }

  /////////////////////////////////////////////////////
  async deleteProduct(cartId, productId) {
    const cart = await this.dao.newCartWithoutProduct(cartId, productId);
    return cart;
  }

  /////////////////////////////////////////////////////
  async deleteAllProducts(cartId) {
    const cart = await this.dao.deleteAllProducts(cartId);
    return cart;
  }
}
