import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Authendication/LoginScreen";
import SplashScreen from "../screens/Authendication/SplashScreen";
import AdminLoginScreen from "../screens/Authendication/AdminLoginScrene";
import HomeDashBoardScreen from "../screens/Auth/HomeScreen/HomeDashboard";
import ResetPasswordUser from "../screens/Authendication/ResetPasswordUser";
import ResetPasswordAdmin from "../screens/Authendication/ResetPasswordAdmin";

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
        component={HomeDashBoardScreen}
        name="HomeDashBoard"
        options={{
          ...OPTIONS.noHeader,
        }}
      />
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
       <UnauthorizedStackNavigator.Screen
        component={ResetPasswordUser}
        name="ResetPasswordUser"
        options={{
          ...OPTIONS.noHeader,
        }}
      />
         <UnauthorizedStackNavigator.Screen
        component={ResetPasswordAdmin}
        name="ResetPasswordAdmin"
        options={{
          ...OPTIONS.noHeader,
        }}
      />
    </UnauthorizedStackNavigator.Navigator>
  );
};

export default UnauthorizedStack;
