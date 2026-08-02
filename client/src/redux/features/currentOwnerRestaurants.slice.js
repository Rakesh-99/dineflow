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
        updateRestaurant : (state, action) => { 
            const updatedRestaurantData = action.payload;    
            let restaurantIndex = state.restaurants.findIndex(restaurant => restaurant._id === updatedRestaurantData._id ); 

            if(restaurantIndex !== -1) { 
                state.restaurants[restaurantIndex] = {...updatedRestaurantData} 
            }
        }, 
        
        // menu Items : 
        addMenuItemToRestaurant : (state, action) => { 
            const {shop} = action.payload; 
            const restaurant = state.restaurants.find(restaurant => restaurant._id === shop); 
            if(restaurant){ 
                restaurant.item.push(action.payload)
            }
        }, 
        deleteMenuFromRestaurant : (state, action) => { 
            const {shop, _id} = action.payload
            const restaurantIdx =  state.restaurants.findIndex(restaurant => restaurant._id === shop); 
            
            if(restaurantIdx !== -1 ){ 
                state.restaurants[restaurantIdx].item = 
                    state.restaurants[restaurantIdx].item.filter((getItem) => getItem._id !== _id);
            }
        }
    }   
});



export const {setCurrentRestaurantOwnerData, addNewRestaurant, removeRestaurant, addMenuItemToRestaurant, updateRestaurant, deleteMenuFromRestaurant} = currentOwnerRestaurants.actions; 
export default currentOwnerRestaurants.reducer; 