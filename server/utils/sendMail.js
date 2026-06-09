import transport from "../configs/nodemailer.config.js";
import dotenv from 'dotenv'
dotenv.config()





const sendOTP = async(userEmail, otp) => {

    try {
        const sendmail = await transport.sendMail({
            from : process.env.USER_APP_USER,
            to : userEmail,
            subject : 'Verify your account',
            html: `<p>Your OTP is <b>${otp}</b>. Expires in <span style="color:red;">5 min</span></p>`
    })

    return sendmail;
    } catch (error) {
        console.log(`Could not send mail, ${error}`);
        throw error;
    }
};
export {sendOTP};