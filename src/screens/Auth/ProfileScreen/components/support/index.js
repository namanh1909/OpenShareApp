import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import NavBar from '../../../../../components/NavBar'
import Ionicons from 'react-native-vector-icons/Ionicons'

const SupportScreen = ({ navigation }) => {
    return (
        <View>
            <NavBar title="Hổ trợ "
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

export default SupportScreen

const styles = StyleSheet.create({})