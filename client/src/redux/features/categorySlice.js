import { createSlice } from "@reduxjs/toolkit";




const categorySlice = createSlice({
    name : 'categorySlice',
    initialState : { 
        categories : null
    },
    reducers : { 
        setCategory : (state, action) => { 
            state.categories = action.payload
        }, 
        createCategory : (state, action ) => { 
            if (!state.categories) state.categories = [];
            state.categories.push(action.payload);
        }, 
        clearCurrentCategory : (state)=> { 
            state.categories = null
        }
    }
}); 

export const {setCategory, createCategory, clearCurrentCategory} = categorySlice.actions; 
export default categorySlice.reducer; 