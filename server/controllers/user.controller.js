import asyncErrorHandler from "express-async-handler";
import ErrorHandler from "../utils/ErrorHandler.js";
import userModel from "../models/user.model.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

// get current user :
export const getCurrentUser = asyncErrorHandler(async (req, res, next) => {
  const userId = req.userId;

  if (!userId) {
    return next(new ErrorHandler(404, "User not found !"));
  }

  const user = await userModel
    .findById(userId)
    .select("-password -otp -otpExpiration");

  if (!user) {
    return next(new ErrorHandler(404, "User not found!"));
  }

  return res.status(200).json({
    success: true,
    message: "User has been fetched",
    user,
  });
});

// update user :
export const updateUser = expressAsyncHandler(async (req, res, next) => {
  const { contact, fullname } = req.body;
console.log(req.body);

  const userId = req.userId;
  const paramsId = req.params.id;

  if (userId !== paramsId) {
    return next(new ErrorHandler(401, "Unauthorized Attempt!"));
  }

  const user = await userModel
    .findByIdAndUpdate(
      { _id: paramsId },
      {
        fullname: fullname && fullname,
        contact: contact && contact,
      },{returnDocument : "after", runValidators : true}
    )
    .select({password : 0, otpExpiration : 0});
  if (!user) {
    return next(new ErrorHandler(401, "User not found!"));
  }

  await user.save();

  return res.status(201).json({
    success: true,
    message: "User profile has been updated",
    data: user,
  });
});


// Update user password : 
export const updateUserPassword = expressAsyncHandler(async(req, res, next)=> { 
  const {currentPassword, newPassword} = req.body; 
  console.log(req.body);
  
  const userId = req.userId; 
  const paramsId = req.params.id; 

  if(userId !== paramsId) { 
    return next(new ErrorHandler(401, "Unauthorized Access!")); 
  };
  const user = await userModel.findOne({_id : paramsId}); 
  if(!user) { 
    return next(new ErrorHandler(401, "User not found!")); 
  }

  const isExistingPasswordMatch = await bcrypt.compare(currentPassword, user.password); 

  if(!isExistingPasswordMatch){
    return next(new ErrorHandler(401, "Current password is incorrect!")); 
  };

  const genSalt = await bcrypt.genSalt(10); 
  const hashNewPass = await bcrypt.hash(newPassword); 

  await userModel.findOneAndUpdate({_id : paramsId}, {password : hashNewPass});

  return res.status(201).json({
    success : true, 
    message : "Password has been updated" 
  })

})
