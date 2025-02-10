import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()


if(!process.env.MONGODB_URI){
    throw new error(
        "Please provide MONGODB_URI in the .env file"
    )
}

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connect DB Successfully!")
    } catch (error) {
        console.log("MongoDB Connect error", error)
    }
}

export default connectDB