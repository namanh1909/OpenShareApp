import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../screens/Maneger/HomeScreen';
import ManagerPostScreen from '../screens/Maneger/Post';
import DetailPostScreen from '../screens/Maneger/Post/components/DetailPost';
import PostAppv from '../screens/Maneger/Post/components/PostUnAppv';
import PostUnAppv from '../screens/Maneger/Post/components/PostUnAppv';
import TypeScreen from '../screens/Maneger/Type';



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

            <AdminStackNavigator.Screen component={PostUnAppv} name="PostUnAppv" options={{
                ...OPTIONS.noHeader,
            }} />
            <AdminStackNavigator.Screen component={PostAppv} name="PostAppv" options={{
                ...OPTIONS.noHeader,
            }} />
            <AdminStackNavigator.Screen component={DetailPostScreen} name="DetailPostAdmin" options={{
                ...OPTIONS.noHeader,
            }} />
              <AdminStackNavigator.Screen component={TypeScreen} name="Type" options={{
                ...OPTIONS.noHeader,
            }} />
        </AdminStackNavigator.Navigator>
    )
}

export default AdminStack

const styles = StyleSheet.create({})