import axios from "axios";
import { useEffect } from "react";
import { toast } from "sonner";
const URL = import.meta.env.VITE_BACKEND_SHOP_API_URL; 
import { useDispatch } from "react-redux";
import { setRestaurants } from "@/redux/features/currentOwnerRestaurants.slice";


const useGetShopsOfCurrentOwner = () => {

    const dispatch = useDispatch(); 

    useEffect(()=> { 
    const getCurrentOwnerShop = async () => { 
    try {
            const {data} = await axios.get(`${URL}/fetch-owner-restaurants`, {withCredentials: true});
            
            if(data.success){ 
                dispatch(setRestaurants(data.data));
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        }
    }
    getCurrentOwnerShop();
    },[]);
};


export default useGetShopsOfCurrentOwner; 