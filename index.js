import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import web from './routes/web.js'
import connectDB from './db/connectmongo.js'
dotenv.config()
const app = express()
app.use(cors({
    origin:["http://localhost:3000/", "https://whatsappbac.vercel.app/"]
}))
app.use(express.json())
app.use(express.urlencoded({extended:false}))


const port=process.env.PORT || 8000

connectDB(process.env.DB_URL)

app.use("/", web)


app.listen(port,()=>{
    console.log("running")
})
