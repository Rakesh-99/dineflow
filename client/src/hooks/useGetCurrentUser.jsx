import axios from "axios";
import { useEffect } from "react";
const URL = import.meta.env.VITE_BACKEND_USER_API_URL;
import {
  clearCurrentUser,
  setCurrentUser,
} from "../redux/features/currentUser.slice";
import { useDispatch } from "react-redux";
import {
  clearCityBasedUserRestaurants,
  clearCurrentOwnerRestaurant,
  clearSampleRestaurants,
} from "@/redux/features/currentOwnerRestaurants.slice";
import { clearCurrentCategory } from "@/redux/features/categorySlice";
import { clearTheme } from "@/redux/features/theme.slice";

const useGetCurrentUser = () => {
  let dispatch = useDispatch();
  let { pathname } = location;

  useEffect(() => {
    // prevent api from being called in account page :
    if (pathname === "/account") {
      return;
    }

    const clearAllStates = () => {
      dispatch(clearCurrentUser());
      dispatch(clearCurrentCategory());
      dispatch(clearCityBasedUserRestaurants());
      dispatch(clearCurrentOwnerRestaurant());
      dispatch(clearTheme());
      dispatch(clearSampleRestaurants());
    };
    const controller = new AbortController();

    const getCUrrentUser = async () => {
      try {
        const { data } = await axios.get(
          `${URL}/current-user`,
          { withCredentials: true, signal: controller.signal },
        );

        if (data?.success && data?.user) {
          dispatch(setCurrentUser(data?.user));
        } else {
          clearAllStates();
        }
      } catch (error) {
        console.log(error.response.data);
        clearAllStates();
      }
    };
    getCUrrentUser();

    return () => {
      controller.abort();
    };
  }, [dispatch, pathname]);
};

export default useGetCurrentUser;
