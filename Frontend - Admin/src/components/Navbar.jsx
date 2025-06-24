import React, { useContext } from 'react'
import { assets } from "../assets/assets.js";
import { AdminContext } from '../context/AdminContext.jsx';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext.jsx';

function Navbar() {
    const { aToken, setAToken } = useContext(AdminContext);
    const { dToken, setdToken } = useContext(DoctorContext);
    const navigate = useNavigate()
    const logout = () => {
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
        dToken && setdToken('')
        dToken && localStorage.removeItem('dToken')
    }

    return (
        <div className="bg-white shadow-md px-4 sm:px-10 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
                <img className="w-32 cursor-pointer" src={assets.logo} alt="" />
                <p className="text-sm rounded-full border border-gray-500 px-2.5 py-0.5 font-semibold text-gray-700">{aToken ? 'Admin' : 'Doctor'}</p>
            </div>
            <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full transition font-medium">
                Logout
            </button>
        </div>
    )
}

export default Navbar
