//
import mongoose from "mongoose";

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
  products: {
    type: [
      {
        quantity: {
          type: Number,
          required: true,
        },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
      },
    ],
    default: [],
  },
});

export const cartModel = mongoose.model(cartsCollection, cartsSchema);
