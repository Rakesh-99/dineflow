import mongoose from "mongoose";



// schema : 

const userSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true,
        unique : true
    },
    contact : {
        type : String,
        // required : true,
    },
    password : {
        type : String,
        // required : true,
    },
    role : {
        type : String,
        enum: ['user','delivery_agent', 'restaurantOwner'],
        required : true
    },
    otp : {
        type : String,
    },
    otpExpiration : {
        type : Date,
        default : () => new Date(Date.now() + 5 * 60 * 1000) 
    },
    isProfileVerified : {
        type : Boolean, 
        default : false
    }
},{timestamps : true});




// model : 

const userModel = mongoose.model('User', userSchema);
export default userModel; 