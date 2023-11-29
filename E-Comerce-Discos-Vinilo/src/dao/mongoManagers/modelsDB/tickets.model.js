//
import mongoose from "mongoose";

const ticketsCollection = "tickets";

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  purchase_date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
  },
});

export const ticketModel = mongoose.model(ticketsCollection, ticketSchema);
