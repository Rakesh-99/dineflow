import { setCityBasedRestaurants } from "@/redux/features/currentOwnerRestaurants.slice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const URL = import.meta.env.VITE_BACKEND_SHOP_API_URL;



const useGetCityBasedRestaurants = () => {

    const { userAddress } = useSelector((state) => state.currentuserSlice);
    const dispatch = useDispatch();



    useEffect(() => {

        const getRestaurantBasedOnCity = async () => {
            if (!userAddress?.city) return;
            try {
                const { data } = await axios.get(`${URL}/fetch-location-based-restaurants?city=${userAddress?.city}`, { withCredentials: true });

                if (data.success) {
                    dispatch(setCityBasedRestaurants(data.data))
                }
            } catch (error) {
                console.log(`Could not get data baseed on select location! ${error}`);
                return;
            }
        }
        getRestaurantBasedOnCity();
    }, [dispatch, userAddress?.city]);
};


export default useGetCityBasedRestaurants; 