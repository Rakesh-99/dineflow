import axios from "axios";
import { useEffect, useState } from "react";
const URL = import.meta.env.VITE_BACKEND_ITEM_API_URL;

const useGetFoodAndCategory = () => {

    const [foodCategory, setFoodCategory] = useState(null); 
    const [foodType, setFoodType] = useState(null); 

    
    useEffect(() => {

        const getFoodAndCategory = async () => {
            try {
                const { data } = await axios.get(`${URL}/category-and-types`, { withCredentials: true });
                if (data.success) {
                   setFoodCategory(data.getFoodCategories);
                   setFoodType(data.getFoodTypes);
                }
            } catch (error) {
                console.log(error);
                console.log(error.response.data.message);
            }
        }
        getFoodAndCategory();
    },[]);

    return {
        foodCategory,
        foodType
    }
};


export default useGetFoodAndCategory; 