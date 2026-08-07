import { combineReducers, configureStore} from '@reduxjs/toolkit';
import currentuserSlice from '../features/currentUser.slice'; 
import themeSlice from '../features/theme.slice'; 
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
const realStorage = storage?.default || storage;
import currentOwnerRestaurants from '@/redux/features/currentOwnerRestaurants.slice'; 
import categorySlice from '@/redux/features/categorySlice'; 


const persistConfig = { 
  key : 'root',
  version : 1,
  storage:  realStorage
};

const rootReducer = combineReducers ({
  currentuserSlice: currentuserSlice,
  themeSlice : themeSlice, 
  currentOwnerRestaurants : currentOwnerRestaurants,
  categorySlice : categorySlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer); 

const store = configureStore({
  reducer  : persistedReducer, 
  middleware : (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck : false}) 
});


export default store; 
export const persistor = persistStore(store);
