import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState , useEffect} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Avatar } from '@rneui/base'
import { useDispatch, useSelector } from 'react-redux'
// import { editProfile, getUsers } from '../../../../../redux/reducers/userSlice'
import ImagePicker from 'react-native-image-crop-picker';
import NavBar from '../../../components/NavBar'
import {
  editProfile,
  editProfileAdmin,
  getStaff,
} from "../../../redux/reducers/userSlice";
import Input from "../../../components/Input";

const ProfileAdminScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  useEffect(() => {
    dispatch(getStaff(authToken));
  }, []);

  const { data, loading, error } = useSelector((state) => state.users);
  console.log(data);
  const idStaff = data.idStaff;
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [phoneNumber, setPhoneNumber] = useState(data.phoneNumber);
  const [photoURL, setPhotoURL] = useState(data.photoURL);
  const [address, setAddress] = useState(data.address);

  const openPicker = () => {
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
      }).then((image) => {
        const base64Image = `data:${image.mime};base64,${image.data}`;
        // console.log(base64Image);
        setPhotoURL(base64Image);
      });
    } catch (error) {}
  };

  const submitEdit = () => {
    let dataUser = {
      idStaff,
      name,
      photoURL,
      email,
      phoneNumber,
      address,
    };
    // console.log(dataUser)
    dispatch(editProfileAdmin({ authToken, dataUser }));
    dispatch(getStaff(authToken));
    navigation.goBack();
  };

  return (
    <View>
      <NavBar
        title={"Chỉnh sửa thông tin"}
        leftButton={
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back-outline" color="#000" size={25} />
          </TouchableOpacity>
        }
        rightButton={
          <TouchableOpacity
            onPress={() => {
              submitEdit();
            }}
          >
            <Ionicons name="checkmark-outline" color="#000" size={25} />
          </TouchableOpacity>
        }
      />
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 20,
        }}
      >
        <Avatar
          size={100}
          rounded
          source={{
            uri: photoURL,
          }}
        />
        <View
          style={{
            marginLeft: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Update your picture
          </Text>
          <TouchableOpacity
            onPress={() => openPicker()}
            style={{
              padding: 10,
              backgroundColor: "#FFA925",
              width: 100,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: "#fff",
              }}
            >
              Tải lên
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          marginLeft: 20,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Họ và tên
        </Text>
        <Input
          iconName={"person"}
          value={name}
          onChangeText={(value) => setName(value)}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Email
        </Text>
        <Input
          iconName={"mail-outline"}
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Phone Number
        </Text>
        <Input
          iconName={"phone"}
          value={phoneNumber}
          onChangeText={(value) => setPhoneNumber(value)}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Địa chỉ
        </Text>
        <Input
          iconName={"home"}
          value={address}
          onChangeText={(value) => setAddress(value)}
        />
      </View>
    </View>
  );
};

export default ProfileAdminScreen

const styles = StyleSheet.create({})