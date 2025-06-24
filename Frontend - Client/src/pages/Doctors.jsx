import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';


function Doctors() {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate()
  const [showfilter, setshowfilter] = useState(false)

  useEffect(() => {
    if (speciality) {
      const filtered = doctors.filter(item => item.speciality === speciality);
      setFilterDoc(filtered);
    } else {
      setFilterDoc(doctors);
    }
  }, [speciality, doctors]);

  return (
    <>
      <div className='mb-5' >
        <p className='text-gray-600'>Browse through the doctors specialist.</p>
        <div className='flex flex-col items-start gap-5 mt-5 sm:flex-row'>
          <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showfilter ? 'bg-primary text-white' : ''}`} onClick={() => setshowfilter(prev => !prev)}>Filter</button>
          <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showfilter ? 'flex' : 'hidden sm:flex'}`}>
            <p onClick={() => { speciality === 'General Physician' ? navigate('/doctors') : navigate('/doctors/General Physician') }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'General Physician' ? "bg-indigo-100 text-black" : ""}`}>General physician</p>
            <p onClick={() => { speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist') }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gynecologist' ? "bg-indigo-100 text-black" : ""}`}>Gynecologist</p>
            <p onClick={() => { speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist') }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Dermatologist' ? "bg-indigo-100 text-black" : ""}`}>Dermatologist</p>
            <p onClick={() => { speciality === 'Pediatrician' ? navigate('/doctors') : navigate('/doctors/Pediatrician') }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Pediatrician' ? "bg-indigo-100 text-black" : ""}`}>Pediatricians</p>
            <p onClick={() => { speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist') }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Neurologist' ? "bg-indigo-100 text-black" : ""}`}>Neurologist</p>
            <p onClick={() => { speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist') }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Gastroenterologist' ? "bg-indigo-100 text-black" : ""}`}>Gastroenterologist</p>
          </div>
          <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
            {
              filterDoc && filterDoc.map((item, index) => (
                <div onClick={() => navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-3 transition-all duration-500' key={index} >
                  <div className="w-full h-40 bg-blue-50 flex items-center justify-center">
                    <img
                      className="object-cover w-24 h-27"
                      src={item.image}
                      alt=""
                    />
                  </div>
                  <div className='p-4' >
                    <div className={`flex items-center gap-2 text-sm ${item.available ? ' text-green-500' : ' text-red-500'}`} >
                      <p className={`w-2 h-2 ${item.available ? " bg-green-500 rounded-full" : " bg-red-500 rounded-full"}`}></p><p>{item.available ? 'Available' : 'UnAvailable'}</p>
                    </div>
                    <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                    <p className='text-gray-500 text-sm'>{item.speciality}</p>
                  </div>
                </div>
              )
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Doctors
