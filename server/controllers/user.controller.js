import asyncErrorHandler from 'express-async-handler'; 
import ErrorHandler from '../utils/ErrorHandler.js';
import userModel from '../models/user.model.js';





// get current user : 
export const getCurrentUser = asyncErrorHandler(async(req, res, next) => {
    
    const userId = req.userId ;     
    console.log(userId);
    
    
    if(!userId) { 
        return next(new ErrorHandler(404, 'User not found !')); 
    }; 

    const user = await userModel.findById(userId).select('-password -otp -otpExpiration')
    
    if(!user) { 
        return next(new ErrorHandler(404, 'User not found!')); 
    }
    
    return res.status(200).json({
        success : true, 
        message : 'User has been fetched', 
        user 
    })
}); 