//
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["TopVentas", "EdicionesEspeciales"],
  },
  status: {
    type: Boolean,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  facu: {
    type: Number,
  },
});

productsSchema.plugin(mongoosePaginate);
export const productModel = mongoose.model(productsCollection, productsSchema);
