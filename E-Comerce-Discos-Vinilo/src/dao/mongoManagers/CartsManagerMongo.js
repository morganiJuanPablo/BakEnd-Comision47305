//
import { cartModel } from "./modelsDB/carts.model.js";

export class CartsManagerMongo {
  constructor() {
    this.cartModel = cartModel;
  }

  async createCart() {
    try {
      const newCart = {
        products: [],
      };
      await this.cartModel.create(newCart);
      return newCart;
    } catch (error) {
      console.log(error.message);
      throw new Error("No se pudo crear el carrito.");
    }
  }

  async getCarts() {
    try {
      const carts = await this.cartModel.find().lean();
      return carts;
    } catch (error) {
      console.log(error.message);
      throw new Error("No se pudo obtener los carritos.");
    }
  }

  async getCartById(cartId) {
    try {
      const cartById = await this.cartModel.find({ _id: cartId });
      if (cartById) {
        return cartById;
      } else {
        throw new Error(`El carrito con Id: ${cartId} no existe`);
      }
    } catch (error) {
      console.log(error.message);
      throw new Error("No se pudo obtener el carrito.");
    }
  }

  async deleteCartById(cartId) {
    try {
      const cartDeleted = await this.cartModel.deleteOne({ _id: cartId });
      if (cartDeleted) {
        return cartDeleted;
      } else {
        throw new Error(`El carrito con Id: ${cartId} no existe`);
      }
    } catch (error) {
      console.log(error.message);
      throw new Error("No se pudo eliminar el carrito.");
    }
  }

    async addProduct(cartId, productId) {
    try {
      let quantity = 1;
      const cart = await this.cartModel.findById(cartId);
      if (cart) {
        const { products } = cart;
        const product = products.find((p) => p.productId === productId);
        !product
          ? products.push({ productId: productId, quantity: quantity })
          : product.quantity++;
      }

      const cartUpdated = await this.cartModel.findByIdAndUpdate(cartId, cart, {
        new: true,
      });
      return cartUpdated;
    } catch (error) {
      console.log(error.message);
      throw new Error(`El carrito con Id: ${cartId} no existe`);
    }
  }
}
