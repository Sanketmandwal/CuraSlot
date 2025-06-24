import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import assets from '../assets/assests'
import { RelatedDoctors } from '../components'
import { toast } from 'react-toastify'
import axios from 'axios'



function Appointment() {

  const { docId } = useParams()
  const { doctors, getDoctorsData, token, backendUrl } = useContext(AppContext)
  const daysofweek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const [docInfo, setdocInfo] = useState();
  const [docSlots, setdocSlots] = useState([]);
  const [slotIndex, setslotIndex] = useState(0)
  const [slotTime, setslotTime] = useState('')
  const navigate = useNavigate()

  const bookappointment = async () => {
    if (!token) {
      toast.warn('Login To BOOK APPOINTMENT')
      navigate('/login')
    }

    try {
      const date = docSlots[slotIndex][0].datetime
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year

      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchDocInfo = async () => {
    if (Array.isArray(doctors)) {
      const docInfo = doctors.find(doc => doc._id === docId);
      setdocInfo(docInfo);
    } else {
      setdocInfo(undefined);
      console.warn('doctors is undefined or not an array');
    }
  }
  const getAvailableSlots = async () => {
    let today = new Date();
    let allSlots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // Always set hours/minutes for currentDate before slot generation
      if (i === 0) {
        // For today, set to next available half hour slot >= now, but not past 21:00
        let now = new Date();
        let nextSlot = new Date(now);
        nextSlot.setSeconds(0, 0);
        if (now.getMinutes() < 30) {
          nextSlot.setMinutes(30);
        } else {
          nextSlot.setHours(now.getHours() + 1, 0, 0, 0);
        }
        // If nextSlot is before 10:00, set to 10:00
        if (nextSlot.getHours() < 10) {
          nextSlot.setHours(10, 0, 0, 0);
        }
        // If nextSlot is after 21:00, skip today
        if (nextSlot.getHours() >= 21) {
          allSlots.push([]);
          continue;
        }
        currentDate = nextSlot;
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {

        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = day + "_" + month + "_" + year
        const slotTime = formattedTime

        const isSLotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        if (isSLotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push(timeSlots);
    }
    setdocSlots(allSlots);
  }

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo])


  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    console.log(docSlots)
  }, [docSlots])

  return docInfo && (
    <div >

      <div className='flex flex-col sm:flex-row gap-4' >
        <div>
          <img className='bg-primary rounded sm:max-w-72 object-cover w-44 h-27' src={docInfo.image} alt="" />
        </div>

        <div className='flex-1 border border-gray-600 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900' >{docInfo.name} <img src={assets.verified} alt="" /></p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>

          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.abouticon} alt="" /></p>
            <p className='text-gray-500 text-sm max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-1'>
            Appointment Fees : <span className='text-gray-600'>${docInfo.fees}</span>
          </p>
        </div>
      </div>

      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex items-center w-full overflow-x-scroll mt-4 gap-3 '>
          {
            docSlots.length && docSlots.map((item, index) => (
              <div onClick={() => setslotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
                <p>{item[0] && daysofweek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className='flex items-center w-full overflow-x-scroll mt-4 gap-3 '>
          {
            docSlots.length > 0 && docSlots[slotIndex] && docSlots[slotIndex].map((slot, index) => (
              <p
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer  ${slot.time === slotTime ? 'bg-primary text-white' : 'border border-gray-200'}`}
                key={index}
                onClick={() => setslotTime(slot.time)}
              >
                {slot.time}
              </p>
            ))
          }
        </div>

        <button onClick={bookappointment} className='bg-primary text-white font-light text-sm px-14 py-3 rounded-full my-6'>Book An Appointment</button>

      </div>

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />

    </div>
  )
}

export default Appointment
