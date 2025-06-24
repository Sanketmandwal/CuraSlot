import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function MyAppointments() {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const navigate = useNavigate()

  const [appointments, setAppointments] = useState([])

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotdatef = (slotDate) => {
    const date = (slotDate && typeof slotDate === 'string') ? slotDate.split('_') : ["", "0", ""]
    return date[0] + " " + months[Number(date[1])] + " " + date[2]
  }

  const getuserappointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/list-appointment', { headers: { token } })

      if (data.success) {
        const reversedAppointments = data.appointments.reverse()
        setAppointments(reversedAppointments)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const initPay = (order) => {

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)

        try {
          const { data } = await axios.post(backendUrl + '/api/user/verifyrazorpay',  response , { headers: { token } })
          if(data.success){
            toast.success(data.message)
            getuserappointments()
            navigate('/my-appointments')
          }
        } catch (error) {
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentrazorpay = async (appointmentId) => {

    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })

      if (data.success) {
        initPay(data.order)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const cancelappointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getuserappointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) getuserappointments()
  }, [token])

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">My Appointments</h2>
        <div className="space-y-6">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row items-center p-6 gap-6 hover:shadow-2xl transition-shadow"
            >
              <div className="flex-shrink-0">
                <img
                  src={item.docData.image}
                  alt={item.docData.name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-blue-100"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/112?text=No+Image'; }}
                />
              </div>
              <div className="flex-1">
                <p className="text-xl font-semibold text-gray-900">{item.docData.name}</p>
                <p className="text-blue-600 font-medium">{item.docData.speciality}</p>
                <div className="mt-2 text-gray-600">
                  <p className="font-semibold">Address:</p>
                  <p>{item.docData.address.line1}</p>
                  <p>{item.docData.address.line2}</p>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  <span className="font-semibold text-gray-700">Date & Time:</span> {slotdatef(item.slotDate)} | {item.slotTime}
                </p>
              </div>
              <div className="flex flex-col gap-3 mt-4 md:mt-0">
                {!item.cancelled && item.payment && !item.isCompleted && <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition">Paid</button>}
                {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={() => appointmentrazorpay(item._id)} className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition">
                  Pay Online
                </button>}
                {!item.cancelled && !item.isCompleted && <button onClick={() => cancelappointment(item._id)} className="bg-red-100 text-red-600 px-5 py-2 rounded-lg font-semibold shadow hover:bg-red-200 transition">
                  Cancel Appointment
                </button>}
                {item.cancelled && !item.isCompleted && <button className="bg-red-100 text-red-600 px-5 py-2 rounded-lg font-semibold shadow hover:bg-red-200 transition">Appointment Cancelled</button>}
                {item.isCompleted && <button className="bg-red-100 text-red-600 px-5 py-2 rounded-lg font-semibold shadow hover:bg-red-200 transition">Appointment Completed</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyAppointments
