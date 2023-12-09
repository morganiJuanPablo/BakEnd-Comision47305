//
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { CartsManagerMongo } from "../CartsManagerMongo.js";

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
    enum: ["Usuario", "Administrador"],
    default: "Usuario",
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
});

usersSchema.plugin(mongoosePaginate);

usersSchema.pre("save", async function (next) {
  try {
    const newCart = await CartsManagerMongo.createCart();
    this.cart = newCart._id;
  } catch (error) {
    next(error);
  }
});

export const userModel = mongoose.model(usersCollection, usersSchema);
