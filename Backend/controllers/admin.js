import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctors.js'
import jwt from 'jsonwebtoken'
import appointmentmodel from '../models/appointment.js'
import usermodel from '../models/user.js'

// API for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Enter All Details" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter Valid Email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Enter Strong Password" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedpass = await bcrypt.hash(password, salt)


        const imageupload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageurl = imageupload.secure_url

        const docdata = {
            name,
            email,
            password: hashedpass,
            image: imageurl,
            speciality,
            about,
            degree,
            experience,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newdoc = new doctorModel(docdata)
        await newdoc.save()

        res.json({ success: true, message: "New Doctor Added" })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API for Admin

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: 'invalid credintials' })
        }
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// API TO GET ALL DOCTORS FOR ADMIN PANEL

const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// API TO GET ALL APPOINTMENTS FOR ADMIN

const appointmentsAdmin = async (req, res) => {
    try {

        const appointments = await appointmentmodel.find({})

        res.json({ success: true, appointments })

    } catch (error) {
        console.error(error.message)
        res.json({ success: false, message: error.message })
    }
}


const appointmentcancel = async (req, res) => {
    try {
        const { appointmentId } = req.body

        const appointmentData = await appointmentmodel.findById(appointmentId)

        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment not found" })
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

const adminDashboard = async (req,res) => {
    try {
        const doctors = await doctorModel.find({})
        const appointments =await appointmentmodel.find({})
        const users = await usermodel.find({})

        const dashdata = {
            doctors : doctors.length,
            appointments : appointments.length,
            patients : users.length,
            latestAppointments : appointments.reverse().slice(0,5)
        }

        res.json({success:true,dashdata})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin ,appointmentcancel,adminDashboard}