import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true })
    console.log("Connected to Database Successfully!");
}
