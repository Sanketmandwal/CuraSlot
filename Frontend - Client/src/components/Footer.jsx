import React from 'react'
import assets from '../assets/assests'
import { useNavigate } from 'react-router-dom'

function Footer() {
    const navigate=useNavigate()
    return (
        <footer className="bottom-0">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-10">
                <div className="md:w-1/3">
                    <img src={assets.logo} alt="Logo" className="h-16 mb-4" />
                    <p className="text-sm">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>

                {/* Company Links */}
                <div className="md:w-1/4">
                    <p className="font-semibold mb-4 text-lg">COMPANY</p>
                    <ul className="space-y-2">
                        <li onClick={()=>{navigate('/'); scrollTo(0,0);}}  className="hover:text-blue-400 cursor-pointer transition">Home</li>
                        <li onClick={()=>navigate('/about')} className="hover:text-blue-400 cursor-pointer transition">About Us</li>
                        <li onClick={()=>navigate('/contact')} className="hover:text-blue-400 cursor-pointer transition">Contact Us</li>
                        <li className="hover:text-blue-400 cursor-pointer transition">Privacy Policy</li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="md:w-1/4">
                    <p className="font-semibold mb-4 text-lg">GET IN TOUCH</p>
                    <ul className="space-y-2">
                        <li className="hover:text-blue-400 transition">+919561590442</li>
                        <li className="hover:text-blue-400 transition">sanketmandwal2@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} CuraSlot. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
