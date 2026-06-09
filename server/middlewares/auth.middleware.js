import jwt from 'jsonwebtoken'; 

const isUserAuthenticated = async ( req, res, next) => { 
    try {
        const token = req.cookies.token ; 
        
        if(!token) { 
            return res.status(401).json({ 
                success : false , 
                message : `User token not found!`
            })
        }; 

        // then verify the token sifneture : 

        const verifyToken = await jwt.verify(token , process.env.JWT_TOKEN); 

        if(!verifyToken) { 
            return res.status(401).json( { 
                success : false , 
                message : `Invalid token signeture!`
            })
        }; 

        req.userId = verifyToken.userId;   
        next() ; 
        
    } catch (error) {
        return res.status(500).json({ 
            success: false , 
            message :  `Internal Server Erorr, ${error}`
        })
    }
}; 


export default isUserAuthenticated; 