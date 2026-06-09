import {v2 as cloudinary} from 'cloudinary'; 
import dotenv from 'dotenv' ; 
dotenv.config(); 
import fs from 'fs'; 

// cloudinary image uploader fn() : 
const uploadOnCloudinary = async (file) => { 


    // cloudinaruy configs : 
    cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
    }); 

    // cloudinary api call with file : 
    try {
        const response  = await cloudinary.uploader.upload(file, {resource_type : "auto"}); 
        if(response) { 
            fs.unlinkSync(file) ; // here i am deleteing the file from the local system : 
            return response.secure_url; 
        }
    } catch (error) {
        console.log(`An unexpected error occurred while uploading file on server -> ${error}`);
        fs.unlinkSync(file) ; 
        return null ;
    }
}; 

export default uploadOnCloudinary; 