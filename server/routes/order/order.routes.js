import express from 'express';
import { placeOrder, myOrders, shopOrders, updateOrderStatus } from '../../controllers/order.controller.js';
import isUserAuthenticated from '../../middlewares/auth.middleware.js';
import isRestaurantOwner from '../../middlewares/isRestaurantOwner.js';

const orderRoutes = express.Router();

orderRoutes.post('/place-order', isUserAuthenticated, placeOrder)
           .get('/my-orders', isUserAuthenticated, myOrders)
           .get('/shop-orders', isUserAuthenticated, isRestaurantOwner, shopOrders)
           .patch('/:orderId/status', isUserAuthenticated, isRestaurantOwner, updateOrderStatus);

export default orderRoutes;
