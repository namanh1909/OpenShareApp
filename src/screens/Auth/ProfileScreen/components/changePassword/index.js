import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavBar from '../../../../../components/NavBar'
import Input from '../../../../../components/Input'

const ChangePasswordScreen = ({ navigation }) => {
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
                        navigation.goBack()
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
                <Input secureTextEntry={true} />
                <Text style={{
                    fontSize: 16,
                    fontWeight: "bold"
                }}>Mật khẩu mới</Text>
                <Input secureTextEntry={true} />
                <Text style={{
                    fontSize: 16,
                    fontWeight: "bold"
                }}>Nhập lại khẩu cũ</Text>
                <Input secureTextEntry={true} />
            </View>

        </View>
    )
}

export default ChangePasswordScreen

const styles = StyleSheet.create({})