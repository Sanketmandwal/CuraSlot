import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'

const DoctorDashboard = () => {

  const { getdashdata, dashdata, dToken, cancelappointment, completeappointment } = useContext(DoctorContext)
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotdatef = (slotDate) => {
    const date = (slotDate && typeof slotDate === 'string') ? slotDate.split('_') : ["", "0", ""]
    return date[0] + " " + months[Number(date[1])] + " " + date[2]
  }

  useEffect(() => {
    if (dToken) {
      getdashdata()
    }
  }, [dToken])

  return dashdata && (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="flex items-center bg-white rounded-lg shadow p-5">
          <img src={assets.earning_icon} alt="" className="w-12 h-12 mr-4" />
          <div>
            <p className="text-2xl font-bold text-blue-600">$ {dashdata.earning}</p>
            <p className="text-gray-500">Earnings</p>
          </div>
        </div>
        <div className="flex items-center bg-white rounded-lg shadow p-5">
          <img src={assets.appointment_icon} alt="" className="w-12 h-12 mr-4" />
          <div>
            <p className="text-2xl font-bold text-green-600">{dashdata.appointment}</p>
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
            dashdata.latestAppointment.map((item, index) => (
              <div key={index} className="flex items-center py-4">
                <img src={item.userData.image} alt="" className="w-12 h-12 rounded-full object-cover mr-4 border" />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.userData.name}</p>
                  <p className="text-gray-500 text-sm">{slotdatef(item.slotDate)}</p>
                </div>
                {
                  item.cancelled ? <p className="py-3 px-4  text-red-600">Cancelled</p>
                    : item.isCompleted ? <p className="py-3 px-4  text-green-600">Completed</p>
                      : <p className="py-3 px-4 flex">
                        <img onClick={() => cancelappointment(item._id)} src={assets.cancel_icon} alt="" className="w-10 cursor-pointer" />
                        <img onClick={() => completeappointment(item._id)} src={assets.tick_icon} alt="" className="w-10 cursor-pointer" />
                      </p>
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard
