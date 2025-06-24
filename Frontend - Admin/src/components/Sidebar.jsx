import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)
  const {dToken} =useContext(DoctorContext)

  return (
    <div className="h-auto min-h-screen md:h-screen w-64 bg-white shadow-lg flex flex-col py-8 px-4">
      {aToken && (
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-100 text-blue-600 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`
              }
            >
              <img src={assets.home_icon} alt="" className="w-6 h-6" />
              <p>Dashboard</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-appointments"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-100 text-blue-600 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`
              }
            >
              <img src={assets.appointment_icon} alt="" className="w-6 h-6" />
              <p>Appointments</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-doctor"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-100 text-blue-600 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`
              }
            >
              <img src={assets.add_icon} alt="" className="w-6 h-6" />
              <p>Add Doctor</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/doctor-list"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-100 text-blue-600 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`
              }
            >
              <img src={assets.people_icon} alt="" className="w-6 h-6" />
              <p>Doctors List</p>
            </NavLink>
          </li>
        </ul>
      )}
      {dToken && (
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/doctor-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-100 text-blue-600 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`
              }
            >
              <img src={assets.home_icon} alt="" className="w-6 h-6" />
              <p>Dashboard</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/doctor-appointment"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-100 text-blue-600 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`
              }
            >
              <img src={assets.appointment_icon} alt="" className="w-6 h-6" />
              <p>Appointments</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/doctor-profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-100 text-blue-600 font-semibold'
                    : 'hover:bg-gray-100 text-gray-700'
                }`
              }
            >
              <img src={assets.people_icon} alt="" className="w-6 h-6" />
              <p>Doctor Profile</p>
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  )
}

export default Sidebar
