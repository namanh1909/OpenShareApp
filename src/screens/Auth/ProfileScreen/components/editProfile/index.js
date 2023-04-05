import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import NavBar from '../../../../../components/NavBar'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Avatar } from '@rneui/base'
import { useSelector } from 'react-redux'
import Input from '../../../../../components/Input'

const EditProfileScreen = ({ navigation }) => {
    const { data, loading, error } = useSelector((state) => state.users)

    return (
        <View>
            <NavBar title={"Chỉnh sửa thông tin"}
                leftButton={
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
                paddingHorizontal: 20,
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 20,
            }}>
                <Avatar
                    size={100}
                    rounded
                    source={
                        {
                            uri: data.photoURL,
                        }
                    }
                />
                <View style={{
                    marginLeft: 10,
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                    }}>Update your picture</Text>
                    <TouchableOpacity style={{
                        padding: 10,
                        backgroundColor: "#FFA925",
                        width: 100,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10,
                        marginTop: 10,
                    }}>
                        <Text style={{
                            color: "#fff"
                        }}>Tải lên</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{
                marginLeft: 20
            }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: "bold"
                }}>Họ và tên</Text>
                <Input iconName={"person"} value={data.name} />
                <Text style={{
                    fontSize: 16,
                    fontWeight: "bold"
                }}>Email</Text>
                <Input iconName={"mail-outline"} value={data.email} />
                <Text style={{
                    fontSize: 16,
                    fontWeight: "bold"
                }}>Phone Number</Text>
                <Input iconName={"phone"} value={data.phoneNumber} />
            </View>
        </View>
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({})