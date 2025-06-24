import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [dToken, setdToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
    const [appointments, setAppointments] = useState([])
    const [dashdata, setdashdata] = useState(false)
    const [profiledata, setprofiledata] = useState(false)

    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/appointment', { headers: { dToken } })
            if (data.success) {
                console.log(data.appointment)
                setAppointments(data.appointment)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }

    }

    const completeappointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/complete-appointment', { appointmentId }, { headers: { dToken } })
            if(data.success){
                toast.success(data.message)
                getAllAppointments()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    const cancelappointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/cancel-appointment', { appointmentId }, { headers: { dToken } })
            if(data.success){
                toast.success(data.message)
                getAllAppointments()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getdashdata = async () => {
         try {
            const { data } = await axios.get(backendUrl + '/api/doctor/dashboard', { headers: { dToken } })
            if(data.success){
                setdashdata(data.dashdata)
                console.log(data.dashdata)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getprofiledata = async () => {
        try {
             const { data } = await axios.get(backendUrl + '/api/doctor/profile', { headers: { dToken } })
            if(data.success){
                setprofiledata(data.profiledata)
                console.log(data.profiledata)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const updateprofiledata = async () => {
        
    }

    const value = {
        backendUrl,
        dToken, setdToken,
        setAppointments,
        getAllAppointments, appointments,
        cancelappointment,completeappointment,
        getdashdata,dashdata,setdashdata,
        getprofiledata,profiledata,setprofiledata,

    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider