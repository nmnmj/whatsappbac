import mongoose from "mongoose";

const connectDB=async (DB_URL)=>{
    try {
        const db_options={
            dbName:"whatsapp"
        }
        await mongoose.connect(DB_URL, db_options)
        console.log("connected")
    } catch (error) {
        console.log(error)
    }
}

export default connectDB