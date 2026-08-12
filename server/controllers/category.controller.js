import expressAsyncHandler from "express-async-handler";
import ErrorHandler from "../utils/ErrorHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import userModel from "../models/user.model.js";
import categoryModel from "../models/category.model.js";
import mongoose, { mongo } from "mongoose";

// create category :
export const createCategory = expressAsyncHandler(async (req, res, next) => {
  const { categoryName } = req.body;
  if (!categoryName) {
    return next(new ErrorHandler(404, "Category name is required!"));
  }
  const file = req.file;
  const userId = req.userId;

  let cloudinaryImg;
  if (!file) {
    return next(new ErrorHandler(404, "image is required!"));
  }
  cloudinaryImg = await uploadOnCloudinary(file.path);

  const category = new categoryModel({
    categoryName,
    owner: userId,
    image: {
      resources_type: cloudinaryImg?.resource_type,
      public_id: cloudinaryImg?.public_id,
      url: cloudinaryImg?.url,
    },
  });
  await category.save();

  return res.status(201).json({
    success: true,
    message: `Category has been created`,
    data: category,
  });
});

// get categories of a particular restaurant owner :
export const getCategoryForRestaurantOwner = expressAsyncHandler(async (req, res, next) => {
  const user = req.userId;

  const getAllCategory = await categoryModel.find({ owner: user }).populate("owner");

  if (getAllCategory.length < 1) {
    return next(new ErrorHandler(404, "No Category found !"));
  }

  return res.status(200).json({
    success: true,
    message: "Food category has been fetched",
    data: getAllCategory,
  });
});

// For USER -> get categories across all the restaurant owner :
export const getCategoriesForUser = expressAsyncHandler(async (req, res, next) => {
  const getCat = await categoryModel.find();
  if (getCat.length < 1) {
    return next(new ErrorHandler(404, "No categories found!"));
  }
  return res.status(200).json({
    success: true,
    message: "All categories have been fetched",
    data: getCat,
  });
});

// Delete category :

export const deleteCategory = expressAsyncHandler(async (req, res, next) => {
  const userId = req.userId;
  const { categoryId } = req.params;
  console.log(categoryId);

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return next(new ErrorHandler(401, "Invalid category id!"));
  }

  if (!categoryId) {
    return next(new ErrorHandler(400, "Category Id not found!"));
  }

  const getCat = await categoryModel.findOneAndDelete({ owner: userId, _id: categoryId }, { returnDocument: "after" });

  if (!getCat) {
    return next(new ErrorHandler(404, "Category not found!"));
  }

  return res.status(201).json({
    success: true,
    message: "Category has been deleted",
    data: getCat,
  });
});
