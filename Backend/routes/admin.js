import express from 'express'
import { addDoctor,adminDashboard,allDoctors,appointmentcancel,appointmentsAdmin,loginAdmin } from '../controllers/admin.js'
import upload from '../middlewares/multer.js'
import authadmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/doctor.js'

const adminrouter = express.Router()

adminrouter.post('/add-doctor',authadmin, upload.single('image'), addDoctor)
adminrouter.post('/all-doctor',authadmin, allDoctors)
adminrouter.post('/change-availability',authadmin, changeAvailability)
adminrouter.post('/login',loginAdmin)
adminrouter.get('/appointments',authadmin,appointmentsAdmin)
adminrouter.post('/cancel-appointment',authadmin,appointmentcancel)
adminrouter.post('/dashboard',authadmin,adminDashboard)

export default adminrouter