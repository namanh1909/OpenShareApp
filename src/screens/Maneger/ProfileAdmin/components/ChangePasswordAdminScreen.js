import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../../../../components/NavBar'
import Input from '../../../../components/Input'
const ChangePasswordAdminScreen = ({ navigation }) => {
    const [old_password, setOldPassword] = useState('')
    const [new_password, setNewPassword] = useState('')
    const { data, loading, error } = useSelector((state) => state.users)
    const id = data.idUser
    const dispatch = useDispatch()
    const authToken = useSelector((state) => state.auth.token)


    const handleChangePassword = () => {
        let dataUser = {
            id,
            old_password,
            new_password
        }
        console.log(dataUser)
        // dispatch(changePasswordUser({authToken, dataUser}))
    }

    return (
        <View>
            <NavBar title={"Thay đổi mật khẩu"} leftButton={
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}
                >
                    <Ionicons name="arrow-back-outline" color="#000" size={25} />
                </TouchableOpacity>
            }
                rightButton={
                    <TouchableOpacity onPress={() => {
                        handleChangePassword()
                    }}
                    >
                        <Ionicons name="checkmark-outline" color="#000" size={25} />
                    </TouchableOpacity>
                }
            />

            <View style={{
                marginVertical: 20,
                marginHorizontal: 20
            }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: "bold"
                }}>Mật khẩu cũ</Text>
                <Input  value={old_password} onChangeText={(value) => setOldPassword(value)} />
                <Text style={{
                    fontSize: 16,
                    fontWeight: "bold"
                }}>Mật khẩu mới</Text>
                <Input value={new_password} onChangeText={(value) => setNewPassword(value)} />
                <Text style={{
                    fontSize: 16,
                    fontWeight: "bold"
                }}>Nhập lại khẩu mới</Text>
                <Input secureTextEntry={true} />
            </View>

        </View>
    )
}

export default ChangePasswordAdminScreen

const styles = StyleSheet.create({})