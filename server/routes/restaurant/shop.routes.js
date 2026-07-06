import express from 'express'; 
import { createShop, fetchAllRestaurantsForUser, getOwnerRestaurantByID, fetchOwnerRestaurants } from '../../controllers/shop.controller.js';
const shopRoutes = express.Router() ; 
import multerFileUpload from '../../middlewares/multerFileupload.middleware.js';
import isUserAuthenticated from '../../middlewares/auth.middleware.js';
import { updateShop } from '../../controllers/shop.controller.js';




shopRoutes.post(`/create-shop`,isUserAuthenticated, multerFileUpload.single('image'), createShop)
          .put('/update-shop/:shopId', isUserAuthenticated, multerFileUpload.single('image'), updateShop)
          .get('/fetch-all-restaurants', isUserAuthenticated, fetchAllRestaurantsForUser)
          .get('/fetch-owner-restaurants', isUserAuthenticated, fetchOwnerRestaurants)
          .get('/get-owner-restaurant/:shopId', isUserAuthenticated, getOwnerRestaurantByID)


export default shopRoutes; 