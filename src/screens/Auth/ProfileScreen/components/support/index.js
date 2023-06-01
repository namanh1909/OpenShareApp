import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import NavBar from '../../../../../components/NavBar'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MenuItem from '../../../../../components/MenuItem'

const SupportScreen = ({ navigation }) => {
    let data = [
        {
            id: 1,
            value: "0769586802",
            icon: "call-outline"
        },
        {
            id: 3,
            value: "nam.ha.61cntt@ntu.edu.vn",
            icon: "mail-outline"
        },
        {
            id: 4,
            value: "2 Đ. Nguyễn Đình Chiểu, Vĩnh Thọ, Nha Trang, Khánh Hòa",
            icon: "location-outline"
        },

    ]
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
            <FlatList data={data} renderItem={({item}) => {
                return <MenuItem title={item.value} iconName={item.icon} />
            }} />
        </View>
    )
}

export default SupportScreen

const styles = StyleSheet.create({})