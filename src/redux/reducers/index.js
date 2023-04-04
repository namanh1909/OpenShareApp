

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import usersReducer from "./userSlice"

export const rootReducer = combineReducers({
    users: usersReducer,
    auth: authReducer,
});