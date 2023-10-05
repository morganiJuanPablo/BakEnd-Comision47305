//
import mongoose from "mongoose";

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
  products: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        quantity: Number,
      },
    ],
  },
});

export const cartModel = mongoose.model(cartsCollection, cartsSchema);
