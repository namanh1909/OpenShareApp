

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import usersReducer from "./userSlice";
import postReducer from './postSlice'
import addressReducer from './addressSlice'

export const rootReducer = combineReducers({
    users: usersReducer,
    auth: authReducer,
    post: postReducer,
    address: addressReducer
});