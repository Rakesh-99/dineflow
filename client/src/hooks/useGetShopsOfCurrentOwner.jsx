import axios from "axios";
import { useEffect } from "react";
import { toast } from "sonner";
const URL = import.meta.env.VITE_BACKEND_SHOP_API_URL; 
// 

const useGetShopsOfCurrentOwner = () => {

    useEffect(()=> { 
    const getCurrentOwnerShop = async () => { 
    try {
            const {data} = await axios.get(`${URL}/fetch-owner-restaurants`, {withCredentials: true});
            
            if(data.success){ 
                console.log(data.data);
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