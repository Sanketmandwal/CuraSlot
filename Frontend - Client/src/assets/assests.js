import logo from './logo.svg'
import Gastroenterologist  from './Gastroenterologist.svg'
import dropdown from './dropdown.svg'
import profile_pic from './profile_pic.svg'
import profile_pic1 from './profile_pic1.png'
import grppro from './group_profiles.png'
import doctorh from './doc-header-img.png'
import arrow_icon from './arrow_icon.svg'
import General_Physician from './General_physician.svg'
import Dermatologist from './Dermatologist.svg'
import GastroenterologistSpe from './GastroenterologistSpe.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import appointmentimg from './appointment-doc-img.png'
import verified from './Verified.png'
import abouticon from './about-icon.png'
import about_img from './about_image.png'
import contact_img from './contact_image.png'
import menuicon from './menu_icon.svg'
import closeicon from './close_icon.svg'

const assets = {
    logo,
    Gastroenterologist,
    dropdown,
    grppro,
    profile_pic,
    doctorh,
    arrow_icon,
    GastroenterologistSpe,
    Dermatologist,
    General_Physician,
    Gynecologist,
    Neurologist,
    Pediatricians,
    doc1,
    doc2,
    doc3,
    doc4,doc5,doc6,doc7,doc8,doc9,
    doc10,
    appointmentimg,
    verified,
    abouticon,
    about_img,
    contact_img,
    profile_pic1,
    menuicon,
    closeicon,
};

export default assets;

export const specialityData =[
    {
        speciality : 'General Physician',
        image : General_Physician,
    },
    
    {
        speciality : 'Gastroenterologist',
        image : GastroenterologistSpe,
    },
    
    {
        speciality : 'Dermatologist',
        image : Dermatologist,
    },
    
    {
        speciality : 'Neurologist',
        image : Neurologist,
    },
    
    {
        speciality : 'Pediatricians',
        image : Pediatricians,
    },
    
    {
        speciality : 'Gynecologist',
        image : Gynecologist,
    },
    
]

export const doctors = [
    {
        _id: 'doc1',
        name: "Dr. Rohit Sharma",
        image: doc1,
        speciality: 'General Physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Rohit Sharma is a dedicated general physician with a passion for preventive healthcare. He believes in patient-centered care and clear communication.',
        fees: 50,
        address: {
            line1: '45th street Eden Garden',
            line2: 'Mumbai Maharashtra'
        }
    },
    {
        _id: 'doc2',
        name: "Dr. Priya Verma",
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MD (Gynecology)',
        experience: '7 Years',
        about: 'Dr. Priya Verma specializes in women’s health and reproductive medicine. She is known for her compassionate approach and expertise in gynecological surgeries.',
        fees: 60,
        address: {
            line1: '12 Lotus Avenue',
            line2: 'Delhi'
        }
    },
    {
        _id: 'doc3',
        name: "Dr. Anil Kumar",
        image: doc3,
        speciality: 'Pediatricians',
        degree: 'MD (Pediatrics)',
        experience: '5 Years',
        about: 'Dr. Anil Kumar is a caring pediatrician who focuses on child wellness and development. He is committed to providing friendly and effective care for children.',
        fees: 55,
        address: {
            line1: '88 Green Park',
            line2: 'Bangalore'
        }
    },
    {
        _id: 'doc4',
        name: "Dr. Sneha Patil",
        image: doc4,
        speciality: 'Dermatologist',
        degree: 'MD (Dermatology)',
        experience: '6 Years',
        about: 'Dr. Sneha Patil has expertise in treating various skin conditions and cosmetic dermatology. She emphasizes holistic skin care and patient education.',
        fees: 65,
        address: {
            line1: '23 Rose Villa',
            line2: 'Pune'
        }
    },
    {
        _id: 'doc5',
        name: "Dr. Rajesh Gupta",
        image: doc5,
        speciality: 'Neurologist',
        degree: 'DM (Neurology)',
        experience: '8 Years',
        about: 'Dr. Rajesh Gupta is a skilled neurologist with experience in treating complex neurological disorders. He is dedicated to advancing neurological care.',
        fees: 80,
        address: {
            line1: '56 Maple Residency',
            line2: 'Chennai'
        }
    },
    {
        _id: 'doc6',
        name: "Dr. Meera Joshi",
        image: doc6,
        speciality: 'Gastroenterologist',
        degree: 'DM (Gastroenterology)',
        experience: '9 Years',
        about: 'Dr. Meera Joshi specializes in digestive health and liver diseases. She is known for her thorough diagnosis and patient-friendly consultations.',
        fees: 75,
        address: {
            line1: '101 Sunrise Apartments',
            line2: 'Hyderabad'
        }
    },
    {
        _id: 'doc7',
        name: "Dr. Amit Singh",
        image: doc7,
        speciality: 'General Physician',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Amit Singh provides comprehensive primary care and focuses on preventive medicine. He is approachable and attentive to patient needs.',
        fees: 45,
        address: {
            line1: '77 Lake View',
            line2: 'Kolkata'
        }
    },
    {
        _id: 'doc8',
        name: "Dr. Kavita Rao",
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MD (Gynecology)',
        experience: '10 Years',
        about: 'Dr. Kavita Rao is an experienced gynecologist with a special interest in high-risk pregnancies. She is committed to women’s health and well-being.',
        fees: 70,
        address: {
            line1: '34 Blossom Street',
            line2: 'Ahmedabad'
        }
    },
    {
        _id: 'doc9',
        name: "Dr. Suresh Nair",
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MD (Dermatology)',
        experience: '4 Years',
        about: 'Dr. Suresh Nair offers advanced treatments for skin, hair, and nail disorders. He believes in personalized care and patient satisfaction.',
        fees: 60,
        address: {
            line1: '19 Palm Grove',
            line2: 'Kochi'
        }
    },
    {
        _id: 'doc10',
        name: "Dr. Ritu Malhotra",
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MD (Pediatrics)',
        experience: '6 Years',
        about: 'Dr. Ritu Malhotra is passionate about child health and preventive pediatrics. She is known for her friendly demeanor and effective communication with parents.',
        fees: 58,
        address: {
            line1: '65 Harmony Towers',
            line2: 'Jaipur'
        }
    }
];