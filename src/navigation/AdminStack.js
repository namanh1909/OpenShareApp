import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../screens/Maneger/HomeScreen';
import ManagerPostScreen from '../screens/Maneger/Post';
import DetailPostScreen from '../screens/Maneger/Post/components/DetailPost';
import TypeScreen from '../screens/Maneger/Type';
import ProfileAdminScreen from '../screens/Maneger/ProfileAdmin';
import ChangePasswordAdminScreen from '../screens/Maneger/ProfileAdmin/components/ChangePasswordAdminScreen';
import ManegerUserScreen from '../screens/Maneger/MannagerUser';
import UserProfilePost from '../screens/Maneger/MannagerUser/components/userProfile';



const AdminStack = () => {
    const AdminStackNavigator = createNativeStackNavigator();
    const OPTIONS = {
        noHeader: {
            headerShown: false,
        },
    };
    return (
        <AdminStackNavigator.Navigator>
            <AdminStackNavigator.Screen component={HomeScreen} name="HomeAdmin" options={{
                ...OPTIONS.noHeader,
            }} />
            <AdminStackNavigator.Screen component={ManagerPostScreen} name="ManegerPost" options={{
                ...OPTIONS.noHeader,
            }} />
            <AdminStackNavigator.Screen component={DetailPostScreen} name="DetailPostAdmin" options={{
                ...OPTIONS.noHeader,
            }} />
            <AdminStackNavigator.Screen component={TypeScreen} name="Type" options={{
                ...OPTIONS.noHeader,
            }} />
            <AdminStackNavigator.Screen component={ProfileAdminScreen} name="ProfileAdmin" options={{
                ...OPTIONS.noHeader,
            }} />
            <AdminStackNavigator.Screen component={ChangePasswordAdminScreen} name="ChangePasswordAdmin" options={{
                ...OPTIONS.noHeader,
            }} />
                <AdminStackNavigator.Screen component={ManegerUserScreen} name="ManegerUser" options={{
                ...OPTIONS.noHeader,
            }} />
               <AdminStackNavigator.Screen component={UserProfilePost} name="UserPost" options={{
                ...OPTIONS.noHeader,
            }} />
        </AdminStackNavigator.Navigator >
    )
}

export default AdminStack

const styles = StyleSheet.create({})