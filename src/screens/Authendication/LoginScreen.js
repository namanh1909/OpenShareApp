import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import React, { useState, useRef } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../redux/reducers/authSlice";

const LoginScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()

  const [isAlredyAccount, setIsAlredyAccount] = useState(true)

  let loading = useSelector((state) => state.auth.isLoading)

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        {loading ? <ActivityIndicator size="small" color="#0000ff" />: <>
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
        </View>
        {isAlredyAccount ? (
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
                if(userName.length > 0 && password.length > 0){
                  dispatch(login({ userName, password }));
                }
                else {
                  return Alert.alert("Vui lòng nhập đầy đủ thông tin")
                }
              }}
              text="Đăng nhập"
              style={{
                marginBottom: 20,
              }}
            />
          </>
        ) : (
          <>
            <Input
              placeholder={"Nhập tên của bạn"}
              iconName="person"
              value={name}
              onChangeText={(value) => {
                setName(value);
              }}
            />
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
                if(name.length > 0 && userName.length > 0 && password.length > 0){
                  console.log(name, password, userName);
                  dispatch(register({ name, password, userName }));
                }
                else {
                  return Alert.alert("Vui lòng nhập đầy đủ thông tin")
                }
              }}
              text="Đăng kí"
              style={{
                marginBottom: 20,
              }}
            />
          </>
        )}
        {
          isAlredyAccount && <TouchableOpacity
        style={{marginBottom: 10}}
          onPress={() => {
            navigation.navigate("ResetPasswordUser")
          }}
        >
          <Text
            style={{
              color: "#FFA925",
            }}
          >
            Quên mật khẩu
          </Text>
        </TouchableOpacity>
        }

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{}}>
            {isAlredyAccount ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setIsAlredyAccount(!isAlredyAccount);
            }}
          >
            <Text
              style={{
                color: "#FFA925",
              }}
            >
              {isAlredyAccount ? " Đăng kí ngay" : " Đăng nhập"}
            </Text>
          </TouchableOpacity>


        </View>

        <Text
          style={{
            marginVertical: 20,
          }}
        >
          or
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AdminLogin");
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            Đăng nhập nhân viên
          </Text>
        </TouchableOpacity>
        </> }

      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
