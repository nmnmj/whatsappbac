import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{type:String, required:true, trim:true, unique:true},
    password:{type:String, required:true, trim:true},
    name:{type:String, required:true, trim:true},
})

const userModel = mongoose.model("user", userSchema)

export default userModel