import {createSlice} from '@reduxjs/toolkit'; 




const currentuserSlice = createSlice({
    name : 'currentuserSlice',
    initialState: { 
        userData : null,
        userAddress : null
    }, 
    reducers : { 
        setCurrentUser : (state, action ) => {
            state.userData = action.payload; 
        },
        setCurrentUserCity : (state, action) => { 
          const {state_district,address_line1,address_line2, city} = action.payload; 
          state.userAddress = {
            "state" : state_district, 
            "address1" : address_line1, 
            "address2" : address_line2, 
            "city" : city
          }
        }, 
        clearCurrentUser : (state) => { 
            state.userData  = null,
            state.userAddress = null
        }
    }
}); 


export const { setCurrentUser, setCurrentUserCity, clearCurrentUser} = currentuserSlice.actions; 
export default currentuserSlice.reducer; 