//
import { cartModel } from "./modelsDB/carts.model.js";

export class CartsManagerMongo {
  constructor() {
    this.cartModel = cartModel;
  }

  ///////////////////////////////////////////////////////////////////

  async createCart() {
    try {
      const newCart = await this.cartModel.create({
        products: [],
      });
      return newCart;
    } catch (error) {
      console.log(error.message);
      throw new Error("No se pudo crear el carrito.");
    }
  }

  ///////////////////////////////////////////////////////////////////

  async getCarts() {
    try {
      const carts = await this.cartModel.find().lean();
      return carts;
    } catch (error) {
      console.log(error.message);
      throw new Error("No se pudo obtener los carritos.");
    }
  }

  ///////////////////////////////////////////////////////////////////

  async getCartById(cartId) {
    try {
      const cartById = await this.cartModel
        .findById(cartId)
        .lean()
        .populate("products.productId");
      return cartById;
    } catch (error) {
      console.log(error.message);
      throw new Error(`El carrito con Id: ${cartId} no existe`);
    }
  }

  ///////////////////////////////////////////////////////////////////

  async addProduct(cartId, productId) {
    try {
      let quantity = 1;
      const cart = await this.cartModel.findById(cartId);
      if (cart) {
        const { products } = cart;
        const product = products.find(
          (p) => p.productId.toString() === productId
        );
        !product
          ? products.push({
              productId: productId,
              quantity: quantity,
            })
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

  ///////////////////////////////////////////////////////////////////

  async quantityModificated(cartId, productId, quantity) {
    try {
      const cart = await this.cartModel.findById(cartId);
      if (cart) {
        const { products } = cart;
        const product = products.find(
          (p) => p.productId.toString() === productId
        );
        if (product) {
          product.quantity = quantity;
        } else {
          throw new Error(`El producto con Id: ${productId} no existe`);
        }
      } else {
        throw new Error(`El carrito con Id: ${cartId} no existe`);
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

  ///////////////////////////////////////////////////////////////////

  async deleteCartById(cartId) {
    try {
      const cartDeleted = await this.cartModel.deleteOne({ _id: cartId });
      return cartDeleted;
    } catch (error) {
      console.log(error.message);
      throw new Error(`El carrito con Id: ${cartId} no existe`);
    }
  }

  ///////////////////////////////////////////////////////////////////

  async deleteProduct(cartId, productId) {
    try {
      const cart = await this.cartModel.findById(cartId);
      if (cart) {
        const product = cart.products.find(
          (p) => p.productId.toString() === productId
        );
        if (product) {
          const cartWithoutProduct = cart.products.filter(
            (p) => p.productId.toString() !== productId
          );
          cart.products = cartWithoutProduct;
          const newCart = await this.cartModel.findByIdAndUpdate(cartId, cart, {
            new: true,
          });
          return newCart;
        } else {
          throw new Error(`El producto con Id: ${productId} no existe`);
        }
      } else {
        throw new Error(`El carrito con Id: ${cartId} no existe`);
      }
    } catch (error) {
      console.log(error.message);
      throw new Error("No se pudo eliminar el producto.");
    }
  }

  ///////////////////////////////////////////////////////////////////

  async newCartWithoutProduct(cartId, productId) {
    try {
      let cart = await this.cartModel.findById(cartId);
      let cartWithoutProduct = await this.deleteProduct(cartId, productId);
      const newCart = await this.cartModel.findByIdAndUpdate(
        cartId,
        cartWithoutProduct,
        {
          new: true,
        }
      );
      return newCart;
    } catch (error) {
      console.log(error.message);
      throw new Error("No se pudo eliminar el producto.");
    }
  }

  ///////////////////////////////////////////////////////////////////

  async deleteAllProducts(cartId) {
    try {
      const cart = await this.cartModel.findById(cartId);
      if (cart) {
        cart.products = [];
        const emptyCart = await this.cartModel.findByIdAndUpdate(cartId, cart, {
          new: true,
        });
        return emptyCart;
      } else {
        throw new Error(`El carrito con Id: ${cartId} no existe`);
      }
    } catch (error) {
      console.log(error.message);
      throw new Error("No se pudo vacias el carrito.");
    }
  }
}
