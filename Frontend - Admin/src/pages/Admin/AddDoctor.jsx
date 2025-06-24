import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddDoctor() {
    const [docImg, setDocImg] = useState(false)
    const [Name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [Experience, setExperience] = useState('1')
    const [Speciality, setSpeciality] = useState('General Physician')
    const [Fees, setFees] = useState(0)
    const [About, setAbout] = useState('')
    const [degree, setDegree] = useState('')
    const [license, setLicense] = useState('')
    const [address1, setaddress1] = useState('')
    const [address2, setaddress2] = useState('')

    const { backendUrl, aToken } = useContext(AdminContext)

    const HandleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (!docImg) {
                return toast.error('Image Not Selected')
            }

            const formdata = new FormData()
            formdata.append('image', docImg)
            formdata.append('name', Name)
            formdata.append('email', email)
            formdata.append('password', password)
            formdata.append('experience', Experience)
            formdata.append('speciality', Speciality)
            formdata.append('fees', Number(Fees))
            formdata.append('about', About)
            formdata.append('degree', degree)
            formdata.append('address', JSON.stringify({ line1: address1, line2: address2 }))

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formdata, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                setName('');
                setEmail('');
                setPassword('');
                setExperience('1');
                setSpeciality('General Physician');
                setFees(0);
                setAbout('');
                setDegree('');
                setLicense('');
                setaddress1('');
                setaddress2('');
                setDocImg(false);
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error.message)
        }

    }

    return (
        <div className="m-auto min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100 p-4">
            <form action="" onSubmit={HandleSubmit}>
                <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        {/* Left Panel - Doctor Image */}
                        <div className="md:w-1/3 bg-blue-600 p-8 flex flex-col items-center justify-center">
                            <div className="mb-8 text-center">
                                <h1 className="text-3xl font-bold text-white mb-2">Add New Doctor</h1>
                                <p className="text-blue-100">Complete all fields to add a new doctor profile</p>
                            </div>

                            <div className="relative mb-6">
                                <label
                                    htmlFor="doc-img"
                                    className="cursor-pointer group"
                                >
                                    <div className="w-64 h-64 rounded-full bg-blue-500 border-4 border-blue-400 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-white">
                                        <img
                                            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                                            alt="Upload area"
                                            className="w-32 h-32 opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                                        />
                                    </div>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                    </div>
                                </label>
                                <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" className="hidden" />
                            </div>

                            <p className="text-white text-center text-lg font-medium">
                                Upload Doctor Photo<br />
                                <span className="text-sm text-blue-200">(JPG or PNG, max 5MB)</span>
                            </p>
                        </div>

                        {/* Right Panel - Form Fields */}
                        <div className="md:w-2/3 p-8 overflow-auto max-h-screen">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Row 1 */}
                                <div className="md:col-span-2">
                                    <h2 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h2>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Doctor Name</label>
                                    <input
                                        type="text"
                                        placeholder="Dr. John Smith"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                        value={Name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Doctor Email</label>
                                    <input
                                        type="email"
                                        placeholder="doctor@example.com"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Password</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Experience</label>
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                                        value={Experience}
                                        onChange={e => setExperience(e.target.value)}
                                    >
                                        {[...Array(10)].map((_, i) => (
                                            <option key={i + 1} value={i + 1}>{i + 1} Year{i + 1 > 1 ? 's' : ''}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Row 2 */}
                                <div className="md:col-span-2 mt-4">
                                    <h2 className="text-xl font-bold text-gray-800 mb-4">Professional Details</h2>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Fees ($)</label>
                                    <input
                                        type="number"
                                        placeholder="Consultation fee"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                        value={Fees}
                                        onChange={e => setFees(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Speciality</label>
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                                        value={Speciality}
                                        onChange={e => setSpeciality(e.target.value)}
                                    >
                                        <option value="General Physician">General Physician</option>
                                        <option value="Gynecologist">Gynecologist</option>
                                        <option value="Dermatologist">Dermatologist</option>
                                        <option value="Pediatrician">Pediatrician</option>
                                        <option value="Neurologist">Neurologist</option>
                                        <option value="Gastroenterologist">Gastroenterologist</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Degree</label>
                                    <input
                                        type="text"
                                        placeholder="Medical degree"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                        value={degree}
                                        onChange={e => setDegree(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">License Number</label>
                                    <input
                                        type="text"
                                        placeholder="Medical license"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                        value={license}
                                        onChange={e => setLicense(e.target.value)}
                                    />
                                </div>

                                {/* Row 3 */}
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 font-medium mb-2">Address</label>
                                    <input
                                        type="text"
                                        placeholder="Street address"
                                        className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                        value={address1}
                                        onChange={e => setaddress1(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="City, State, ZIP"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        value={address2}
                                        onChange={e => setaddress2(e.target.value)}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 font-medium mb-2">About Me</label>
                                    <textarea
                                        placeholder="Professional bio, qualifications, and specialties..."
                                        rows="3"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                        value={About}
                                        onChange={e => setAbout(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="md:col-span-2 mt-6">
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        Add Doctor Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddDoctor;