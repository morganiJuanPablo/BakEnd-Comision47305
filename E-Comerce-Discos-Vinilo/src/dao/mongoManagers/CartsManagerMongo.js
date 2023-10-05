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
      const cart = await this.cartModel.findOneAndUpdate({ _id: cartId });

      if (!cart) {
        throw new Error("No es posible obtener los carritos");
      }
      const product = cart.products.find((p) => p.id === productId);
      if (product) {
        product.quantity++;
      } else {
        cart.products.push({
          id: productId,
          quantity: quantity,
        });
      }
      return cart;
    } catch (error) {
      console.log(error.message);
      throw new Error("No se pudo agregar el producto.");
    }
  }
}
