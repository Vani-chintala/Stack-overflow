
import express from "express"
import {Chatbot} from "../controllers/chatbot.js"
const router = express.Router()



router.post('/chatbot',Chatbot)

export default router