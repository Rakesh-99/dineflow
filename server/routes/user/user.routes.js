import express from 'express'; 
import isUserAuthenticated from '../../middlewares/auth.middleware.js';
import { getCurrentUser } from '../../controllers/user.controller.js';
const userRoutes = express.Router() ; 



userRoutes.get('/current-user', isUserAuthenticated, getCurrentUser)




export default userRoutes; 