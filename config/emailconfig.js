import dotenv from 'dotenv'
dotenv.config()

import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port: process.env.EMAIL_PORT,
    secure: false, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

export default transporter