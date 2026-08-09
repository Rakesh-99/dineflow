import express from 'express'; 
import { createShop, getOwnerRestaurantByID, fetchOwnerRestaurants, deleteRestaurant, getRestaurantBasedOnLocation } from '../../controllers/shop.controller.js';
const shopRoutes = express.Router() ; 
import multerFileUpload from '../../middlewares/multerFileupload.middleware.js';
import isUserAuthenticated from '../../middlewares/auth.middleware.js';
import { updateShop } from '../../controllers/shop.controller.js';
import isRestaurantOwner from '../../middlewares/isRestaurantOwner.js';




shopRoutes.post(`/create-shop`,isUserAuthenticated, multerFileUpload.single('image'), createShop)
          .put('/update-shop/:shopId', isUserAuthenticated, multerFileUpload.single('image'), updateShop)
          .get('/fetch-location-based-restaurants', isUserAuthenticated, getRestaurantBasedOnLocation)
          .get('/fetch-owner-restaurants', isUserAuthenticated, fetchOwnerRestaurants)
          .get('/get-owner-restaurant/:shopId', isUserAuthenticated, getOwnerRestaurantByID)
          .delete(`/delete-shop/:shopId`, isUserAuthenticated, isRestaurantOwner, deleteRestaurant)


export default shopRoutes; 