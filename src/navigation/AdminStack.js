import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";



const AdminStack = () => {
    const AdminStackNavigator = createNativeStackNavigator();

    return (
        <AdminStackNavigator.Navigator>
            <AdminStackNavigator.Screen />
        </AdminStackNavigator.Navigator>
    )
}

export default AdminStack

const styles = StyleSheet.create({})