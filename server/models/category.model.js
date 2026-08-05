import mongoose, { Schema } from 'mongoose'; 



const categorySchema = new mongoose.Schema({

    categoryName : { 
        type : String, 
        required : [true, 'Category name is required!']
    }, 
    image : { 
        public_id : String, 
        url : String, 
        resources_type : String
    },
    owner : { 
        type : Schema.Types.ObjectId,
        ref : 'User', 
    }
}, {timestamps : true});

const categoryModel = mongoose.model("Category", categorySchema); 

export default categoryModel; 
