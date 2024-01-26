//

export class TicketsRepository {
  constructor(dao) {
    this.dao = dao;
  }
  /////////////////////////////////////////////////////
  async createTicket(newTicket) {
    try {
      const ticket = await this.dao.createTicket(newTicket);
      return ticket;
    } catch (error) {
      logger.error(error.message);
    }
  }
  /////////////////////////////////////////////////////
  async getTicketById(ticketId) {
    try {
      const user = await this.dao.getTicket(ticketId);
      return user;
    } catch (error) {
      logger.error(error.message);
    }
  }
  /////////////////////////////////////////////////////
  async getTickets() {
    try {
      const tickets = await this.dao.getTickets();
      return tickets;
    } catch (error) {
      logger.error(error.message);
    }
  }
}
