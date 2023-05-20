import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavBar from '../../../../../components/NavBar'
import MenuItem from '../../../../../components/MenuItem'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAddress, getAddress } from '../../../../../redux/reducers/addressSlice'


const AddressListScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.users.data)
    const authToken = useSelector((state) => state.auth.token)
    const idUser = user?.idUser
    console.log("token", authToken)
    const [reset, setReset] = useState(true)

    useEffect(() => {
        dispatch(getAddress({ authToken, idUser }))
    },[reset])

    const addressList = useSelector((state) => state.address.data)
    console.log("address list", addressList)

    return (
        <View style={{
            flex: 1,
            padding: 10
        }}>
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
          {addressList?.length > 0 &&  <FlatList contentContainerStyle={{ marginBottom: 10}} data={addressList} keyExtractor={item=>item.idAdress} renderItem={({item}) => {
            console.log("item", item)
            return (
                <MenuItem title={item.address} iconName="navigate-outline" onPress={() => {
                    Alert.alert('Xác nhận', 'Bạn có muốn xoá địa chỉ này', [
                        {
                          text: 'OK',
                          onPress: () => {
                            dispatch(deleteAddress({authToken, idAdress: `${item.idAdress}`})) 
                            dispatch(getAddress({ authToken, idUser }))
                            setReset(!reset)
                          },
                        },
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                      ]);
                } } />

            )
          }} />} 
        </View>
    )
}

export default AddressListScreen

const styles = StyleSheet.create({})