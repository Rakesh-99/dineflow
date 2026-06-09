import express from 'express';
import { googleSignIn, loginUser, logoutUser, registerUser, verifyUser } from '../../controllers/auth.controller.js';
const authRoutes = express.Router(); 



authRoutes.post('/sign-up', registerUser)
          .post('/verify-otp', verifyUser)
          .post('/login-user', loginUser)
          .post('/logout-user', logoutUser)
          .post('/google-auth', googleSignIn)




export default authRoutes;