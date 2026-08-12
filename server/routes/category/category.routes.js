import express from 'express'; 
import { createCategory, deleteCategory, getCategoriesForUser, getCategoryForRestaurantOwner } from '../../controllers/category.controller.js';
import isUserAuthenticated from '../../middlewares/auth.middleware.js';
import isRestaurantOwner from '../../middlewares/isRestaurantOwner.js';
import multerFileUpload from '../../middlewares/multerFileupload.middleware.js';
const categoryRoutes = express.Router(); 



categoryRoutes.post('/create-category',isUserAuthenticated, isRestaurantOwner, multerFileUpload.single('image'), createCategory)
.get('/get-categories-owner', isUserAuthenticated, isRestaurantOwner, getCategoryForRestaurantOwner)
.get('/get-categories-user', isUserAuthenticated, getCategoriesForUser)
.delete('/delete-category/:categoryId', isUserAuthenticated, isRestaurantOwner, deleteCategory)

export default categoryRoutes; 