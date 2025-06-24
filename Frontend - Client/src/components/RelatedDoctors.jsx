import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

function RelatedDoctors({ speciality, docId }) {
    const { doctors } = useContext(AppContext)
    const [reldoc, setReldoc] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const related = doctors.filter(
                (doc) => doc.speciality === speciality && doc._id !== docId
            )
            setReldoc(related)
        }
    }, [docId, speciality, doctors])

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10' >
            <h1 className='text-3xl font-medium' >Related Doctors</h1>

            <div className='grid grid-cols-auto w-full gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {reldoc.slice(0, 5).map((item, index) => (
                    <div onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-3 transition-all duration-500' key={index} >
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
                ))}
            </div>
            <button onClick={() => { navigate('/doctors'); window.scrollTo(0, 0) }} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:-translate-y-3 transition-all duration-100'>More</button>
        </div>
    )
}

export default RelatedDoctors
