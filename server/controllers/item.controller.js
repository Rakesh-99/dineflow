import expressAsyncHandler from "express-async-handler";
import ErrorHandler from "../utils/ErrorHandler.js";
import itemModel from "../models/item.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import shopModel from "../models/shop.model.js";
import userModel from "../models/user.model.js";




// Fetch Item : 



// create Item : 
export const createItem = expressAsyncHandler(async(req, res, next) => { 

    const {name, foodType, category, price, status} = req.body; 
    
    const userId = req.userId; 
    if(!name || !foodType || !price || !category || !status) { 
        return next(new ErrorHandler(400, 'All fields are required!')); 
    }

    let cloudinaryImgUrl ; 

    const file = req.file; 

    if(file){ 
        cloudinaryImgUrl = await uploadOnCloudinary(file.path); 
    }
    
    const user = await userModel.findById(userId); 

    if(!user){ 
        return next(new ErrorHandler(404, 'User not found!'));
    }

    if(user.role !== 'restaurantOwner'){ 
        return next(new ErrorHandler(403, 'You are not authorized to create an Item!')); 
    }

    const restaurant = await shopModel.findOne({owner : userId});

    if(!restaurant){ 
        return next(new ErrorHandler(404, 'Restaurant not found!'))
    }


    const createItem = new itemModel({
        name, 
        foodType, 
        price ,
        category,
        status,
        image : cloudinaryImgUrl,
        shop : restaurant._id
    })

    await createItem.save(); 

    return res.status(201).json({
        success : true,
        message : `An Item has been created`,
        data : createItem
    })
});


// Update item : 
export const updateItem = expressAsyncHandler(async(req, res, next)=> { 

    const {name, price, category, foodType, status} = req.body; 
    const userId = req.userId; 
    const file = req.file ; 
    const itemId = req.params.itemId; 

    let cloudinaryImgUrl ; 

    if(file) { 
        cloudinaryImgUrl = await uploadOnCloudinary(file.path); 
    }

    const user = await userModel.findById(userId); 
    if(!user){ 
        return next(new ErrorHandler(404, 'User not found !')); 
    }
    if(user.role !== 'restaurantOwner'){ 
        return next(new ErrorHandler(403, 'You are not authorized to update the Item!')); 
    }; 

    const shop = await shopModel.findOne({owner : userId}); 

    if(!shop) { 
        return next(new ErrorHandler(404, 'Shop not found!')); 
    }


    const updatedItemData = {} ; 

    if(name) updatedItemData.name = name ;
    if(price) updatedItemData.price = price; 
    if(category) updatedItemData.category = category; 
    if(foodType) updatedItemData.foodType = foodType; 
    if(cloudinaryImgUrl) updatedItemData.image = cloudinaryImgUrl;
    if(status) updatedItemData.status = status;
    

    const updateItem  = await itemModel.findOneAndUpdate(
        {_id : itemId, shop : shop._id}, 
        {$set : updatedItemData},
        {new : true, runValidators : true}
    ); 

    if(!updateItem){ 
        return next(new ErrorHandler(404, 'Item not found !')); 
    }

    return res.status(200).json({
        success : true , 
        message : `Item has been updated`, 
        data : updateItem
    })
}); 


// Delete Item : 




