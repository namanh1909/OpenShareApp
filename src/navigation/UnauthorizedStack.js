import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Authendication/LoginScreen";
import SplashScreen from "../screens/Authendication/SplashScreen";
import AdminLoginScreen from "../screens/Authendication/AdminLoginScrene";

const UnauthorizedStackNavigator = createNativeStackNavigator();
const OPTIONS = {
  noHeader: {
    headerShown: false,
  },
};

const UnauthorizedStack = () => {
  return (
    <UnauthorizedStackNavigator.Navigator>
      <UnauthorizedStackNavigator.Screen
        component={LoginScreen}
        name="LoginScreen"
        options={{
          ...OPTIONS.noHeader,
        }}
      />
      <UnauthorizedStackNavigator.Screen
        component={AdminLoginScreen}
        name="AdminLogin"
        options={{
          ...OPTIONS.noHeader,
        }}
      />
    </UnauthorizedStackNavigator.Navigator>
  );
};

export default UnauthorizedStack;
