
import express from "express"
import {Javascriptchat} from "../controllers/chatbot.js"
const router = express.Router()

router.post('/javascript',Javascriptchat)

export default router