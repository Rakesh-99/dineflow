import expressAsyncHandler from "express-async-handler";
import ErrorHandler from "../utils/ErrorHandler.js"; 
import shopModel from "../models/shop.model.js";
import userModel from "../models/user.model.js";
import {uploadOnCloudinary, deleteAssestFromCloudinary} from '../utils/cloudinary.js';
import mongoose, { Mongoose, Schema } from "mongoose";
import itemModel from "../models/item.model.js";



// Fetch shop from the user POV. Because user can see all the restaurants from all the restaurant owners : 
export const getRestaurantBasedOnLocation = expressAsyncHandler(async(req, res, next) => { 
    const {city} = req.query; 
   
    const getRestaurants = await shopModel.find({
        city : {$regex : `^${city}`, $options : "i" }
    })

    if(getRestaurants.length < 1) { 
        return next(new ErrorHandler(404, "We'r not there yet!"));
    }

    return res.status(200).json({
        success : true,
        message : `Restaurants have been fetched`,
        data : getRestaurants
    })
});

// Fetch restaurants list according to owner only : 
export const fetchOwnerRestaurants = expressAsyncHandler(async(req, res, next) => { 
    const userId = req.userId ; 

    const getRestaurants = await shopModel.find({owner : userId}).sort({createdAt: -1}).populate({path:"owner", select:"-password -otp -otpExpiration"}).populate("item");

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

    const {shopName, city, state, address1,address2,street, description, status, costForTwo, budgetFriendly, isVegRestaurant} = req.body; 
    
    const userId = req.userId ; 

    const image = req.file ;

    if(!shopName || !city || !state || !address1 || !image || !description || !status || !costForTwo || !budgetFriendly) {
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
        address1, 
        address2: address2 ? address2 : "",
        street: street ? street : "", 
        description,
        status,
        costForTwo,
        isVegRestaurant,
        budgetFriendly,
        image : {
            url : cloudinaryImgURL.url,
            public_id : cloudinaryImgURL.public_id,
            resources_type: cloudinaryImgURL.resource_type
        },
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

    const { shopName , address1, address2, street, city, state, description, status, costForTwo, budgetFriendly} = req.body ; 

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
    if(address1) updatedData.address1 = address1;
    if(address2 !== undefined) updatedData.address2 = address2; 
    if(street !== undefined) updatedData.street = street;
    if(description) updatedData.description = description;
    if(city) updatedData.city = city; 
    if(state) updatedData.state = state; 
    if(costForTwo) updatedData.costForTwo = costForTwo;
    if(budgetFriendly !== undefined) updatedData.budgetFriendly = budgetFriendly;
    if(file) updatedData.image = {
        "url" : cloudinaryImgURL.url,
        "resource_type" : cloudinaryImgURL.resource_type,
        "public_id" : cloudinaryImgURL.public_id
    } 
    if(description) updatedData.description = description; 
    if(status) updatedData.status = status

    const shop = await shopModel.findOneAndUpdate(
        {_id: shopId, owner : user._id},
        {$set : updatedData},
        {returnDocument: 'after'}
    ).populate({path:"owner", select:"-password -otp -otpExpiration"})
    
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

    const shop = await shopModel.findOne({owner : userId, _id : shopId}).populate({path:"owner", select:"-password -otp -otpExpiration"}).populate("item");
    
    if(!shop) { 
        return next(new ErrorHandler(404, 'Shop not found!'))
    }; 
    return res.status(200).json({
        success : true,
        message : 'Restaurant has been fetched',
        data : shop
    })
});


// delete shop along with its menus  : 
export const deleteRestaurant = expressAsyncHandler(async(req, res, next) => { 
    const userId = req.userId; 
    const {shopId} = req.params; 

    if(!mongoose.Types.ObjectId.isValid(shopId)){
        return next(new ErrorHandler(401, 'Invalid shop id!'));
    }; 

    const restaurant = await shopModel.findOneAndDelete({owner : userId, _id: shopId}); 
    if(!restaurant) { 
        return next(new ErrorHandler(404, "Restaurant not found!")); 
    }
    // deleting restaurant image from cloudinry : 
    await deleteAssestFromCloudinary([restaurant.image.public_id]);
   
    const items = await itemModel.find({_id : {$in: restaurant.item}})

    // deleting menu item images : 
    const getItemImagePublicIDs = items.map((item)=> item.image.public_id);
    await deleteAssestFromCloudinary(getItemImagePublicIDs);

    const itemIDs = items.map((item)=> item._id); 
    
    // deleteing items that are associated with restaurant :     
    await itemModel.deleteMany({_id : {$in: itemIDs}}); 
    
    return res.status(200).json({
        success : true, 
        message : "Restaurant and it's menu items have been deleted",
        deletedRestaurant : restaurant
    })
})