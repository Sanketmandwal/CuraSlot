import express from 'express'
import {  appointmentcancel, appointmentcomplete, appointmentsdoctor, doctordashboard, doctorList, getDoctorProfile, loginDoctor, updatedoctorprofile } from '../controllers/doctor.js'
import authdoctot from '../middlewares/authDoctor.js'

const doctorrouter = express.Router()

doctorrouter.get('/list',doctorList)
doctorrouter.get('/appointment',authdoctot,appointmentsdoctor)
doctorrouter.post('/login',loginDoctor)
doctorrouter.post('/complete-appointment',authdoctot,appointmentcomplete)
doctorrouter.post('/cancel-appointment',authdoctot,appointmentcancel)
doctorrouter.get('/dashboard',authdoctot,doctordashboard)
doctorrouter.get('/profile',authdoctot,getDoctorProfile)
doctorrouter.post('/updateprofile',authdoctot,updatedoctorprofile)

export default doctorrouter