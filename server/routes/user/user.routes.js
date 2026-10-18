import express from 'express';
import isUserAuthenticated from '../../middlewares/auth.middleware.js';
import { deleteAccount, getCurrentUser, updateUser, updateUserPassword } from '../../controllers/user.controller.js';
const userRoutes = express.Router() ;



userRoutes.get('/current-user', isUserAuthenticated, getCurrentUser)
  .put('/update-user/:id',isUserAuthenticated,  updateUser )
  .put('/update-password/:id', isUserAuthenticated, updateUserPassword)
  .delete('/delete-account/:id', isUserAuthenticated, deleteAccount)




export default userRoutes;