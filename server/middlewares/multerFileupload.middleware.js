import multer from 'multer'; 
import {v4 as uuid} from 'uuid' ; 


const storage = multer.diskStorage( { 

    // diskstoragr basically takes two functions : 

    // destination : 
    destination : (req, file, cb) => { 
        cb(null, './public/uploads'); 
    }, 
    // filename :
    filename : (req, file, cb) => { 
        let randomChars = uuid() ; 
        cb(null , file.originalname + " " + randomChars)
    }
}); 


const multerFileUpload = multer({storage}); 
export default multerFileUpload; 