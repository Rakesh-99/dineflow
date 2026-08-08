import {createSlice} from '@reduxjs/toolkit';




const themeSlice = createSlice({ 
    name : 'themeSlice',
    initialState : { 
        theme : 'light'
    },          
    reducers : {
        switchTheme : (state, action ) => { 
            state.theme = action.payload;
        },
        clearTheme : (state) => { 
            state.theme = 'light'
        }
    }
}); 

export const {switchTheme, clearTheme} = themeSlice.actions; 
export default themeSlice.reducer; 