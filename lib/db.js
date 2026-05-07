import mongoose from "mongoose";


export const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        

        console.log("MongoDB connected");
    } catch (error) {
        console.log(" MongoDB Error:");
        console.log(error); 
        process.exit(1);
    }
};

