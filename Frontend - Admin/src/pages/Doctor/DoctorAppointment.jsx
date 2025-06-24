import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointment = () => {

    const { getAllAppointments, setAppointments, appointments, dToken, cancelappointment, completeappointment } = useContext(DoctorContext)
    const { calculateAge } = useContext(AppContext)
    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const slotdatef = (slotDate) => {
        const date = (slotDate && typeof slotDate === 'string') ? slotDate.split('_') : ["", "0", ""]
        return date[0] + " " + months[Number(date[1])] + " " + date[2]
    }
    useEffect(() => {
        if (dToken) {
            getAllAppointments()
        }
    }, [dToken])

    return (
        <div className="p-6 w-full">
            <h2 className="text-2xl font-bold mb-6">All Appointments</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow">
                    <thead>
                        <tr className="bg-blue-100 text-gray-700">
                            <th className="py-3 px-4 text-left">#</th>
                            <th className="py-3 px-4 text-left">Patient</th>
                            <th className="py-3 px-4 text-left">Age</th>
                            <th className="py-3 px-4 text-left">Date & Time</th>
                            <th className="py-3 px-4 text-left">Payment</th>
                            <th className="py-3 px-4 text-left">Fee</th>
                            <th className="py-3 px-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.reverse().map((item, index) => (
                            <tr key={index} className="border-b hover:bg-blue-50 transition">
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4 flex items-center gap-2">
                                    <img src={item.userData.image} alt="" className="w-8 h-8 rounded-full object-cover" />
                                    <span className="font-medium text-gray-800">{item.userData.name}</span>
                                </td>
                                <td className="py-3 px-4">{calculateAge(item.userData.dob)}</td>
                                <td className="py-3 px-4">{slotdatef(item.slotDate)}, {item.slotTime}</td>
                                <td className="py-3 px-4 flex items-center gap-2">
                                    <span className={item.payment ? "px-2 py-1 rounded bg-green-100 text-green-700 font-semibold" : "px-2 py-1 rounded bg-red-100 text-red-700 font-semibold"}>
                                        {(item.payment) ? "Online" : "Cash"}
                                    </span>
                                </td>
                                <td className="py-3 px-4 font-semibold text-green-600 ">$ {item.amount}</td>
                                {
                                    item.cancelled ? <p className="py-3 px-4  text-red-600">Cancelled</p>
                                        : item.isCompleted ? <p className="py-3 px-4  text-green-600">Completed</p>
                                            : <td className="py-3 px-4 flex">
                                                <img onClick={() => cancelappointment(item._id)} src={assets.cancel_icon} alt="" className="w-10 cursor-pointer" />
                                                <img onClick={() => completeappointment(item._id)} src={assets.tick_icon} alt="" className="w-10 cursor-pointer" />
                                            </td>
                                }

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default DoctorAppointment
