import {createSlice} from '@reduxjs/toolkit'; 




const currentuserSlice = createSlice({
    name : 'currentuserSlice',
    initialState: { 
        userData : null,
        city : null
    }, 
    reducers : { 
        setCurrentUser : (state, action ) => {
            state.userData = action.payload; 
        },
        setCurrentUserCity : (state, action) => { 
            state.city = action.payload
        }
    }
}); 


export const { setCurrentUser, setCurrentUserCity} = currentuserSlice.actions; 
export default currentuserSlice.reducer; 