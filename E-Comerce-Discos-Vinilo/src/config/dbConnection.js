import mongoose from "mongoose";

export const dbConnection = async ()=>{
    try {
        mongoose.connect('mongodb+srv://morganijuanpablo:XgMe7LjudVbQGoKJ@juampidb.wigsasz.mongodb.net/ecomerceDB?retryWrites=true&w=majority')
        console.log('Connected to the database')
    } catch (error) {
        console.log('Failed to connect to the database',error.message)
    }
}