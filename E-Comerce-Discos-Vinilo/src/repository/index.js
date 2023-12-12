//
import { CartsRepository } from "./carts.repository.js";
import { ChatsRepository } from "./chats.repository.js";
import { ProductsRepository } from "./products.repository.js";
import { SessionsRepository } from "./sessions.repository.js";
import {
  cartsDao,
  chatsDao,
  productsDao,
  usersDao,
  ticketsDao,
} from "../dao/factory.js";
import { TicketsRepository } from "./tickets.repository.js";

export const cartsService = new CartsRepository(cartsDao);
export const chatsService = new ChatsRepository(chatsDao);
export const productsService = new ProductsRepository(productsDao);
export const sessionsService = new SessionsRepository(usersDao);
export const ticketService = new TicketsRepository(ticketsDao);
