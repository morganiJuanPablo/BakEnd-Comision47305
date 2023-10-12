//
import { Router } from "express";
import { mongoProductsItem } from "../dao/index.js";
import { productModel } from "../dao/mongoManagers/modelsDB/products.model.js";
const router = Router();

///////////////////////////////////////////////////////////////////

//GET

router.get("/products/:category", async (req, res) => {
  try {
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
    const data = {
      style: "home.css",
      products,
    };
    res.render("home", data);
  } catch (error) {
    res.json({ status: "Error", message: error.message });
  }
});

router.get("/item/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await mongoProductsItem.getProductById(productId);
    const data = {
      style: "productDetail.css",
      product,
    };
    res.render("productDetail", data);
  } catch (error) {
    res.json({ Error: error.message });
  }
});

router.get("/products/:category/sort_asc", async (req, res) => {
  try {
    const category = req.params.category;
    let page = +req.query.page || 1;
    let products;
    const sortOption = { price: "asc" };
    if (category !== "inicio") {
      products = await productModel.paginate(
        { category: category },
        { limit: 6, page, lean: true, sort: sortOption }
      );
      products.prevLink = products.hasPrevPage
        ? `http://localhost:8080/products/${category}/sort_asc?page=${products.prevPage}`
        : "";
      products.nextLink = products.hasNextPage
        ? `http://localhost:8080/products/${category}/sort_asc?page=${products.nextPage}`
        : "";
      products.linkAsc = `http://localhost:8080/products/${category}/sort_asc`;
    } else if (category === "inicio") {
      products = await productModel.paginate(
        {},
        { limit: 6, page, lean: true, sort: sortOption }
      );
      products.prevLink = products.hasPrevPage
        ? `http://localhost:8080/products/inicio/sort_asc?page=${products.prevPage}`
        : "";
      products.nextLink = products.hasNextPage
        ? `http://localhost:8080/products/inicio/sort_asc?page=${products.nextPage}`
        : "";
      products.linkAsc = "http://localhost:8080/products/inicio/sort_asc";
    }
    const data = {
      style: "home.css",
      products,
    };
    res.render("home", data);
  } catch (error) {
    res.json({ status: "Error", message: error.message });
  }
});

export { router as productsRouter };
