import mongoose, { Schema } from "mongoose";



const itemSchema = new mongoose.Schema({ 

    name : { 
        type : String,
        required : [true, 'Item name is required !']
    }, 
    image : {
        url : String,
        public_id : String,
        resource_type: String
        },
    shop : { 
        type : Schema.Types.ObjectId , 
        ref : 'Shop'
    }, 
    owner : { 
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    price : { 
        type : Number, 
        min : 0, 
        required : true
    }, 
    foodType : { 
        type : String,
        enum : ["veg", "non-veg"],
        required : [true, "Food type is required!"]
    },
    status : { 
        type : Boolean,
        required : [true, 'Status is required!'],
        default : true
    },
    category : { 
        type : Schema.Types.ObjectId, 
        ref : 'Category',
        required : [true, 'category is required!']
    }
}, {timestamps : true}); 


const itemModel = mongoose.model('Item', itemSchema); 
export default itemModel; 