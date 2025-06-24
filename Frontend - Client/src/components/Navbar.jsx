import { React, useState } from 'react'
import assets from '../assets/assests'
import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function Navbar() {
    const [showMenu, setShowMenu] = useState(true)

    const { token, setToken,userData } = useContext(AppContext)

    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
    }

    const navigate = useNavigate();
    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
            <img onClick={() => navigate('/')} className='w-28 cursor-pointer' src={assets.logo} alt="Logo" />
            <ul className='hidden md:flex items-start gap-7 font-medium py-2'>
                <NavLink to={'/'}>
                    <li className='py-1'>Home</li>
                    <hr className='outline-none border-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to={'/doctors'}>
                    <li className='py-1'>All Doctors</li>
                    <hr className='outline-none border-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to={'/about'}>
                    <li className='py-1'>About</li>
                    <hr className='outline-none border-none h-0.5 bg-primary w-3/5 m-auto hidden ' />
                </NavLink>
                <NavLink to={'/contact'}>
                    <li className='py-1'>Contact</li>
                    <hr className='outline-none border-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-4'>
                {token
                    ? <div className='flex items-center group relative gap-2 cursor-pointer'>
                        <img src={userData.image} className='w-8 rounded-full' alt="" />
                        <img src={assets.dropdown} className='w-2.5' alt="" />
                        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                            <div className='min-w-48 bg-stone-100 flex flex-col gap-4 p-4'>
                                <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                                <p onClick={() => navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                            </div>
                        </div>
                    </div>
                    : <> <button onClick={() => { navigate('/login') }} className='bg-primary rounded-full text-white text-sm px-8 py-3'>Login</button>
                        <button onClick={() => { navigate('/signup') }} className='bg-primary rounded-full text-white text-sm px-8 py-3'>Create Account</button>
                    </>
                }
                <img
                    onClick={() => setShowMenu(true)}
                    src={assets.menuicon}
                    className='w-6 md:hidden cursor-pointer transition-transform duration-200 hover:scale-110'
                    alt=""
                />
                {/* Mobile Menu */}
                <div
                    className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
                    ${showMenu ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col`}
                    style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
                >
                    <div className='flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-primary to-blue-400'>
                        <img src={assets.logo} className='w-24' alt="" />
                        <img
                            onClick={() => setShowMenu(false)}
                            src={assets.closeicon}
                            className='w-7 h-7 cursor-pointer hover:rotate-90 transition-transform duration-200'
                            alt=""
                        />
                    </div>
                    <ul className='flex flex-col gap-6 px-8 py-8 text-lg font-semibold text-gray-700'>
                        <NavLink to={'/'} onClick={() => setShowMenu(false)}>
                            <li className='py-2 px-4 rounded-lg hover:bg-primary hover:text-white transition-colors duration-200'>Home</li>
                        </NavLink>
                        <NavLink to={'/doctors'} onClick={() => setShowMenu(false)}>
                            <li className='py-2 px-4 rounded-lg hover:bg-primary hover:text-white transition-colors duration-200'>All Doctors</li>
                        </NavLink>
                        <NavLink to={'/about'} onClick={() => setShowMenu(false)}>
                            <li className='py-2 px-4 rounded-lg hover:bg-primary hover:text-white transition-colors duration-200'>About Us</li>
                        </NavLink>
                        <NavLink to={'/contact'} onClick={() => setShowMenu(false)}>
                            <li className='py-2 px-4 rounded-lg hover:bg-primary hover:text-white transition-colors duration-200'>Contact Us</li>
                        </NavLink>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
