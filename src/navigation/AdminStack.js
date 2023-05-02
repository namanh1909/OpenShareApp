import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../screens/Maneger/HomeScreen';



const AdminStack = () => {
    const AdminStackNavigator = createNativeStackNavigator();
    const OPTIONS = {
        noHeader: {
          headerShown: false,
        },
      };
    return (
        <AdminStackNavigator.Navigator>
            <AdminStackNavigator.Screen component={HomeScreen} name="HomeAdmin"  options={{
          ...OPTIONS.noHeader,
        }} />
        </AdminStackNavigator.Navigator>
    )
}

export default AdminStack

const styles = StyleSheet.create({})