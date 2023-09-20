
import express from "express"
import {askQuestion , getAllQuestions , deleteQuestion,voteQuestion}from "../controllers/Questions.js"
import auth from "../middlewares/auth.js"


const router = express.Router()

router.post('/Ask', auth, askQuestion) //next is askQuestion controller
router.get('/get', getAllQuestions)
router.delete('/delete/:id', auth, deleteQuestion) //next is deleteQuestion controller
router.patch('/vote/:id',voteQuestion)
export default router