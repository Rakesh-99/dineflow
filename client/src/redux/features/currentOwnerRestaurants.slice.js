import {createSlice} from '@reduxjs/toolkit'; 


const currentOwnerRestaurants = createSlice({
    name : 'currentOwnerRestaurants', 
    initialState : {
        restaurants: null
    }, 
    reducers : { 

        // Restaurants : 
        setCurrentRestaurantOwnerData : (state, action) => { 
            state.restaurants = action.payload; 
        },
        addNewRestaurant : (state, action) => { 
            state.restaurants.push(action.payload);
        }, 
        removeRestaurant: (state, action) => {
            state.restaurants = state.restaurants.filter((restaurant)=> restaurant._id !== action.payload)
        },
        
        // menu Items : 
        addMenuItemToRestaurant : (state, action) => { 
            const {shop} = action.payload; 
            const restaurant = state.restaurants.find(restaurant => restaurant._id === shop); 
            if(restaurant){ 
                restaurant.item.push(action.payload)
            }
        }
    }
});



export const {setCurrentRestaurantOwnerData, addNewRestaurant, removeRestaurant, addMenuItemToRestaurant} = currentOwnerRestaurants.actions; 
export default currentOwnerRestaurants.reducer; 