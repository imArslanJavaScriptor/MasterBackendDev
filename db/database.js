import mongoose from "mongoose";
const connectBD = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("Mongo DB Connected")
    } catch (error) {
     console.log(error)   
    }
}

export default connectBD