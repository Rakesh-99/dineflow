import { combineReducers, configureStore} from '@reduxjs/toolkit';
import currentuserSlice from '../features/currentUser.slice'; 
import themeSlice from '../features/theme.slice'; 
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
const realStorage = storage?.default || storage;

 


const persistConfig = { 
  key : 'root',
  version : 1,
  storage:  realStorage
};

const rootReducer = combineReducers ({
  currentuserSlice: currentuserSlice,
  themeSlice : themeSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer); 

const store = configureStore({
  reducer  : persistedReducer, 
  middleware : (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck : false}) 
});


export default store; 
export const persistor = persistStore(store);
