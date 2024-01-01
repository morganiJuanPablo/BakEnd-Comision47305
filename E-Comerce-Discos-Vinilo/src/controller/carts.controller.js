//
import {
  cartsService,
  productsService,
  ticketService,
} from "../repository/index.js";
import { transporterGmail } from "../config/gmailMailingConfig.js";
import { generalConfig } from "../config/generalConfig.js";
import { emailToSendPurchaseDetail } from "../helpers/gmail.js";
import { logger } from "../helpers/logger.js";

export class CartsController {
  /////////////////////////////////////////////////////
  static getCarts = async (req, res) => {
    try {
      const carts = await cartsService.getCarts();
      res.json({ data: carts });
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static getCartById = async (req, res) => {
    try {
      if (req.user?.email) {
        const cartId = req.user.cartId;
        const sessionExist = req.user.email && true;
        const cart = await cartsService.getCartById(cartId);

        const data = {
          sessionExist,
          cartId,
          totalPrice: cart.totalPrice,
          style: "cart.css",
          products: cart.products,
          userFirstName: req.user.name,
        };
        res.render("cart", data);
        /* res.json({ status: "success", data: cart }); */
      } else {
        res.redirect("/session_destroyed");
      }
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static getPurchase = async (req, res) => {
    try {
      const { cartId } = req.params;
      const productsOk = await cartsService.getProductsOk(cartId);
      const productsRejected = await cartsService.getProductsRejected(cartId);

      if (productsOk || productsRejected) {
        let purchaseExist;
        if (productsOk.length) {
          purchaseExist = true;
        } else {
          purchaseExist = false;
        }
        let rejectedExist;
        if (productsRejected.length) {
          rejectedExist = true;
        } else {
          rejectedExist = false;
        }
        productsOk.ticket.purchaser = req.user.email;
        const data = {
          style: "purchaseView.css",
          ticketPurchase: productsOk.ticket,
          productsSold: productsOk,
          productsRejected,
          purchaseExist,
          rejectedExist,
        };
        res.render("purchaseView", data);
      } else {
        res.redirect("/products/inicio");
      }
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static addProduct = async (req, res) => {
    try {
      const quantity = req.body.quantity;
      const cartId = req.params.cartId;
      const productId = req.params.productId;
      const product = await productsService.getProductById(productId);
      if (
        (req.user.role === "Premium" && product.owner === req.user.id) ||
        req.user.role === "Administrador"
      ) {
        res.json({
          status: "error",
          message: "No puedes agregar este producto al carrito",
        });
      } else {
        const newCart = await cartsService.addProduct(
          cartId,
          productId,
          quantity
        );
        res.json({
          status: "success",
          message: "¡Producto agregado al carrito!",
          data: newCart,
        });
      }
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  //POST
  static createCart = async (req, res) => {
    try {
      const newCart = await cartsService.createCart();
      res.status(200).json({ data: newCart });
    } catch {
      logger.error(error.message);
      res.status(500).json({ message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static purchaseCart = async (req, res) => {
    try {
      const { cartId } = req.params;
      const productsRejected = await cartsService.getProductsRejected(cartId);
      const productsOk = await cartsService.getProductsOk(cartId);
      productsOk.ticket.purchaser = req.user.email;

      const productsRejectedToUpdate = productsRejected.map((item) => ({
        quantity: item.quantity,
        productId: { _id: item.productId._id },
      }));
      const cartUpdated = await cartsService.updateCart(
        cartId,
        productsRejectedToUpdate
      );

      let productNewStock;
      for (let i = 0; i < productsOk.length; i++) {
        let product = productsOk[i];
        let newStock = product.productId.stock - product.quantity;
        product.productId.stock = newStock;
        productNewStock = product.productId;
      }

      const cartNewStock = await productsService.updateProductById(
        productNewStock._id,
        productNewStock
      );

      const newTicket = await ticketService.createTicket(productsOk.ticket);

      emailToSendPurchaseDetail(productsOk, productsOk.ticket);

      return cartUpdated, cartNewStock, newTicket;
    } catch (error) {
      logger.error(error.message);
    }
  };

  /////////////////////////////////////////////////////
  static deleteProduct = async (req, res) => {
    try {
      const cartId = req.params.cartId;
      const productId = req.params.productId;
      const product = await productsService.getProductById(productId);
      if (
        (req.user.role !== "Premium" && product.owner === req.user.id) ||
        req.user.role !== "Administrador"
      ) {
        const cart = await cartsService.deleteProduct(cartId, productId);
        res.json({
          status: "success",
          message: "Producto eliminado del carrito",
          data: cart,
        });
      } else {
        res.json({
          status: "error",
          message: "No tienes permiso para eliminar el producto",
        });
      }
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static deleteAllProducts = async (req, res) => {
    try {
      const cartId = req.params.cartId;
      const cart = await cartsService.deleteAllProducts(cartId);
      res.json({
        status: "success",
        message: `Carrito con Id: ${cartId} vaciado con éxito.`,
        data: cart,
      });
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ message: error.message });
    }
  };
}
