import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../screens/Maneger/HomeScreen';



const AdminStack = () => {
    const AdminStackNavigator = createNativeStackNavigator();

    return (
        <AdminStackNavigator.Navigator>
            <AdminStackNavigator.Screen component={HomeScreen} name="HomeAdmin" />
        </AdminStackNavigator.Navigator>
    )
}

export default AdminStack

const styles = StyleSheet.create({})