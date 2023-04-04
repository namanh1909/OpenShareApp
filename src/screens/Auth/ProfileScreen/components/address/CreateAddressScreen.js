import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

import Ionicons from 'react-native-vector-icons/Ionicons'
import Button from '../../../../../components/Button'
import NavBar from '../../../../../components/NavBar'
import Input from '../../../../../components/Input'
import DropDownPicker from 'react-native-dropdown-picker';
import AddressPicker from '../../../../../components/AddressPicker';




const CreateAddressScreen = ({ navigation }) => {


    return (
        <View>
            <NavBar title="Thêm địa chỉ"
                leftButton={
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }}
                    >
                        <Ionicons name="arrow-back-outline" color="#000" size={25} />
                    </TouchableOpacity>
                }
            />
            <AddressPicker />
        </View>
    )
}

export default CreateAddressScreen

