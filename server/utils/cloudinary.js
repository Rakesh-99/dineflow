import {v2 as cloudinary} from 'cloudinary'; 
import dotenv from 'dotenv' ; 
dotenv.config(); 
import fs from 'fs'; 




  // cloudinaruy configs : 
    cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
    }); 

// cloudinary image uploader fn() : 
export const uploadOnCloudinary = async (file) => { 

    // cloudinary api call with file : 
    try {
        const response  = await cloudinary.uploader.upload(file, {resource_type : "auto"}); 
        if(response) { 
            fs.unlinkSync(file) ; // here i am deleteing the file from the local system : 
            return {
                "url" : response.secure_url,
                "public_id" : response.public_id,
                "resource_type" : response.resource_type
            } 
        }
    } catch (error) {
        console.log(`An unexpected error occurred while uploading file on server -> ${error}`);
        fs.unlinkSync(file) ; 
        return null ;
    }
}; 


export const deleteAssestFromCloudinary = async(publicIds) => { 
    try {
        let response ; 
       for(let publicId of publicIds) { 
            response = await cloudinary.uploader.destroy(publicId, {resource_type: "image"})
       }; 
       return true; 
    } catch (error) {
        console.log(`Could not delete assest from cloudinary!`, error);
        return null; 
    }
}
