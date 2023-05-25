import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavBar from '../../../components/NavBar'
import { useDispatch, useSelector } from 'react-redux'
import { getNotify } from '../../../redux/reducers/notifyUserSlice'


const NotificationsScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { data, error } = useSelector((state) => state.users)
    const idUser = data?.idUser
    const authToken = useSelector((state) => state.auth.token)
    const dataUser = {
      idUser
    }

    useEffect(() => {
        dispatch(getNotify({authToken, dataUser}))
    },[])

    const notifyList = useSelector((state) => state.notify.data)
    console.log("data notify", notifyList)

    return (
        <View style={{flex : 1}}>
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
            <FlatList data={notifyList} keyExtractor={(item) => item.idNotice} renderItem={() => {
                return (
                    <View style={{
                        padding: 10
                    }}>
                        <Ionicons name="laptop-outline" size={70}  />
                        <View></View>
                    </View>
                )
            }} />
        </View>
    )
}

export default NotificationsScreen

const styles = StyleSheet.create({})