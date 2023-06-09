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
import React, { useState, useRef, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPasswordAdmin,
  forgotPasswordUser,
  login,
  loginAdmin,
  resetSendOTP,
  sendOTPAdmin,
} from "../../redux/reducers/authSlice";

const ResetPasswordAdmin = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const isSendOTP = useSelector((state) => state.auth.isSendOTP);
  console.log("isSend", isSendOTP);

  useEffect(() => {
    dispatch(resetSendOTP());
  }, []);

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
            Nhân viên
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: 30,
            }}
          >
            Quên mật khẩu
          </Text>
        </View>

        {isSendOTP ? (
          <>
            <Input
              placeholder={"Nhập mã OTP"}
              iconName="person"
              value={code}
              onChangeText={(value) => {
                setCode(value);
              }}
            />
            <Button
              onPress={() => {
                let dataUser = {
                  userName: userName,
                  email: email,
                  otp: code,
                };
                dispatch(sendOTPAdmin(dataUser));
              }}
              text="Nhập mã OTP"
              style={{
                marginBottom: 20,
              }}
            />
          </>
        ) : (
          <>
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
              }}
            />
            <Button
              onPress={() => {
                let dataUser = {
                  userName: userName,
                  email: email,
                };
                dispatch(forgotPasswordAdmin(dataUser));
              }}
              text="Xác nhận thông tin"
              style={{
                marginBottom: 20,
              }}
            />
          </>
        )}

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

export default ResetPasswordAdmin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
});
