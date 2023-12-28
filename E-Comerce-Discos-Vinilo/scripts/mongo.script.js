//
import { generalConfig } from "../src/config/generalConfig.js";
import mongoose from "mongoose";
import { productModel } from "../src/dao/mongoManagers/modelsDB/products.model.js";

mongoose.connect(generalConfig.mongo.url)

const updateProducts = async()=>{
    try {
        const adminId = "6567904160fd31b6fad8f17a";
        const result = await productModel.updateMany({},{$set:{owner:adminId}});
        console.log("result", result);
    } catch (error) {
        console.log(error.message);
    }
};
updateProducts()