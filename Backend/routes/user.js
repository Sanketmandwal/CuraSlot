import express from 'express'
import authuser from '../middlewares/authUser.js'
import { bookappointment, cancelappointment, getProfile, listappointment, loginuser, paymentGateway, registerUser, updateProfile, verifyRazorpay } from '../controllers/user.js'
import upload from '../middlewares/multer.js'



const userrouter = express.Router()

userrouter.post('/register', registerUser)
userrouter.post('/login', loginuser)
userrouter.get('/get-profile', authuser, getProfile)
userrouter.post('/update-profile', upload.single('image'), authuser, updateProfile)
userrouter.post('/book-appointment', authuser, bookappointment)
userrouter.get('/list-appointment',authuser, listappointment)
userrouter.post('/cancel-appointment',authuser,cancelappointment)
userrouter.post('/payment-razorpay',authuser,paymentGateway)
userrouter.post('/verifyrazorpay',authuser,verifyRazorpay)

export default userrouter