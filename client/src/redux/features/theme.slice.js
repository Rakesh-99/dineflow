import {createSlice} from '@reduxjs/toolkit';




const themeSlice = createSlice({ 
    name : 'themeSlice',
    initialState : { 
        theme : 'light'
    },          
    reducers : {
        switchTheme : (state, action ) => { 
            state.theme = action.payload;
        }
    }
}); 

export const {switchTheme} = themeSlice.actions; 
export default themeSlice.reducer; 