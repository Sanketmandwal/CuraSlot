import {v2 as cloudinary} from 'cloudinary'

const connectCloudinary = async () => {
    cloudinary.config({
        secure:true,
        cloud_name : process.env.CLOUDINARY_NAME,
        api_key : process.env.CLOUDINARY_API_KEY,
        api_secret : process.env.CLOUDINARY_SECRET_KEY,
    })
}
console.log(connectCloudinary())

export default connectCloudinary