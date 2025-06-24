import React, { useEffect } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

function Appointments() {

  const { getAllAppointments, aToken, appointments, cancelappointment } = useContext(AdminContext)
  const { calculateAge } = useContext(AppContext)
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotdatef = (slotDate) => {
    const date = (slotDate && typeof slotDate === 'string') ? slotDate.split('_') : ["", "0", ""]
    return date[0] + " " + months[Number(date[1])] + " " + date[2]
  }

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
      console.log(appointments)
    }
  }, [aToken])

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
              <th className="py-3 px-4 text-left">Doctor</th>
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
                  <span>{item.userData.name}</span>
                </td>
                <td className="py-3 px-4">{calculateAge(item.userData.dob)}</td>
                <td className="py-3 px-4">{slotdatef(item.slotDate)}, {item.slotTime}</td>
                <td className="py-3 px-4 flex items-center gap-2">
                  <img src={item.docData.image} alt="" className="w-8 h-8 rounded-full object-cover" />
                  <span>{item.docData.name}</span>
                </td>
                <td className="py-3 px-4 font-semibold text-green-600">$ {item.amount}</td>
                <td className="py-3 px-4">
                  {item.cancelled ? (
                    <span className="text-red-500 font-semibold">Cancelled</span>
                  ) : item.isCompleted ? <p className='text-green-400 text-xs font-medium'>Completed</p>
                    : (
                      <img onClick={() => cancelappointment(item._id)}
                        className="w-8 h-8 cursor-pointer hover:scale-110 transition"
                        src={assets.cancel_icon}
                        alt="Cancel"
                      />
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

}

export default Appointments
