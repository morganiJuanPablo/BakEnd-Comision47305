//
import {
  cartsService,
  productsService,
  ticketService,
} from "../repository/index.js";
import { transporterGmail } from "../config/gmailMailingConfig.js";
import { generalConfig } from "../config/generalConfig.js";
import { emailTemplate } from "../utils.js";

export class CartsController {
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
      console.log(error.message);
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

        //enviamos el detalle de la compra por correo
        const namePurchaser = req.user.first_name;

        const purchaseByEmail = await transporterGmail.sendMail({
          from: generalConfig.gmail.account,
          to: productsOk.ticket.purchaser,
          subject: "Detalle de tu compra. Foo Fighters Shop",
          //propidad text cuando queremos que solo sea texto
          html: emailTemplate("Juan"),
        });

        res.render("purchaseView", data);
      } else {
        res.redirect("/products/inicio");
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static addProduct = async (req, res) => {
    try {
      const quantity = req.body.quantity;
      const cartId = req.params.cartId;
      const productId = req.params.productId;
      const newCart = await cartsService.addProduct(
        cartId,
        productId,
        quantity
      );
      res.json({
        status: "success",
        message: "Producto agregado al carrito",
        data: newCart,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  //POST
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

      return cartUpdated, cartNewStock, newTicket;
    } catch (error) {
      console.log(error.message);
    }
  };

  /////////////////////////////////////////////////////
  static deleteProduct = async (req, res) => {
    try {
      const cartId = req.params.cartId;
      const productId = req.params.productId;
      const cart = await cartsService.deleteProduct(cartId, productId);
      res.json({
        status: "success",
        message: "Producto eliminado del carrito",
        data: cart,
      });
    } catch (error) {
      console.log(error.message);
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
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  };
}
