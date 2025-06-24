import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'

function DashBoard() {
  const { getdashdata, aToken, dashdata, cancelappointment } = useContext(AdminContext)
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotdatef = (slotDate) => {
    const date = (slotDate && typeof slotDate === 'string') ? slotDate.split('_') : ["", "0", ""]
    return date[0] + " " + months[Number(date[1])] + " " + date[2]
  }
  useEffect(() => {
    if (aToken) {
      getdashdata()
    }
  }, [aToken])

  return dashdata && (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="flex items-center bg-white rounded-lg shadow p-5">
          <img src={assets.doctor_icon} alt="" className="w-12 h-12 mr-4" />
          <div>
            <p className="text-2xl font-bold text-blue-600">{dashdata.doctors}</p>
            <p className="text-gray-500">Doctors</p>
          </div>
        </div>
        <div className="flex items-center bg-white rounded-lg shadow p-5">
          <img src={assets.appointment_icon} alt="" className="w-12 h-12 mr-4" />
          <div>
            <p className="text-2xl font-bold text-green-600">{dashdata.appointments}</p>
            <p className="text-gray-500">Appointments</p>
          </div>
        </div>
        <div className="flex items-center bg-white rounded-lg shadow p-5">
          <img src={assets.patients_icon} alt="" className="w-12 h-12 mr-4" />
          <div>
            <p className="text-2xl font-bold text-purple-600">{dashdata.patients}</p>
            <p className="text-gray-500">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <img src={assets.list_icon} alt="" className="w-6 h-6 mr-2" />
          <p className="text-lg font-semibold text-gray-700">Latest Bookings</p>
        </div>
        <div className="divide-y">
          {
            dashdata.latestAppointments.map((item, index) => (
              <div key={index} className="flex items-center py-4">
                <img src={item.docData.image} alt="" className="w-12 h-12 rounded-full object-cover mr-4 border" />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.docData.name}</p>
                  <p className="text-gray-500 text-sm">{slotdatef(item.slotDate)}</p>
                </div>
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
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default DashBoard
