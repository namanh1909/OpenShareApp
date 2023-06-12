import { StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import React, { useState , useEffect} from 'react'
import NavBar from '../../../../../components/NavBar'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Avatar } from '@rneui/base'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../../../../components/Input'
import { editProfile, getUsers } from '../../../../../redux/reducers/userSlice'
import ImagePicker from 'react-native-image-crop-picker';



const EditProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const authToken = useSelector((state) => state.auth.token)
    const [refreshing, setRefreshing] = useState(false)
    console.log("token auth", authToken)
    useEffect(() => {
      dispatch(getUsers(authToken))
    }, [])

    const { data, loading, error } = useSelector((state) => state.users)
    const idUser = data?.idUser
    const [name, setName] = useState(data?.name)
    const [email, setEmail] = useState(data?.email)
    const [phoneNumber, setPhoneNumber] = useState(data?.phoneNumber)
    const [photoURL, setPhotoURL] = useState(data?.photoURL)

    const openPicker =  () => {
      try {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true,
          }).then(image => {
            const base64Image = `data:${image.mime};base64,${image.data}`;
            // console.log(base64Image);
            setPhotoURL(base64Image)

          });
      } catch (error) {

      }
    }

    const submitEdit = () => {
        let dataUser = {
            idUser,
            name,
            photoURL,
            email,
            phoneNumber
        }
        // console.log(dataUser)
        dispatch(editProfile({authToken, dataUser}))
        dispatch(getUsers(authToken))
    }

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
                        submitEdit()
                    }}
                    >
                        <Ionicons name="checkmark-outline" color="#000" size={25} />
                    </TouchableOpacity>
                }
            />
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => dispatch(getUsers(authToken))
            } />} >
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
                            uri: photoURL,
                        }
                    }
                />
                <View style={{
                    marginLeft: 10,
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                    }}>Tải lên hình của bạn</Text>
                    <TouchableOpacity onPress={() => openPicker()} style={{
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
                <Input iconName={"person"} value={name} onChangeText={(value) => setName(value)} />
                <Text style={{
                    fontSize: 16,
                    fontWeight: "bold"
                }}>Email</Text>
                <Input iconName={"mail-outline"} value={email} onChangeText={(value) => setEmail(value)} />
                <Text style={{
                    fontSize: 16,
                    fontWeight: "bold"
                }}>Số điện thoại</Text>
                <Input iconName={"phone"} value={phoneNumber} onChangeText={(value) => setPhoneNumber(value)} />
            </View>
            </ScrollView>
        </View>
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({})