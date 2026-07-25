import userModel from "../models/user.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";

const isRestaurantOwner = async( req, res, next) =>  { 

    const userId = req.userId; 

    const user = await userModel.findOne({_id : userId}); 

    if(user.role !== 'restaurantOwner') { 
        return next(new ErrorHandler(401, 'Unauthorized Access !')); 
    }
    next(); 
}; 

export default isRestaurantOwner; 