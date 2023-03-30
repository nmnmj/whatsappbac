import bcrypt from 'bcrypt'
import transporter from '../config/emailconfig.js'
import messageModel from '../model/messagemodel.js'
import userModel from '../model/usersmodel.js'
import dotenv from 'dotenv'
dotenv.config()

class UserController{
    static register=async (req, res)=>{
        const{email, password, name}=req.body
        try {

            let otp = ''
            for(var i=0;i<4;i++){
                let r=Math.floor(Math.random()*10)
                otp=otp+r
            }

            let info = transporter.sendMail({
                from : process.env.EMAIL_USER,
                to:  email,
                subject: "Your OTP to register",
                html: `<h1>Your OTP is ${otp}.  </h1>`
            })
            res.status(200).send({"otp":otp, "email":email, "password":password, "name":name})
            
          
            
        } catch (error) {
            res.status(204).send({"status":"error"})
        }
    }
    static UserVerifi=async (req, res)=>{
        try {
            const {email, name, password}=req.body
            const hpassword = await bcrypt.hash(password, 10)

            const doc = new userModel({
                email, password:hpassword, name
            })
            const r = await doc.save()
            res.status(201).send({"email":email, "password":password, "name":name})

        } catch (error) {
            res.status(204).send({"status":"error"})
            
        }
    }
    static UserLogin=async (req, res)=>{
        try {
            const {email, password}=req.body
            const r = await userModel.findOne({email})
            const mpassword = await bcrypt.compare(password, r.password)
            if(mpassword){
                let m = await messageModel.find({
                    $or: [{ "from": r.email }, { "to": r.email }]
                })
                res.status(200).send({"email":email, "name":r.name, "messages":m})
            }
            else{
                res.status(204).send({"status":"error"})
            }
            
        } catch (error) {
            res.status(204).send({"status":"error"})
            
        }
    }
    static searchUsers= async (req, res)=>{
        try {
            const u = await userModel.find()
            // console.log(u)
            res.status(200).send({"users":u})
        } catch (error) {
            res.status(204).send({"status":"error"})
        }
    }
    static UserMessage=async (req, res)=>{
        try {
            const {message, from, to}=req.body
            const r = await userModel.findOne({email:from})
            const doc = new messageModel({
                message, from, to
            })
            const s = await doc.save()
            let m = await messageModel.find({
                $or: [{ "from": from }, { "to": from }]
            })
            res.status(200).send({"email":r.email, "name": r.name, "messages":m})
        } catch (error) {
            res.status(204).send({"status":"error"})
            
        }
    }
    static messages= async(req, res)=>{
        try {
            const {from}=req.params
            // console.log(from)
            const r = await userModel.findOne({email:from})
            
            let m = await messageModel.find({
                $or: [{ "from": from }, { "to": from }]
            })
            res.status(200).send({"email":r.email, "name": r.name, "messages":m})
        } catch (error) {
            res.status(204).send({"status":"error"})
            
        }
    }
    static deleteall=async(req, res)=>{
        const r = await messageModel.deleteMany()
        res.status(204).send({"status":"deleted"})
    }
}

export default UserController