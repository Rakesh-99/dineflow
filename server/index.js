import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config() ; 
const app = express() ; 
const PORT = process.env.PORT || 8050; 
import connectToDB from './db/database.js';
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import authRoutes from './routes/auth/auth.routes.js'
import userRoutes from './routes/user/user.routes.js';
import cookieParser from 'cookie-parser'; 
import shopRoutes from './routes/restaurant/shop.routes.js';
import itemRoutes from './routes/item/item.routes.js';




// global middlewares : 
app.use(cookieParser());
app.use(cors({
    origin : ['http://localhost:5173'],
    credentials : true,
    methods: ['GET','POST','PUT','PATCH','DELETE'],
}));
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

//server health cherck route  :
app.get('/api/v1', (req, res) => {
   res.send('Works fine')
}); 

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes); 
app.use('/api/v1/shop', shopRoutes); 
app.use('/api/v1/item', itemRoutes)
app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    connectToDB(process.env.DB_URI);
});
