import mongoose, { mongo } from "mongoose";

export async function connectaNaDataBase() {
  mongoose.connect(process.env.DB_CONNECTION_STRING);

  return mongoose.connection;
}
