import mongoose from "mongoose";
import dotenv from "dotenv";

export async function connectDatabase() {
   dotenv.config();
   const user = process.env.DB_USER;
   const password = process.env.DB_PSSWD;
   const database = process.env.DB_NAME

   try {
      await mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.cynmn1m.mongodb.net/?retryWrites=true&w=majority/${database}`)
      console.log("Database connected!");
   } catch (error) {
      console.log("file: database.ts:5 ~ connect ~error:", error);
   }
}