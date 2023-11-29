//

export class TicketsRepository {
  constructor(dao) {
    this.dao = dao;
  }
  /////////////////////////////////////////////////////
  async createTicket(newTicket) {
    const ticket = await this.dao.createTicket(newTicket);
    return ticket;
  }
  /////////////////////////////////////////////////////
  async getTicketById(ticketId) {
    const user = await this.dao.getTicket(ticketId);
    return user;
  }
  /////////////////////////////////////////////////////
  async getTickets() {
    const tickets = await this.dao.getTickets();
    return tickets;
  }
}
