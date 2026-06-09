import axios from "axios"
import { useEffect } from "react";
const URL = import.meta.env.VITE_BACKEND_USER_API_URL; 
import {setCurrentUser} from '../redux/features/currentUser.slice';
import { useDispatch } from "react-redux";





const useGetCurrentUser = () => {
    let dispatch = useDispatch();     


    useEffect(()=> { 
        const getUserInfo = async() => {
                try {
                    const {data} = await axios.get(`${URL}/current-user`, {withCredentials : true}); 
                    console.log(data);
                    
                    const resposne = data; 

                    if(resposne?.success){ 
                        dispatch(setCurrentUser(resposne?.user));
                        console.log(resposne.user);
                    }
                } catch (error) {
                    console.log('Error ->',error.response.data.message);
                }
            }

            getUserInfo(); 
    },[]); 
   

}

export default useGetCurrentUser; 