import express from 'express'; 
import {  createItem, updateItem } from '../../controllers/item.controller.js';
import isUserAuthenticated from '../../middlewares/auth.middleware.js';
import multerFileUpload from '../../middlewares/multerFileupload.middleware.js';
const itemRoutes = express.Router() ; 



itemRoutes.post('/add-item/:restaurantID', isUserAuthenticated, multerFileUpload.single('image'), createItem)
          .put('/update-item/:itemId', isUserAuthenticated, multerFileUpload.single('image'), updateItem)

export default itemRoutes; 