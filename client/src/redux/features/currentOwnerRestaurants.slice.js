import {createSlice} from '@reduxjs/toolkit'; 


const currentOwnerRestaurants = createSlice({
    name : 'currentOwnerRestaurants', 
    initialState : {
        restaurants: null
    }, 
    reducers : { 
        setRestaurants : (state, action) => { 
            state.restaurants = action.payload; 
        }
    }
});



export const {setRestaurants} = currentOwnerRestaurants.actions; 
export default currentOwnerRestaurants.reducer; 