import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { Avatar } from "@rneui/themed";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "../../../components/MenuItem";
import { getUsers } from "../../../redux/reducers/userSlice";
import { logout } from "../../../redux/reducers/authSlice";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch()


  function handleButtonMenu(id) {
    switch (id) {
      case 0: navigation.navigate("EditProfile")
        break
      case 5: dispatch(logout())
        break
      case 1: navigation.navigate("PostList")
        break
      case 2: navigation.navigate("Address")
        break
      case 3: navigation.navigate("Support")
        break
      case 4: navigation.navigate("ChangePassword")
        break
      default: break
    }
  }

  const listMenuItem = [
    {
      id: 0,
      name: 'Chỉnh sửa trang cá nhân',
      icon: 'person-outline'
    },
    {
      id: 1,
      name: 'Bài viết của bạn',
      icon: 'flag-outline'
    },
    {
      id: 2,
      name: 'Địa chỉ đã lưu',
      icon: 'navigate-outline'
    },
    {
      id: 3,
      name: 'Hổ trợ',
      icon: 'call-outline'
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

  const token = useSelector((state) => state.auth.token)
  console.log(token)
  useLayoutEffect(() => {
    dispatch(getUsers(token))
  }, [])

  const { data, loading, error } = useSelector((state) => state.users)
  console.log(data)
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f5f5f5",
        marginTop: 20,
      }}
    >
      <View style={{
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center"
      }}>
        <Avatar
          size={100}
          rounded
          source={
            data?.photoURL
              ? data?.photoURL
              : {
                uri: "https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg",
              }
          }
        />
        <View style={{
          marginLeft: 20
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: "600"
          }}>
            {data?.name}
          </Text>
          <Text style={{
            fontSize: 14,
            fontWeight: "600",
            color: "gray"
          }}>
            Người dùng
          </Text>
        </View>
      </View>

      <Text
        style={{
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        {/* {user?.phoneNumber} */}
      </Text>
      <FlatList data={listMenuItem} keyExtractor={item => item.id} renderItem={({ item }) => {
        return (
          <MenuItem title={item.name} key={item.id} iconName={item.icon} onPress={() => handleButtonMenu(item.id)} />
        )
      }} />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
