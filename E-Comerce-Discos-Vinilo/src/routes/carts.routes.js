//
import { Router } from "express";
const router = Router();
import { mongoCartItem } from "../dao/index.js";

//GET
router.get("/carts", async (req, res) => {
  try {
    const carts = await mongoCartItem.getCarts();
    res.json({ status: "success", data: carts });
  } catch (error) {
    res.json({ Error: error.message });
  }
});

router.get("/carts/:idCart", async (req, res) => {
  try {
    const idCart = req.params.idCart;
    const cart = await mongoCartItem.getCartById(idCart);
    res.json({ status: "success", data: cart });
  } catch (error) {
    res.json({ Error: error.message });
  }
});

//POST
router.post("/carts", async (req, res) => {
  try {
    const newCart = await mongoCartItem.createCart();
    console.log(newCart)
    res.json({ status: "success", message: "Carrito creado con éxito." });
  } catch (error) {
    res.json({ Error: error.message });
  }
});

router.post("/:IdCart/products/:IdProduct", async (req, res) => {
    try {
      const IdCart = req.params.IdCart;
      const IdProduct = req.params.IdProduct;
      await mongoCartItem.ad(IdCart, IdProduct);
      res.json({
        message: `Producto añadido con éxito al carrito con id: ${IdCart}.`,
      });
    } catch (error) {
      res.json({ Error: error.message });
    }
  });

export { router as cartsRouter };


/* app.put("/add-students", async (req, res) => {
    try {
      const { studentId, courseId } = req.body;
      const course = await coursesModel.findById(courseId);
      course.courseStudents.push(studentId);
      const resultado = await coursesModel.findByIdAndUpdate(courseId, course, {
        new: true,
      });
      res.json({ data: resultado });
    } catch (error) {
      console.log(error.message);
    } */