import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'

export const DoctorProfile = () => {
  const { getprofiledata, profiledata, setprofiledata, dToken, backendUrl } = useContext(DoctorContext)
  const [isEdit, setisEdit] = useState(false)
  useEffect(() => {
    if (dToken) {
      getprofiledata()
    }
  }, [dToken])

  const updateprofile = async () => {
    try {
      const updatedata = {
        address: profiledata.address,
        fees: profiledata.fees,
        available: profiledata.available,
      }

      const { data } = await axios.post(backendUrl + '/api/doctor/updateprofile', updatedata, { headers: { dToken } })

      if (data.success) {
        toast.success(data.message)
        setisEdit(false)
        getprofiledata()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return profiledata && (
    <div className="flex justify-center w-full items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-5xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <img
              src={profiledata.image}
              alt={profiledata.name}
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-300 shadow-md"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{profiledata.name}</h2>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-blue-600 font-semibold">{profiledata.degree}</span>
              <span className="text-gray-500">-</span>
              <span className="text-blue-500">{profiledata.speciality}</span>
              <button className="ml-4 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium shadow">
                {profiledata.experience} yrs
              </button>
            </div>
            <div className="mb-4">
              <p className="font-semibold text-gray-700">About :</p>
              <p className="text-gray-600">{profiledata.about}</p>
            </div>
            <p className="mb-2 text-lg">
              <span className="font-semibold text-gray-700">Appointment Fee :</span>
              <span className="ml-2 text-blue-600 font-bold">$ {isEdit ? <input type='number' onChange={(e) => setprofiledata(prev => ({ ...prev, fees: e.target.value }))} value={profiledata.fees} /> : profiledata.fees}</span>
            </p>
            <div className="mb-4">
              <p className="font-semibold text-gray-700">Address :</p>
              <p className="text-gray-600">{isEdit ? <input type="text" value={profiledata.address.line1} onChange={(e) => setprofiledata(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} /> : profiledata.address.line1}</p>
              <p className="text-gray-600">{isEdit ? <input type="text" value={profiledata.address.line2} onChange={(e) => setprofiledata(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} /> : profiledata.address.line2}</p>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={profiledata.available}
                onChange={() => isEdit && setprofiledata(prev => ({ ...prev, available: !prev.available }))}
                className="form-checkbox h-5 w-5 text-blue-600"
                id="available"
              />
              <label htmlFor="available" className="ml-2 text-blue-700 font-medium">Available</label>
            </div>
            {
              isEdit ? <button onClick={updateprofile} className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold">
                Save
              </button>
                : <button onClick={() => setisEdit(true)} className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold">
                  Edit
                </button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
