//
import { CartsRepository } from "./carts.repository.js";
import { ChatsRepository } from "./chats.repository.js";
import { ProductsRepository } from "./products.repository.js";
import { SessionsRepository } from "./sessions.repository.js";
import { cartsDao, chatsDao, productsDao, usersDao } from "../dao/factory.js";

export const cartsService = new CartsRepository(cartsDao);
export const chatsService = new ChatsRepository(chatsDao);
export const productsService = new ProductsRepository(productsDao);
export const sessionsService = new SessionsRepository(usersDao);