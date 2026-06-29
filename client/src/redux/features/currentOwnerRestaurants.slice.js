import {createSlice} from '@reduxjs/toolkit'; 


const currentOwnerRestaurants = createSlice({
    name : 'currentOwnerRestaurants', 
    initialState : {
        restaurants: null
    }, 
    reducers : { 
        setRestaurants : (state, action) => { 
            state.restaurants = action.payload; 
        },
        addNewRestaurant : (state, action) => { 
            state.restaurants.push(action.payload);
        }
    }
});



export const {setRestaurants, addNewRestaurant} = currentOwnerRestaurants.actions; 
export default currentOwnerRestaurants.reducer; 