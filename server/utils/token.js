import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv'; 
dotenv.config(); 


const generateToken = async (userId, res) => {
    try {
        const token = await jwt.sign({userId}, process.env.JWT_TOKEN, {expiresIn: '7d'});

        res.cookie('token', token, {
            maxAge : 60 * 60 * 1000,
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'lax'
        });
    } catch (error) {
       console.log(`Could not generte token, ${error}`);
    }
};

export default generateToken;