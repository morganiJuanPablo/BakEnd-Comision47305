//
import { cartsService } from "../repository/index.js";

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
      productsOk.ticket.purchaser = req.user.email;
      const data = {
        style: "purchaseView.css",
        ticketPurchase: productsOk.ticket,
        productsSold: productsOk,
        productsRejected,
      };
      console.log(data.ticketPurchase);
      res.render("purchaseView", data);
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

      console.log(productsRejected)
    
      const productsRejectedToUpdate = productsRejected.map((item) => ({
        quantity: item.quantity,
        productId: { _id: item.productId._id },
      }));
      await cartsService.cartUpdated(cartId, productsRejectedToUpdate);
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
