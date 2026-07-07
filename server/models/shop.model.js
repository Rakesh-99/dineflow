import mongoose, { Mongoose, Schema } from "mongoose";



const shopSchema = new mongoose.Schema({

    shopName : { 
        type : String,
        required : [true, 'Shop name is required!']
    }, 
    image : { 
        type : String,
        required : [true, 'Shop image is required!']
    }, 
    owner : { 
        type : Schema.Types.ObjectId,
        ref : 'User'
    }, 
    description : { 
        type : String,
        required : [true, 'Description is required!']
    },
    status : { 
        type : Boolean,
        required : [true, 'Status is required!'], 
        default : true
    },
    item : [{ 
        type : Schema.Types.ObjectId,
        ref : 'Item'
    }], 
    state : {
        type : String, 
        required : [true, 'State is required!']
    },  
    city : {
        type : String, 
        required : [true, 'City is required']
    }, 
    address : { 
        type  : String, 
        required: [true, 'Address is required!']
    }

}, {timestamps : true}); 

const shopModel = mongoose.model('Shop', shopSchema)

export default shopModel; 