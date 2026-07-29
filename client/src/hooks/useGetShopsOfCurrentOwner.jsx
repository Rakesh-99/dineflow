import axios from "axios";
import { useEffect } from "react";
const URL = import.meta.env.VITE_BACKEND_SHOP_API_URL; 
import { useDispatch } from "react-redux";
import { setCurrentRestaurantOwnerData } from "@/redux/features/currentOwnerRestaurants.slice";


const useGetShopsOfCurrentOwner = () => {

    const dispatch = useDispatch(); 

    useEffect(()=> { 
    const getCurrentOwnerShop = async () => { 
    try {
            const {data} = await axios.get(`${URL}/fetch-owner-restaurants`, {withCredentials: true});
            
            if(data.success){ 
                dispatch(setCurrentRestaurantOwnerData(data.data));
            }
        } catch (error) {
           console.log(error);
        }
    }
    getCurrentOwnerShop();
    },[]);
};


export default useGetShopsOfCurrentOwner; 