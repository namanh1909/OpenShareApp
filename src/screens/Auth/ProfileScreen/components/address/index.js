import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavBar from '../../../../../components/NavBar'
import MenuItem from '../../../../../components/MenuItem'


const AddressListScreen = ({ navigation }) => {
    return (
        <View>
            <NavBar title={"Danh sách địa chỉ"} leftButton={
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}
                >
                    <Ionicons name="arrow-back-outline" color="#000" size={25} />
                </TouchableOpacity>
            }
                rightButton={
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('CreateAddress')
                    }}
                    >
                        <Ionicons name="add-outline" color="#000" size={25} />
                    </TouchableOpacity>
                } />
            <MenuItem title={"Thôn mỹ lợi, xã ninh lộc, thị xã ninh hoà, tỉnh khánh hoà  thị xã ninh hoà, tỉnh khánh hoà thị xã ninh hoà, tỉnh khánh hoà"} iconName="navigate-outline" />
        </View>
    )
}

export default AddressListScreen

const styles = StyleSheet.create({})