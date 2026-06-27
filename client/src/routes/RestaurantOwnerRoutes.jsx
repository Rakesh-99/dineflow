import { useSelector } from "react-redux";
import { Navigate } from "react-router";


const RestaurantOwnerRoutes = ({children}) => { 

    const {userData} = useSelector((state)=> state.currentuserSlice); 

    if(!userData) { 
        return <Navigate to={'/account'} replace/>
    }

    if(userData.role !== 'restaurantOwner') { 
        return <Navigate to={'/'} replace />
    }

    return children; 
    
}; 


export default RestaurantOwnerRoutes; 