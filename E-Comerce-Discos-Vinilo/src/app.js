//
import express from "express";
import { productsRouter } from "./routes/products.routes.js";
import { realTimeProducts } from "./routes/realTimeProducts.routes.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./utils.js";
import path from "path";
import { productsService } from "./repository/index.js";
import { chatsService } from "./repository/index.js";
import { chatRouter } from "./routes/chats.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { sessionsRouter } from "./routes/sessions.routes.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import { passportInit } from "./config/passportConfig.js";
import { generalConfig } from "./config/generalConfig.js";
import { CustomError } from "./errors/services/customError.service.js";
import { EError } from "./errors/Enums/EError.js";
import { getProductError } from "./errors/services/productsError.service.js";
import { errorHandler } from "./errors/errorHandler.js";
import { logger } from "./helpers/logger.js";

const port = generalConfig.server.port;
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
const httpServer = app.listen(port, () =>
  logger.info(`Servidor funcionando en el puerto ${port}.`)
);
const socketServer = new Server(httpServer);

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
  const products = await productsService.getProducts();
  if (!products) {
    const error = CustomError.createError({
      name: "Data Base error",
      cause: getProductError(),
      message: "Error en la base de datos",
      errorCode: EError.DATABASE_Error,
    });
    return console.log(error);
  }
  socket.emit("arrayProducts", products);

  socket.on("productJson", async (newProduct) => {
    const result = await productsService.addProduct(newProduct);
    const products = await productsService.getProducts();
    socket.emit("arrayProducts", products);
  });

  socket.on("deleteProductById", async (idProduct) => {
    await productsService.deleteProductById(idProduct);
    const products = await productsService.getProducts();
    socket.emit("arrayProducts", products);
  });

  socket.on("productUpdatedJson", async (productUpdatedJson) => {
    const result = await productsService.updateProductById(
      productUpdatedJson.Id,
      productUpdatedJson
    );
    const products = await productsService.getProducts();
    socket.emit("arrayProducts", products);
  });

  //Chat
  /* await ChatsService.emptyChat(); */ //Para eliminar las pruebas que fui haciendo
  const historyChat = await chatsService.getChat();
  socket.emit("historyChat", historyChat);
  socket.on("messageChat", async (messageInfo) => {
    const result = await chatsService.updateChat(messageInfo);
    const historyChat = await chatsService.getChat();
    socketServer.emit("historyChat", historyChat);
  });
});

//Manejo de errores
app.use(errorHandler);
