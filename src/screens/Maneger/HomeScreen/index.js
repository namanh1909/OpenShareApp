import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../../redux/reducers/authSlice'

const HomeScreen = () => {
    const dispatch = useDispatch()
    return (
        <View>
            <Text>index</Text>
            <TouchableOpacity onPress={() => {
                dispatch(logout())
            }}>
                <Text>log out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})