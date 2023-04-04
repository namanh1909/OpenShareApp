import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavBar from '../../../components/NavBar'


const NotificationsScreen = ({ navigation }) => {
    return (
        <View>
            <NavBar title="Thông báo"
                leftButton={
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }}
                    >
                        <Ionicons name="arrow-back-outline" color="#000" size={25} />
                    </TouchableOpacity>
                }
            />
        </View>
    )
}

export default NotificationsScreen

const styles = StyleSheet.create({})