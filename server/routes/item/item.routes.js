import express from 'express'; 
import {  createItem, getAllItems, updateItem,  } from '../../controllers/item.controller.js';
import isUserAuthenticated from '../../middlewares/auth.middleware.js';
import multerFileUpload from '../../middlewares/multerFileupload.middleware.js';
// import isRestaurantOwner from '../../middlewares/isRestaurantOwner.js';
import isRestaurantOwner from '../../middlewares/isRestaurantOwner.js';
const itemRoutes = express.Router() ; 



itemRoutes.post('/add-item/:restaurantID', isUserAuthenticated, isRestaurantOwner, multerFileUpload.single('image'), createItem)
          .put('/update-item/:itemId', isUserAuthenticated, isRestaurantOwner, multerFileUpload.single('image'), updateItem)
          .get('/all-items', isUserAuthenticated, isRestaurantOwner, getAllItems)

export default itemRoutes; 