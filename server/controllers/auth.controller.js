import asyncHandler from 'express-async-handler';
import userModel from '../models/user.model.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import bcrypt from 'bcrypt';
import { sendOTP } from '../utils/sendMail.js';
import crypto from 'crypto';
import generateToken from '../utils/token.js';



// signup user : 
export const registerUser = asyncHandler( async(req , res, next) => {
    
    const {fullname, email, contact, password, role} = req.body;

    if(!fullname ||!email || !contact || !password || !role) { 
        return next(new ErrorHandler(400, 'All fields are required!'));
    }
    const user = await userModel.findOne({email});

    if(user){ 
        return next(new ErrorHandler(400, `User is already exist!`)); 
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const genOTP = crypto.randomInt(100000, 1000000).toString(); 
    const otp = await sendOTP(email, genOTP); 
    const hashedOTP = crypto.createHash("sha256").update(genOTP).digest("hex");


    const newUser = new userModel({
        fullname,
        email,
        contact,
        password : hashedPassword, 
        role , 
        otp : hashedOTP
    });

    await newUser.save(); 

    return res.status(201).json({
        success : true,
        message : `An OTP has been sent to your registered email`
    })
}); 


// verify user : 
export const verifyUser = asyncHandler(async(req, res, next) => {
    const {email, otp} = req.body ; 

    const user = await userModel.findOne({email}); 

    if(!user){
        return next(new ErrorHandler(401, `User not found!`)); 
    }; 

    if(new Date(Date.now()) > user.otpExpiration){   
        return next(new ErrorHandler(401, 'OTP has been expired!'));
    }

    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex"); 

    if(hashedOTP !== user.otp){
        return next(new ErrorHandler(401, 'Invalid OTP !'));
    }

    user.isProfileVerified = true;
    user.otp = undefined;
    user.otpExpiration = undefined;
    await user.save();

    return res.status(200).json({
        sucess : true,
        message : 'Your profile has been verified'     
    })
})

// Login user 
export const loginUser = asyncHandler(async(req , res, next)=> {
    const {email, password : bodyPassword} = req.body;
    
    if(!email || !bodyPassword) { 
        return next(new ErrorHandler(400, 'All fields are required!'));
    }

    const user = await userModel.findOne({email});

    if(!user){
        return next(new ErrorHandler(401, 'User is not found!'));
    }

    if(!user.password) { 
        return next(new ErrorHandler(400, 'This account uses Google login, please login with Google!'));
    }

    const isPasswordMatch = await bcrypt.compare(bodyPassword, user.password); 
    
    
    if(!isPasswordMatch){
        return next(new ErrorHandler(401, 'Invalid password!'));
    }

    await generateToken(user._id, res); 

    const userPlainObj = user.toObject() ; 
    const {password,otpExpiration,  ...userExcludingPass} = userPlainObj; 

    return res.status(200).json({
        success : true,
        message : 'Login successful', 
        user : userExcludingPass
    })
})

// logout user : 
export const logoutUser = asyncHandler(async(req , res, next)=> {
    res.clearCookie('token'); 

    return res.status(200).json({
        success : true,
        message : 'Logout successful'
    })
})


// google login : 
export const googleSignIn = asyncHandler(async(req, res, next)=> {

    const {fullname , email , role, contact} = req.body ; 
    
    const user = await userModel.findOne({email}); 

    if(!user) { 
        const newUser = new userModel ({ 
            fullname, 
            email, 
            role, 
            contact, 
            isProfileVerified : true,
            otp : undefined,
            otpExpiration : undefined
        }); 
        await newUser.save() ; 
        return res.status(201).json({
            success : true,
            message : 'Successfull Authentication',
            user : newUser
        })
    }

    // if user exist then generate the tojen :
    await generateToken(user._id, res); 
    return res.status(200).json({
        success : true , 
        message : 'Login Successfull',
        user
    }) 
}); 

// Github login  : 




