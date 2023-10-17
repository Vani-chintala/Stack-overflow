
import nodemailer from "nodemailer"
import Usersotp from "../models/userotp.js"
import Users from "../models/auth.js"
import dotenv from "dotenv"
dotenv.config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

export const sendOtp = async (req, res) => {
    const { email } = req.body
    try {
        const existinguser = await Users.findOne({ email })
        console.log(existinguser)
        if (existinguser) {
            const OTP = Math.floor(100000 + Math.random() * 900000)
            console.log(OTP)
            const emailexists = await Usersotp.findOne({ email })
            console.log(emailexists)
            if (!emailexists) {
                const saveuserotp = new Usersotp({ email, otp: OTP })
                await saveuserotp.save()
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "sending an otp for authentication",
                    html: `<p>An otp has sent to your email.Please verify and enter ${OTP}</p>`
                }
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error)
                        res.status(402).json({ message: "otp not sent through email" })
                    } else {
                        console.log('Email sent: ' + info.response);
                        return res.status(201).json({ message: "otp  sent successfully through email" })
                    }
                })
            }else {
                const updateuserotp = await Usersotp.findByIdAndUpdate(
                    {_id: emailexists._id},
                     {otp: OTP},
                  { new: true }
                  )
                 await updateuserotp.save()
                
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "sending an otp for authentication",
                    html: `<p>An otp has been sent to your email.Please verify and enter ${OTP}</p>`
                }
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error)
                        res.status(402).json({ message: "otp not sent" })
                    } else {
                        console.log('Email sent: ' + info.response);
                        return res.status(201).json({ message: "otp  sent successfully" })
                    }
                })
            }  
        }
        else {
            res.status(404).json({ message: "User not found" })
        }
    } catch (error) {
        res.status(501).json({ message: "Something wrong" })
    }
}

export const verifyOtp = async (req, res) => {
    const {  otpvariable } = req.body
    try {
        const otpindb = await Usersotp.findOne({ otp : otpvariable })
        if(otpindb){
            res.status(201).json({ message: "OTP verification is success" })
        }
        else {
            res.status(501).json({ message: "Not verified" })
        }
    } catch (error) {
        res.staus(401).json({ message: "Otp not verified" })
    }
}



