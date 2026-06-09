import {createTransport} from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config();



// nodemailer transport : 

const transport = createTransport({
    host : `smtp.gmail.com`,
    secure : false,
    port : 587,
    auth : {
        user : process.env.USER_APP_USER,
        pass : process.env.USER_APP_PASSWORD
    }
}); 

export default transport; 