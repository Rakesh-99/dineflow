import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const location_api_key = import.meta.env.VITE_LOCATION_API_KEY
import {setCurrentUserCity} from '../redux/features/currentUser.slice';





const useGetCurrentLocation = () => {

    const {userData} = useSelector((state)=> state.currentuserSlice);
    
    const dispatch = useDispatch(); 
    useEffect(()=> { 

        navigator.geolocation.getCurrentPosition( async(position)=> { 
            const {latitude, longitude} = position.coords; 

            try {

                 const {data} = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${location_api_key}`);

                 const response = data?.results[0]; 
                 const { city} = response;                      
                 dispatch(setCurrentUserCity(city));
            } catch (error) {
                console.log('Could not fetch current location ->', error);
            }
        })
    },[userData]); 

}

export default useGetCurrentLocation;