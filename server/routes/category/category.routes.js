import express from 'express'; 
import { createCategory, getCategory } from '../../controllers/category.controller.js';
import isUserAuthenticated from '../../middlewares/auth.middleware.js';
import isRestaurantOwner from '../../middlewares/isRestaurantOwner.js';
import multerFileUpload from '../../middlewares/multerFileupload.middleware.js';
const categoryRoutes = express.Router(); 



categoryRoutes.post('/create-category',isUserAuthenticated, isRestaurantOwner, multerFileUpload.single('image'), createCategory)
.get('/get-category', isUserAuthenticated, isRestaurantOwner, getCategory)

export default categoryRoutes; 