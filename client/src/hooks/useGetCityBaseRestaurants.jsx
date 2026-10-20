import { setCityBasedRestaurants } from "@/redux/features/currentOwnerRestaurants.slice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const URL = import.meta.env.VITE_BACKEND_SHOP_API_URL;

const useGetCityBasedRestaurants = () => {
  const { userAddress, userData } = useSelector(
    (state) => state.currentuserSlice,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const getRestaurantBasedOnCity = async () => {
      if (!userAddress?.city) return;

      if (userData?.role === "restaurantOwner") {
        return;
      }

      try {
        const { data } = await axios.get(
          `${URL}/fetch-location-based-restaurants?city=${userAddress?.city}`,
          { withCredentials: true },
        );

        if (data?.success && data?.data) {
          dispatch(setCityBasedRestaurants(data.data));
        }
      } catch (error) {
        console.log(
          `${error.response.data.message}` ||
            `Could not get data based on selected location! `,
        );
        return;
      }
    };
    getRestaurantBasedOnCity();
  }, [dispatch, userAddress?.city]);
};

export default useGetCityBasedRestaurants;
