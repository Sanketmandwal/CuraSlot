import React from 'react'
import { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

function DoctorsList() {
  const { aToken, doctors, getAllDoctors,changeavailablity } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">All Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg  hover:bg-blue-400 transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-gray-200"
            />
            <div className="text-center">
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-gray-500 mb-2">{item.speciality}</p>
              <div className="flex items-center justify-center space-x-2">
                <input
                  type="checkbox"
                  checked={item.available}
                  readOnly
                  className="form-checkbox accent-blue-800"
                  onChange={()=>changeavailablity(item._id)}
                />
                <p className="text-sm">{item.available ? 'Available' : 'Unavailable'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList
