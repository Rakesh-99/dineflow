import axios from "axios";
import { useEffect } from "react";
const URL = import.meta.env.VITE_BACKEND_CATEGORY_API_URL;
import { setCategory } from "@/redux/features/categorySlice";
import { useDispatch, useSelector } from "react-redux";

const useGetFoodCategory = () => {

    const dispatch = useDispatch(); 
    const {userData} = useSelector((state)=> state.currentuserSlice); 
    useEffect(() => {

        if(!userData?.role){
            return;
        }

        if(userData?.role === "user") {
            
            const getCategoryForUser = async()=> { 
                try {
                      const {data} = await axios.get(`${URL}/get-categories-user`, {withCredentials: true}); 
                if(data.success){
                    dispatch(setCategory(data.data))
                }
                } catch (error) {
                    console.log(`An unexpected error occurred while fetching user categories =>${error}`);
                }
              
            };
            getCategoryForUser();
            
        }else if(userData?.role === "restaurantOwner"){
            const getCategoryOfRestaurantOwner = async () => {
                try {
                    const { data } = await axios.get(`${URL}/get-categories-owner`, { withCredentials: true });
                    if (data.success) {
              
                        dispatch(setCategory(data.data))
                    }
                } catch (error) {
                    console.log(`An unexpected error occurred while fetching restaurant owner categories =>${error}`);
                }
            }
            getCategoryOfRestaurantOwner();
        }else {
            return ;
        }
       
    }, [userData, dispatch]);
};
export default useGetFoodCategory;

