import mongoose from "mongoose";

const messageSchema= new mongoose.Schema({
    message:{type:String, required:true},
    from:{type:String, required:true, trim:true},
    to:{type:String, required:true, trim:true},
    time:{type:Date, default:Date.now}
})

const messageModel = mongoose.model("message", messageSchema)

export default messageModel