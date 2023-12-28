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
import { swaggerSpecs } from "./config/swagger.config.js";
import swaggerUI from "swagger-ui-express";
import { tokenAuth } from "./middleware/middleware.js";
let idProductOwner;

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

/* app.use(tokenAuth, (req, res, next) => {
  if (req.user.email) {
    idProductOwner = req.user.id;
    next()
  }
  next();
}); */

//Servidores
const httpServer = app.listen(port, () =>
  logger.info(
    `Servidor funcionando en el puerto ${port}. Proceso ${process.pid}`
  )
);
const socketServer = new Server(httpServer);

//Websockets
socketServer.on("connection", async (socket) => {
  logger.info("Cliente en linea");
  const id = idProductOwner;
  const products = await productsService.getProducts();
  if (!products) {
    const error = CustomError.createError({
      name: "Data Base error",
      cause: getProductError(),
      message: "Error en la base de datos",
      errorCode: EError.DATABASE_Error,
    });
    return logger.error(error);
  }
  socket.emit("arrayProducts", products);

  socket.on("productJson", async (newProduct) => {
    newProduct.owner = id;
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
app.use(
  "/api/docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpecs),
  apiDocsRouter
);

//Manejo de errores
app.use(errorHandler);
