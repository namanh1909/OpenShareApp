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
  forgotPasswordUser,
  login,
  loginAdmin,
  resetSendOTP,
  sendOTPUser,
} from "../../redux/reducers/authSlice";
import { set } from "immer/dist/internal";

const ResetPasswordUser = ({ navigation }) => {
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
                if(code.length > 0){
                  let dataUser = {
                    userName: userName,
                    email: email,
                    otp: code,
                  };
                  dispatch(sendOTPUser(dataUser));
                }
                else {
                  return Alert.alert("OTP không được bỏ trống")
                }
              }}
              text="Nhập mã OTP"
              style={{
                marginBottom: 20,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                if (userName.length > 0 && email.length > 0) {
                  let dataUser = {
                    userName: userName,
                    email: email,
                  };
                  dispatch(forgotPasswordUser(dataUser));
                }
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  marginBottom: 10
                }}
              >
                Gửi lại OTP
              </Text>
            </TouchableOpacity>
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
                if(userName.length > 0 && email.length > 0){
                  let dataUser = {
                    userName: userName,
                    email: email,
                  };
                  dispatch(forgotPasswordUser(dataUser));
                }
                else {
                  return Alert.alert("Vui lòng nhập đầy đủ thông tin")
                }
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

export default ResetPasswordUser;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
});
