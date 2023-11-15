//
import { CartsService } from "../service/carts.service.js";

export class CartsController {
  /////////////////////////////////////////////////////
  static getCartById = async (req, res) => {
    try {
      if (req.user?.email) {
        const cartId = req.user.cartId;
        const cart = await CartsService.getCartById(cartId);
        const sessionExist = req.user.email && true;
        const data = {
          sessionExist,
          cartId,
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
  static addProduct = async (req, res) => {
    try {
      const cartId = req.params.cartId;
      const productId = req.params.productId;
      const newCart = await CartsService.addProduct(cartId, productId);
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
  static deleteProduct = async (req, res) => {
    try {
      const cartId = req.params.cartId;
      const productId = req.params.productId;
      const cart = await CartsService.deleteProduct(cartId, productId);
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
      const cart = await CartsService.deleteAllProducts(cartId);
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
