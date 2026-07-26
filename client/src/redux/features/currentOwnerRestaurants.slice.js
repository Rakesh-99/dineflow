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
        }, 
        removeRestaurant: (state, action) => {
            state.restaurants = state.restaurants.filter((restaurant)=> restaurant._id !== action.payload)
        }
        
    }
});



export const {setRestaurants, addNewRestaurant, removeRestaurant} = currentOwnerRestaurants.actions; 
export default currentOwnerRestaurants.reducer; 