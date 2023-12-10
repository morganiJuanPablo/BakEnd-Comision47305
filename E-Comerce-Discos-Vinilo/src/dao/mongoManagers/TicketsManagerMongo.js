//
import { ticketModel } from "./modelsDB/tickets.model.js";
import { logger } from "../../helpers/logger.js";

export class TicketsManagerMongo {
  constructor() {
    this.ticketModel = ticketModel;
  }

  ///////////////////////////////////////////////////////////////////

  async createTicket(newTicket) {
    try {
      const ticket = await this.ticketModel.create(newTicket);
      return ticket;
    } catch (error) {
      logger.error(error.message);
      throw new Error("No se pudo crear el nuevo ticket");
    }
  }

  ///////////////////////////////////////////////////////////////////

  async getTicketById(ticketId) {
    try {
      const ticket = await this.ticketModel.findById(ticketId);
      return ticket;
    } catch (error) {
      logger.error(error.message);
      throw new Error(`El ticket solicitado no existe en nuestros registros`);
    }
  }

  ///////////////////////////////////////////////////////////////////

  async getTickets() {
    try {
      const tickets = await this.ticketModel.find();
      return tickets;
    } catch (error) {
      logger.error(error.message);
      throw new Error(`No se pudieron obtener los tickets`);
    }
  }
}
