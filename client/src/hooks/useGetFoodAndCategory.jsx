import axios from "axios";
import { useEffect } from "react";
const URL = import.meta.env.VITE_BACKEND_CATEGORY_API_URL;
import { setCategory } from "@/redux/features/categorySlice";
import { useDispatch } from "react-redux";

const useGetFoodCategory = () => {

    const dispatch = useDispatch(); 

    useEffect(() => {
        const getCategory = async () => {
            try {
                const { data } = await axios.get(`${URL}/get-category`, { withCredentials: true });
                if (data.success) {
                    dispatch(setCategory(data.data))
                }
            } catch (error) {
                console.log(error);
            }
        }
        getCategory();
    }, [dispatch]);
};
export default useGetFoodCategory;

