import expressAsyncHandler from 'express-async-handler'; 
import ErrorHandler from '../utils/ErrorHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import userModel from '../models/user.model.js';
import categoryModel from '../models/category.model.js';


// create category : 
export const createCategory = expressAsyncHandler(async(req, res, next)=> { 
    const {categoryName} = req.body; 
    if(!categoryName) { 
        return next(new ErrorHandler(404, "Category name is required!"))
    }
    const file = req.file
    const userId = req.userId; 


    let cloudinaryImg ; 
    if(!file) { 
        return next(new ErrorHandler(404, 'image is required!'));
    }
    cloudinaryImg = await uploadOnCloudinary(file.path)

    const user = await userModel.findOne({_id : userId}); 
 
    const category = new categoryModel({
        categoryName , 
        owner : user._id,
        image : {
            "resources_type" : cloudinaryImg?.resource_type,
            "public_id" : cloudinaryImg?.public_id,
            "url" : cloudinaryImg?.url
        }
    });
    await category.save();

    return res.status(201).json({
        success : true,
        message : `Category has been created`, 
        data : category
    })
}); 

// get categories : 
export const getCategory = expressAsyncHandler(async(req, res, next)=> {
    const user = req.userId; 

    const getAllCategory = await categoryModel.find({owner : user}).populate("owner"); 

    if(getAllCategory.length < 1) { 
        return next(new ErrorHandler(404, "No Category found !"))
    }

    return res.status(200).json({
        success : true, 
        message : "Food category has been fetched",
        data : getAllCategory
    })
 })

