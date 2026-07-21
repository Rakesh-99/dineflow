import mongoose, { Schema } from "mongoose";



const itemSchema = new mongoose.Schema({ 

    name : { 
        type : String,
        required : [true, 'Item name is required !']
    }, 
    image : { 
        type : String,
        required : [true, 'Image is required!']
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
        enum : ["Veg", "Non Veg"]
    },
    status : { 
        type : Boolean,
        required : [true, 'Status is required!'],
        default : true
    },
    category : { 
        type : String , 
        enum : ["Snacks", "Main Course", "Desserts", "Pizza", "Burgers", "Sandwiches", "East Indian", "South India", "North Indian", "Chinies", "Fast Food", "Other" ], 
        required : [true, 'Category is required!']
    }
}, {timestamps : true}); 


const itemModel = mongoose.model('Item', itemSchema); 
export default itemModel; 