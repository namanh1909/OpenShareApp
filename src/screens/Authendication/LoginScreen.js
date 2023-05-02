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
import { login, register } from "../../redux/reducers/authSlice";

const LoginScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()

  const [isAlredyAccount, setIsAlredyAccount] = useState(true)

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1
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
        </View>
        {
          isAlredyAccount ?
            <>
              <Input
                placeholder={"Username"}
                iconName="person"
                value={userName}
                onChangeText={(value) => {
                  setUserName(value);
                }}
              />
              <Input
                placeholder={"Password"}
                iconName="lock"
                value={password}
                onChangeText={(value) => {
                  setPassword(value);
                }}
              />
              <Button
                onPress={() => {
                  dispatch(login({ userName, password }))
                }}
                text="Login"
                style={{
                  marginBottom: 20,
                }}
              />
            </> : <>
              <Input
                placeholder={"Enter your name"}
                iconName="person"
                value={name}
                onChangeText={(value) => {
                  setName(value);
                }}
              />
              <Input
                placeholder={"Username"}
                iconName="person"
                value={userName}
                onChangeText={(value) => {
                  setUserName(value);
                }}
              />
              <Input
                placeholder={"Password"}
                iconName="lock"
                value={password}
                onChangeText={(value) => {
                  setPassword(value);
                }}
              />
              <Button
                onPress={() => {
                  console.log(name, password, userName)
                  dispatch(register({ name, password, userName }))
                }}
                text="Register"
                style={{
                  marginBottom: 20,
                }}
              />
            </>
        }

        <View style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Text style={{
          }} >{isAlredyAccount ? "Dont have account?" : "Alrealdy have account?"}</Text>
          <TouchableOpacity onPress={() => {
            setIsAlredyAccount(!isAlredyAccount)
          }}>
            <Text style={{
              color: "#FFA925"
            }}>{isAlredyAccount ? " Register" : " Login"}</Text>
          </TouchableOpacity>

        </View>
        <Text style={{
          marginVertical: 20
        }}>or</Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate("AdminLogin")
        }}>
          <Text style={{
            fontWeight: "bold"
          }}>Login with admin</Text>
        </TouchableOpacity>

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
