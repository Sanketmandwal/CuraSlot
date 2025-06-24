import doctorModel from "../models/doctors.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentmodel from "../models/appointment.js"

const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body
        const docdata = await doctorModel.findById(docId)
        if (!docdata) {
            return res.json({ success: false, message: "Doctor not found" })
        }
        await doctorModel.findByIdAndUpdate(docId, { available: !docdata.available })
        res.json({ success: true, message: "Availability Changed" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({ success: true, doctors })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body

        const docdata = await doctorModel.findOne({ email })

        if (!docdata) {
            res.json({ success: false, message: "Invalid Creditails" })
        }

        const isMatch = await bcrypt.compare(password, docdata.password)

        if (isMatch) {
            const token = jwt.sign({ id: docdata._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid Creditails" })
        }

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const appointmentsdoctor = async (req, res) => {
    try {
        const { docId } = req.body
        const appointment = await appointmentmodel.find({ docId })

        res.json({ success: true, appointment })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const appointmentcomplete = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body

        const appointmentdata = await appointmentmodel.findById(appointmentId)

        if (appointmentId && appointmentdata.docId === docId) {
            await appointmentmodel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            res.json({ success: true, message: "Appointment Completed" })
        } else {
            res.json({ success: true, message: "Mark Failed" })
        }
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const appointmentcancel = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body

        const appointmentdata = await appointmentmodel.findById(appointmentId)

        if (appointmentId && appointmentdata.docId === docId) {
            await appointmentmodel.findByIdAndUpdate(appointmentId, { cancelled: true })
            res.json({ success: true, message: "Appointment Cancelled" })
        } else {
            res.json({ success: true, message: "Cancellation Failed" })
        }
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const doctordashboard = async (req, res) => {
    try {
        const {docId} = req.body

        const appointment = await appointmentmodel.find({docId})

        let earning =0

        appointment.map((item)=>{
            if(item.isCompleted || item.payment){
                earning+=item.amount
            }
        })

        let patients = []

        appointment.map((item)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })

        const dashdata = {
            earning,
            appointment : appointment.length,
            patients : patients.length,
            latestAppointment : appointment.reverse().slice(0,5)
        }

        res.json({success:true,dashdata})
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

const getDoctorProfile = async (req,res) => {
    try {
        const {docId}=req.body
        const profiledata = await doctorModel.findById(docId).select('-password')

         res.json({ success: true, profiledata })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

const updatedoctorprofile = async (req,res) => {
    try {
        const {docId,fees,address,available}=req.body

        await doctorModel.findByIdAndUpdate(docId,{fees,address,available})

        res.json({ success: true, message: "Profile Updated" })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export { changeAvailability, doctorList, loginDoctor, appointmentsdoctor, appointmentcancel, appointmentcomplete ,doctordashboard,getDoctorProfile,updatedoctorprofile}