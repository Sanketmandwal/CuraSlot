import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import dotenv from 'dotenv';
dotenv.config()
import razorpay from 'razorpay';
import connectCloudinary from './config/cloudinary.js';
import adminrouter from './routes/admin.js';
import doctorrouter from './routes/doctor.js';
import userrouter from './routes/user.js';

const app = express()
const port = process.env.PORT || 4000



connectCloudinary()
connectDB()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())


app.use('/api/admin', adminrouter)
app.use('/api/doctor', doctorrouter)
app.use('/api/user', userrouter)

app.get('/', (req, res) => {
    res.send('Hello From Backend')
})

app.listen(port, () => console.log('Server Started At', port))