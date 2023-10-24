
import express from "express"
import {signup,login,forgotpassword,resetpassword, resetverify} from "../controllers/auth.js"
import { getAllUsers ,updateProfile} from "../controllers/Users.js"
import auth from "../middlewares/auth.js" 

const router = express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.post('/passwordlink',forgotpassword)
router.get('/resetpass/:id/:token',resetverify)
router.patch('/reset/:id/:token', resetpassword)

router.get('/getAllUsers', getAllUsers)
router.patch('/update/:id',auth, updateProfile)


export default router