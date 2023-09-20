
import express from "express"
import { postAnswer,deleteAnswer } from "../controllers/Answers.js"
import auth from "../middlewares/auth.js"

const router = express.Router()

//patch is used to update record  or delete particular portion 
router.patch('/post/:id', auth, postAnswer)
// deleting particular portion(only answer not complete question) is 
// nothing but updating so, use PATCH instead of DELETE //
router.patch('/delete/:id' ,auth, deleteAnswer)

export default router