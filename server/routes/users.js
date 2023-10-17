
import express from "express"
import {signup,login,forgotpassword,resetverify,resetpassword} from "../controllers/auth.js"
import { getAllUsers ,updateProfile} from "../controllers/Users.js"
import auth from "../middlewares/auth.js" 

const router = express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.post('/passwordlink',forgotpassword)
router.get('/resetpassword/:id/:token',auth ,resetverify)
router.patch('/resetpassword/:id/:token',auth, resetpassword)

router.get('/getAllUsers', getAllUsers)
router.patch('/update/:id',auth, updateProfile)

export default router