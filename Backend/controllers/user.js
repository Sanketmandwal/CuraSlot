import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import usermodel from '../models/user.js'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctors.js'
import appointmentmodel from '../models/appointment.js'
import razorpay from 'razorpay'

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Invalid Creditials" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter Valid Email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Enter Strong Password" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedpass = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedpass,
        }

        const newuser = new usermodel(userData)
        await newuser.save()

        const token = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET)
        return res.json({ success: true, token })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const loginuser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await usermodel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "No User Found of this email please Register" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            return res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: 'Incorrect Password' })
        }



    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const getProfile = async (req, res) => {

    try {
        const { userId } = req.body

        const userData = await usermodel.findById(userId).select('-password')

        res.json({ success: true, userData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

const updateProfile = async (req, res) => {
    try {
        const { userId, name, email, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !address || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }

        await usermodel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

        if (imageFile) {
            const imageupload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageurl = imageupload.secure_url

            await usermodel.findByIdAndUpdate(userId, { image: imageurl })
        }

        res.json({ success: true, message: "Update Successful" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const bookappointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body
        const docData = await doctorModel.findById(docId).select('-password')

        if (!docData.available) {
            return res.json({ success: false, message: "Doctor Not Available" })
        }

        let slots_booked = docData.slots_booked

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot Not Available" })
            } else {
                slots_booked[slotDate].push(slotTime)

            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await usermodel.findById(userId).select('-password')

        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotDate,
            slotTime,
            date: Date.now(),
        }

        const newAppointment = new appointmentmodel(appointmentData)
        await newAppointment.save()

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: "Appointment Booked" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const listappointment = async (req, res) => {
    try {
        const { userId } = req.body;
        const appointments = await appointmentmodel.find({ userId })

        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const cancelappointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body

        const appointmentData = await appointmentmodel.findById(appointmentId)

        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment not found" })
        }

        if (appointmentData.userId != userId) {
            return res.json({ success: false, message: "Unautorized Action" })
        }

        await appointmentmodel.findByIdAndUpdate(appointmentId, { cancelled: true })

        const { docId, slotDate, slotTime } = appointmentData

        const doctorData = await doctorModel.findById(docId)

        const slots_booked = doctorData.slots_booked

        if (Array.isArray(slots_booked[slotDate])) {
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
        }

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: "Appointment Cancelled" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_SECRET_KEY;

const razorpayinstance = new razorpay({
    key_id: razorpayKeyId,
    key_secret: razorpayKeySecret,
})

const paymentGateway = async (req, res) => {
    try {
        const { appointmentId } = req.body

        const appointmentData = await appointmentmodel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: "Appointment Cancelled Or not Found" })
        }

        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId,
        }

        const order = await razorpayinstance.orders.create(options)

        res.json({ success: true, order })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to test payment of razorpay

const verifyRazorpay = async (req, res) => {
    try {

        const { razorpay_order_id } = req.body
        const orderInfo = await razorpayinstance.orders.fetch(razorpay_order_id)

        console.log(orderInfo)
        if (orderInfo.status === 'paid') {
            await appointmentmodel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            res.json({ success: true, message: "Payment SuccessFull" })
        }
        else {
            res.json({ success: false, message: "Payment UnsuccessFull" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export { registerUser, loginuser, getProfile, updateProfile, bookappointment, listappointment, cancelappointment, paymentGateway, verifyRazorpay }