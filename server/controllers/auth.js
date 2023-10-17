
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import Users from "../models/auth.js"
import dotenv from 'dotenv'
dotenv.config()
import nodemailer from "nodemailer"
import mongoose from "mongoose"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
})

export const signup = async (req, res) => {
  //req,res from frontend
  const { name, email, password } = req.body
  try {
    const existinguser = await Users.findOne({ email }) //here users is database
    if (existinguser) {
      return res.status(404).json({ message: "User already exists" })
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = await Users.create({ name, email, password: hashedPassword })
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.status(200).json({ result: newUser, token })
  } catch (err) {
    res.status(500).json("something went wrong...")
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const existinguser = await Users.findOne({ email })
    if (!existinguser) {
      return res.status(404).json({ message: "User doesn't exists" })
    }
    const isPasswordCrt = await bcrypt.compare(password, existinguser.password)
    if (!isPasswordCrt) {
      return res.status(400).json({ message: "invalid credentials" })
    }
    const token = jwt.sign({ email: existinguser.email, id: existinguser._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.status(200).json({ result: existinguser, token })
  } catch (err) {
    res.status(500).json("something went wrong...")
  }
}


export const forgotpassword = async (req, res) => {
  const { email } = req.body
  try {
    const existinguser = await Users.findOne({ email })
    //console.log(existinguser)
    if (!existinguser) {
      res.status(401).json({ message: "User doesn't exists" })
    } else {
      const token = jwt.sign({ email: existinguser.email, id: existinguser._id },
        process.env.JWT_SECRET, { expiresIn: '30m' })
        console.log(token)
      const storetokeninDb = await Users.findByIdAndUpdate(
        {_id : existinguser._id},
        
        {token : token},
        { new: true })
       await storetokeninDb.save()
     console.log(storetokeninDb )
      
      if (storetokeninDb) {
        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "sending password reset link via through gmail",
          text: `http://localhost:3000/resetpassword/${existinguser._id}/${storetokeninDb.token}`
        }
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error)
            res.status(402).json({ message: "Email not sent" })
          } else {
            console.log('Email sent: ' + info.response);
            return res.status(201).json({ message: "Email  sent successfully" })
          }
        })
      }

    }
  } catch (error) {
    res.status(501).json({ message: "Something wrong" })
  }
}

//verifyimg id ,token 
export const resetverify = async (req, res) => {
  console.log("hai",her)
  const { id, token } = req.params
  
  console.log(id,token)
 
  try {
       //checking id  and token values in db
    const useridvalid = await Users.findOne({ _id: id }, {token:token})
    console.log(useridvalid)
   //checking whether token is expired or not
    const verifytoken = jwt.verify(token, process.env.JWT_SECRET)
    if (useridvalid && verifytoken._id) {
      res.status(201).json({ message: "Valid user " })
    } else {
      res.status(405).json({ message: "Not a valid user" })
    }
  } catch (error) {
    res.status(500).json({ message: "Invalid credentials" })
  }
}


export const resetpassword = async (req, res) => {
  const { id, token } = req.params
  const { password, confirmpassword } = req.body
  console.log(id,token)
  //verifying id,token
      const existinguser = await Users.findOne({_id : id ,token : token})
    if (!existinguser) {
      return res.status(404).send("User unavailable")
    } else if (password !== confirmpassword) {
      return res.status(405).json({ message: "Please enter password and confirmpassword same" })
    } else {
      try {
      const hashedpassword = await bcrypt.hash(password, 12)
      const updatePassword = await Users.findByIdAndUpdate(_id, existinguser.token, {
        $set: {
          "password": hashedpassword
        }
      }, { new: true })
      updatePassword.save()
      res.status(200).json(updatePassword, { message: "Password updated successfully" })
    } catch (error) {
      res.status(500).json({ message: "something went wrong" })
    }
  }
}