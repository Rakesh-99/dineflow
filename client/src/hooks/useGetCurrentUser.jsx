import axios from "axios"
import { useEffect } from "react";
const URL = import.meta.env.VITE_BACKEND_USER_API_URL; 
import {setCurrentUser} from '../redux/features/currentUser.slice';
import { useDispatch, useSelector } from "react-redux";





const useGetCurrentUser = () => {
    let dispatch = useDispatch();     

    const {userData} =  useSelector(state => state.currentuserSlice);
    
    
    

    useEffect(()=> { 

        if(location.pathname === "/account") { 
            return ;
        }
        
        const getUserInfo = async() => {
                try {
                    const {data} = await axios.get(`${URL}/current-user`, {withCredentials : true});   
                    const resposne = data; 

                    if(resposne?.success){ 
                        dispatch(setCurrentUser(resposne?.user));
                    }
                } catch (error) {
                  dispatch(setCurrentUser(null))
                  console.log(`Error while fetching user ${error.resposne.data.message}`);
                }
            }

            getUserInfo(); 
    },[dispatch]); 
   

}

export default useGetCurrentUser; 