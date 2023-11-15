//
import express from "express";
import { productsRouter } from "./routes/products.routes.js";
import { realTimeProducts } from "./routes/realTimeProducts.routes.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./utils.js";
import path from "path";
import { DbConnection } from "./config/dbConnection.js";
import { mongoProductsItem } from "./dao/index.js";
import { mongoChatItem } from "./dao/index.js";
import { chatRouter } from "./routes/chats.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { sessionsRouter } from "./routes/sessions.routes.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import { passportInit } from "./config/passportConfig.js";

const port = 8080;
const app = express();

//Middlewares
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuración passport
passportInit();
app.use(passport.initialize());

//Servidores
const httpServer = app.listen(port, () => console.log("Servidor funcionando."));
const socketServer = new Server(httpServer);

//DB conexión
const dbConection = DbConnection.getInstance();


//Handlebars Configuración
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "/views"));

//Routes
app.use("/", productsRouter);
app.use("/", realTimeProducts);
app.use("/", chatRouter);
app.use("/", cartsRouter);
app.use("/api/session", sessionsRouter);

//Websockets
socketServer.on("connection", async (socket) => {
  console.log("Cliente en linea");
  const products = await mongoProductsItem.getProducts();
  socket.emit("arrayProducts", products);

  socket.on("productJson", async (newProduct) => {
    const result = await mongoProductsItem.addProduct(newProduct);
    const products = await mongoProductsItem.getProducts();
    socket.emit("arrayProducts", products);
  });

  socket.on("deleteProductById", async (idProduct) => {
    await mongoProductsItem.deleteProductById(idProduct);
    const products = await mongoProductsItem.getProducts();
    socket.emit("arrayProducts", products);
  });

  socket.on("productUpdatedJson", async (productUpdatedJson) => {
    const result = await mongoProductsItem.updateProductById(
      productUpdatedJson.Id,
      productUpdatedJson
    );
    const products = await mongoProductsItem.getProducts();
    socket.emit("arrayProducts", products);
  });

  //Chat
  /* await mongoChatItem.emptyChat(); */ //Para eliminar las pruebas que fui haciendo
  const historyChat = await mongoChatItem.getChat();
  socket.emit("historyChat", historyChat);
  socket.on("messageChat", async (messageInfo) => {
    const result = await mongoChatItem.updateChat(messageInfo);
    const historyChat = await mongoChatItem.getChat();
    socketServer.emit("historyChat", historyChat);
  });
});
