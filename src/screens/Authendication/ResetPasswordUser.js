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
import { forgotPasswordUser, login, loginAdmin } from "../../redux/reducers/authSlice";

const ResetPasswordUser = ({ navigation }) => {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
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
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Quên mật khẩu
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
            placeholder={"Email"}
            iconName="email"
            value={email}
            onChangeText={(value) => {
              setEmail(value);
            }}          />
          <Button
            onPress={() => {
              let dataUser = {
                userName: userName,
                email: email
              }
              dispatch(forgotPasswordUser(dataUser));
            }}
            text="Xác nhận thông tin"
            style={{
              marginBottom: 20,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              Đăng nhập
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
};

export default ResetPasswordUser;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
});
