//
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { mongoCartItem } from "../../index.js";

const usersCollection = "users";

const usersSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    require: true,
    enum: ["usuario", "administrador"],
    default: "usuario",
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
});

usersSchema.plugin(mongoosePaginate);

usersSchema.pre("save", async function (next) {
  try {
    const newCart = await mongoCartItem.createCart();
    this.cart = newCart._id;
  } catch (error) {
    next(error);
  }
});

export const userModel = mongoose.model(usersCollection, usersSchema);
