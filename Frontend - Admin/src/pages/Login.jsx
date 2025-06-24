import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'



function Login() {
    const [state, setState] = useState('Admin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { setAToken, backendUrl } = useContext(AdminContext)
    const { dToken, setdToken } = useContext(DoctorContext)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (state == 'Admin') {
                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
                if (data.success) {
                    localStorage.setItem('aToken', data.token)
                    setAToken(data.token)
                }
                else {
                    toast.error(data.message)
                }
            }
            else {
                const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
                if (data.success) {
                    localStorage.setItem('dToken', data.token)
                    setdToken(data.token)
                }
                else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            <div style={{ animation: 'slideInFromLeft 1s ease-out' }} className="max-w-md w-full  rounded-xl shadow-2xl overflow-hidden p-8 space-y-8 mt-20 m-auto mb-28">
                <h2 style={{ animation: 'appear 2s ease-out' }} className="text-center text-4xl font-extrabold text-black">
                    Welcome
                </h2>
                <p className="text-center text-2xl font-bold text-blue-600"><span>{state} </span> Login</p>
                <form method="POST" onSubmit={handleSubmit} action="#" className="space-y-6">
                    <div className="relative">
                        <input
                            placeholder="john@example.com"
                            className="peer h-10 w-full border-b-2 border-black bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                            required
                            id="email"
                            name="email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <label className="absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm" htmlFor="email">Email address</label>
                    </div>
                    <div className="relative">
                        <input
                            placeholder="Password"
                            className="peer h-10 w-full border-b-2 border-black  bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                            required
                            id="password"
                            name="password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <label className="absolute left-0 -top-3.5 text-black text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm" htmlFor="password">Password</label>
                    </div>
                    <div className="flex items-center justify-between">
                        {
                            state === 'Admin' ?
                                <p className="flex items-center text-sm text-black hover:underline cursor-pointer  hover:text-blue-900">Doctor Login? <span onClick={() => setState('Doctor')}> Click Here</span></p>
                                : <p className="flex items-center text-sm text-black cursor-pointer hover:underline hover:text-blue-900">Admin Login? <span onClick={() => setState('Admin')}> Click Here</span></p>
                        }
                        <a className="flex items-center text-sm text-black hover:underline" href="#">Forgot your password?</a>
                    </div>
                    <button className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200" type="submit">
                        Login
                    </button>
                </form>
            </div>
        </>
    )
}

export default Login
