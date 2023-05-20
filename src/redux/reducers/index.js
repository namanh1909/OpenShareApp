

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import usersReducer from "./userSlice";
import postReducer from './postSlice'
import addressReducer from './addressSlice'
import typeReducer from './typeSlice'
import requestReducer from './requestSlice'
import postProfileReducer from './postProfileSlice';
import postApproveReducer from './postApproveSlice';
import postUnApproveReducer from './postUnApproveSlice';
import typeAdminReducer from './typeAdminSlice';
import  ManegerUserReducer  from './manegerUserSlice';
import postUserAdminReducer from './postUserAdminSlice'
import avpproveSlice from './avpproveSlice';
import manegerRequestSlice from './manegerRequestSlice';
import manegerRequestByIdPostSlice from './manegerRequestByIdPostSlice';
import listRequestAllSlice from './listRequestAllSlice';
import detailRequestSlice from './detailRequestSlice';

export const rootReducer = combineReducers({
    users: usersReducer,
    auth: authReducer,
    post: postReducer,
    address: addressReducer,
    type: typeReducer,
    request: requestReducer,
    postProfile: postProfileReducer,
    postApprove: postApproveReducer,
    postUnApprove: postUnApproveReducer,
    typeAdmin: typeAdminReducer,
    manegerUser: ManegerUserReducer,
    postUserAdmin: postUserAdminReducer,
    avpprove: avpproveSlice,
    manegerRequest: manegerRequestSlice,
    manegerRequestByIdPost: manegerRequestByIdPostSlice,
    listRequestAll: listRequestAllSlice,
    detailSlice: detailRequestSlice
});