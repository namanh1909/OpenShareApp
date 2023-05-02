

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import usersReducer from "./userSlice";
import postReducer from './postSlice'
import addressReducer from './addressSlice'
import typeReducer from './typeSlice'
import requestReducer from './requestSlice'
import postProfileReducer from './postProfileSlice';

export const rootReducer = combineReducers({
    users: usersReducer,
    auth: authReducer,
    post: postReducer,
    address: addressReducer,
    type: typeReducer,
    request: requestReducer,
    postProfile: postProfileReducer,
});