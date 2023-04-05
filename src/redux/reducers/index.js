

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authStaffReducer from './admin/authAdminSlice';
import authReducer from './authSlice';
import usersReducer from "./userSlice"

export const rootReducer = combineReducers({
    users: usersReducer,
    auth: authReducer,
    authStaff: authStaffReducer,
});