import express from "express";
import { productsRouter } from "./routes/products.routes.js";
import { realTimeProducts } from "./routes/realTimeProducts.routes.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./utils.js";
import path from "path";
import { productsItem } from "./persistence/index.js";
import { prueba } from "./routes/prueba.routes.js";

const port = 8080;
const app = express();

const httpServer = app.listen(port, () => console.log("Server is working"));
const socketServer = new Server(httpServer);

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "/views"));

app.use("/", productsRouter);
app.use("/", realTimeProducts);
app.use("/", prueba)

//Websockets

socketServer.on("connection", async (socket) => {
  console.log("Cliente en linea");
  const products = await productsItem.getProducts();
  socket.emit("arrayProducts", products);

  socket.on("productJson", async (newProduct) => {
    const result = await productsItem.addProduct(newProduct);
    const products = await productsItem.getProducts();
    io.emit("arrayProducts", products);
  });

  socket.on("deleteProductById", async (idProduct) => {
    const products = await productsItem.deleteProductById(idProduct);
    io.emit("arrayProducts", products);
  });

  socket.on("productUpdatedJson", async (productUpdatedJson) => {
    const result = await productsItem.updateProduct(
      productUpdatedJson.Id,
      productUpdatedJson
    );
    const products = await productsItem.getProducts();
    io.emit("arrayProducts", products);
  });
});
