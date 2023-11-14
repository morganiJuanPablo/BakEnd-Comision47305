//
import { productModel } from "../dao/mongoManagers/modelsDB/products.model.js";
import { ProductsService } from "../service/products.service.js";

export class ProductsController {
  /////////////////////////////////////////////////////
  static getProducts_controller = async (req, res) => {
    try {
      if (req.user?.email) {
        const category = req.params.category;
        let page = +req.query.page || 1;
        let products;
        if (category !== "inicio") {
          products = await productModel.paginate(
            { category: category },
            { limit: 6, page, lean: true }
          );
          products.prevLink = products.hasPrevPage
            ? `http://localhost:8080/products/${category}?page=${products.prevPage}`
            : "";
          products.nextLink = products.hasNextPage
            ? `http://localhost:8080/products/${category}?page=${products.nextPage}`
            : "";
        } else if (category === "inicio") {
          products = await productModel.paginate(
            {},
            { limit: 6, page, lean: true }
          );
          products.prevLink = products.hasPrevPage
            ? `http://localhost:8080/products/inicio?page=${products.prevPage}`
            : "";
          products.nextLink = products.hasNextPage
            ? `http://localhost:8080/products/inicio?page=${products.nextPage}`
            : "";
        }
        const sessionExist = req.user.email && true;
        const data = {
          sessionExist,
          cartId: req.user.cartId,
          userFirstName: req.user.name,
          style: "home.css",
          status: "success",
          payload: products.docs,
          totalPages: products.totalPages,
          prevLink: products.prevLink,
          nextLink: products.nextLink,
          actualPage: page,
          prevPage: products.hasPrevPage,
          nextPage: products.hasNextPage,
        };
        res.render("home", data);
      } else {
        res.redirect("/api/session/session_destroyed");
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static getProductsById_controller = async (req, res) => {
    try {
      if (req.user?.email) {
        const cartId = req.user.cartId;
        const productId = req.params.productId;
        const product = await ProductsService.getProductById_service(productId);
        const sessionExist = req.user.email && true;
        const data = {
          sessionExist,
          cartId,
          product,
          style: "productDetail.css",
          userFirstName: req.user.name,
        };
        res.render("productDetail", data);
      } else {
        res.redirect("/session_destroyed");
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  };

  /////////////////////////////////////////////////////
  static getProductsSort_controller = async (req, res) => {
    try {
      if (req.user?.email) {
        const category = req.params.category;
        let page = +req.query.page || 1;
        let products;
        if (category !== "inicio") {
          products = await productModel.paginate(
            { category: category },
            { limit: 6, page, lean: true, sort: { price: 1 } }
          );
          products.prevLink = products.hasPrevPage
            ? `http://localhost:8080/products/${category}/sort_asc?page=${products.prevPage}`
            : "";
          products.nextLink = products.hasNextPage
            ? `http://localhost:8080/products/${category}/sort_asc?page=${products.nextPage}`
            : "";
          products.linkAsc = `http://localhost:8080/products/${category}/sort_asc?page=${products.page}`;
        } else if (category === "inicio") {
          products = await productModel.paginate(
            {},
            { limit: 6, page, lean: true, sort: { price: 1 } }
          );
          products.prevLink = products.hasPrevPage
            ? `http://localhost:8080/products/inicio/sort_asc?page=${products.prevPage}`
            : "";
          products.nextLink = products.hasNextPage
            ? `http://localhost:8080/products/inicio/sort_asc?page=${products.nextPage}`
            : "";
          products.linkAsc = `http://localhost:8080/products/inicio/sort_asc?page=${products.page}`;
        }
        const sessionExist = req.user.email && true;
        const data = {
          sessionExist,
          style: "home.css",
          payload: products.docs,
          /*  sortLink: products.linkAsc, */
          totalPages: products.totalPages,
          prevLink: products.prevLink,
          nextLink: products.nextLink,
          actualPage: page,
          prevPage: products.hasPrevPage,
          nextPage: products.hasNextPage,
        };
        res.render("home", data);
      } else {
        res.redirect("/session_destroyed");
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  };
}
