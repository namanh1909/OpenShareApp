import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import NavBar from '../../../components/NavBar'
import Ionicons from "react-native-vector-icons/Ionicons";
import MenuItem from '../../../components/MenuItem';


const HomeScreen = ({ navigation }) => {

    const listMenuItem = [
        {
            id: 1,
            name: 'Quản lý bài viết',
            icon: 'flag-outline'
        },
        {
            id: 2,
            name: 'Quản lý doanh mục',
            icon: 'grid-outline'
        },
        {
            id: 3,
            name: 'Quản lý người dùng',
            icon: 'happy-outline'
        },
        {
            id: 0,
            name: 'Chỉnh sửa trang cá nhân',
            icon: 'person-outline'
        },
        {
            id: 4,
            name: 'Đổi mật khẩu',
            icon: 'lock-closed-outline'
        },
        {
            id: 5,
            name: 'Đăng xuất',
            icon: 'log-out-outline'
        },
    ]

    function handleButtonMenu(id) {
        switch (id) {
          case 0: navigation.navigate("EditProfile")
            break
          case 5: dispatch(logout())
            break
          case 1: navigation.navigate("ManegerPost")
            break
          case 2: navigation.navigate("Type")
            break
          case 3: navigation.navigate("Support")
            break
          case 4: navigation.navigate("ChangePassword")
            break
          default: break
        }
    }

    return (
        <View>
            <NavBar title="Trang quản lý" textCenter />
            <FlatList data={listMenuItem} keyExtractor={item => item.id} renderItem={({ item }) => {
                return (
                    <MenuItem title={item.name} key={item.id} iconName={item.icon} onPress={() => handleButtonMenu(item.id)} />
                )
            }} />   
             </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})