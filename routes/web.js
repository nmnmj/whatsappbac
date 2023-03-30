import express from 'express'
import UserController from '../controller/userController.js'

const router = express.Router()

router.get("/",(req,res)=>{res.send("work")})
router.post("/register", UserController.register)
router.post("/registerverifi", UserController.UserVerifi)
router.post("/userlogin", UserController.UserLogin)
router.post("/usermessage", UserController.UserMessage)

router.get("/searchusers", UserController.searchUsers)
router.get("/:from", UserController.messages)
router.delete("/deleteall", UserController.deleteall)

export default router