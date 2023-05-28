import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Animated,
    KeyboardAvoidingView,
} from "react-native";
import React, { useState, useRef } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { login, loginAdmin } from "../../redux/reducers/authSlice";

const AdminLoginScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()


    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
        }}
      >
        <View style={styles.container}>
          <View
            style={{
              marginBottom: 50,
            }}
          >
            <Text
              style={{
                fontSize: 40,
                fontWeight: "bold",
              }}
            >
              Open Share
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Nhân viên
            </Text>
          </View>

          <Input
            placeholder={"Tên đăng nhập"}
            iconName="person"
            value={userName}
            onChangeText={(value) => {
              setUserName(value);
            }}
          />
          <Input
            placeholder={"Mật khẩu"}
            iconName="lock"
            value={password}
            onChangeText={(value) => {
              setPassword(value);
            }}
            secureTextEntry={true}
          />
          <Button
            onPress={() => {
              dispatch(loginAdmin({ userName, password }));
            }}
            text="Đăng nhập"
            style={{
              marginBottom: 20,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("LoginScreen");
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              Đăng nhập người dùng
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
};

export default AdminLoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
});
