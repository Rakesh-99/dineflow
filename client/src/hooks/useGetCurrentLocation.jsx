import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const location_api_key = import.meta.env.VITE_LOCATION_API_KEY
import {setCurrentUserCity} from '../redux/features/currentUser.slice';





const useGetCurrentLocation = () => {

    const {userData} = useSelector((state)=> state.currentuserSlice);
    console.log(userData);
    
    const dispatch = useDispatch(); 
    useEffect(()=> { 

        if(!navigator.geolocation) {
            console.log("Geo location is not supporeted by this browser!");
            return;
        }

        navigator.geolocation.getCurrentPosition( async(position)=> { 
            const {latitude, longitude} = position.coords; 

            try {
                 const {data} = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${location_api_key}`);
                
                 if(!data){
                    console.log('Could not fetch the current location!');
                    return; 
                  }
                 const response = data?.results[0]; 
                 dispatch(setCurrentUserCity(response));
            } catch (error) {
                console.log('Could not fetch current location ->', error);
                return; 
            }
        })
    },[userData?._id, dispatch]); 

}

export default useGetCurrentLocation;