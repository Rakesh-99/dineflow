import expressAsyncHandler from "express-async-handler";
import ErrorHandler from "../utils/ErrorHandler.js"; 
import shopModel from "../models/shop.model.js";
import userModel from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import mongoose, { Mongoose, Schema } from "mongoose";



// Fetch shop from the user POV. Because user can see all the restaurants from all the restaurant owners : 
export const fetchAllRestaurantsForUser = expressAsyncHandler(async(req, res, next) => { 

    const getRestaurants = await shopModel.find().populate('owner');

    if(getRestaurants.length < 1) { 
        return next(new ErrorHandler(404, 'No restaurant found!')); 
    }

    return res.status(200).json({ 
        success : true,
        message : `All restaurants have been fetched`,
        data : getRestaurants
    })
});

// Fetch restaurants list according to owner only : 
export const fetchOwnerRestaurants = expressAsyncHandler(async(req, res, next) => { 
    const userId = req.userId ; 

    const getRestaurants = await shopModel.find({owner : userId}).populate('owner');

    if(getRestaurants.length < 0 ) { 
        return next(new ErrorHandler(404, 'No restaurant found, Please create one!')); 
    }; 

    return res.status(200).json( { 
        success : true ,
        message : `Restaurants have been fetched`, 
        data : getRestaurants
    })
})

// Create Shop : 
export const createShop = expressAsyncHandler(async(req, res, next)=> { 

    const {shopName, city, state, address, description, status} = req.body; 
    
    const userId = req.userId ; 

    const image = req.file ;

    if(!shopName || !city || !state || !address || !image || !description || !status) {
        return next(new ErrorHandler(400, 'All fields are required!'));
    }


    const user = await userModel.findById({_id : userId}); 

    

    if(user?.role !== 'restaurantOwner') { 
       return next(new ErrorHandler(401, 'Only restaurant owner can create a Shop!'));
    }
 
    const cloudinaryImgURL = await uploadOnCloudinary(image.path); 

    // now create a shop : 
    const shop = new shopModel({
        shopName,
        city,
        state, 
        address, 
        description,
        status,
        image : cloudinaryImgURL,
        owner : user._id
    }); 

    await shop.save() ; 

    return res.status(201).json({
        success : true, 
        message : `New shop has been created`, 
        shop
    })
}); 

// edit shop controller :  
export const updateShop = expressAsyncHandler(async(req, res, next)=> { 

    const { shopName , address, city, state, description, status} = req.body ; 

    const userId = req.userId; 
    const {shopId} = req.params; 
    
    if(!mongoose.Types.ObjectId.isValid(shopId)){
        return next(new ErrorHandler(400, 'Invalid Shop id!'))
    }
    const file = req.file; 

    let cloudinaryImgURL ; 

    if(file) { 
        cloudinaryImgURL = await uploadOnCloudinary(file.path);
    }
    
    const user = await userModel.findById(userId); 
    
    if(user.role !== 'restaurantOwner') { 
        return next(new ErrorHandler(401, 'Your are not authorzied to update the restaurant!')); 
    }

    const updatedData = {} ; 
    if(shopName) updatedData.shopName = shopName;
    if(address) updateShop.address = address; 
    if(city) updatedData.city = city; 
    if(state) updatedData.state = state; 
    if(file) updatedData.image = cloudinaryImgURL 
    if(description) updatedData.description = description; 
    if(status) updatedData.status = status

    const shop = await shopModel.findOneAndUpdate(
        {_id: shopId, owner : user._id},
        {$set : updatedData},
        {new : true, runValidators : true}
    ).populate('owner').select('- password');
    
    if(!shop) { 
        return next(new ErrorHandler(401, `Either the requested shop does't exist or you are unauthorized`))
    }

    return res.status(201).json({
        success : true,
        message : `Shop has been updated`, 
        data : shop
    })
}); 


export const getOwnerRestaurantByID = expressAsyncHandler(async(req, res, next) => { 
    const {shopId} = req.params; 

    if(!mongoose.Types.ObjectId.isValid(shopId)){
        return next(new ErrorHandler(401, 'Invalid shop Id!'))
    }; 
    const userId = req.userId; 

    const shop = await shopModel.findOne({owner : userId, _id : shopId}); 
    if(!shop) { 
        return next(new ErrorHandler(404, 'Shop not found!'))
    }; 
    return res.status(200).json({
        success : true,
        message : 'Restaurant has been fetched',
        data : shop
    })
});