import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreens from "../screens/Authendication/SplashScreen";
import AuthorizedStack from "./AuthorizedStack";
import UnauthorizedStack from "./UnauthorizedStack";
import { useSelector } from "react-redux";
import AdminStack from "./AdminStack";
import SplashScreen from 'react-native-splash-screen'

const RootStackNavigator = createNativeStackNavigator();

const RootStack = () => {
  const { error, isLoading, token } = useSelector((state) => state.auth);

  const { data } = useSelector((state) => state.users);
  // console.log("data", data)
  // console.log(token)

  useEffect(() => {
    SplashScreen.hide()  
  },[])

  const OPTIONS = {
    noHeader: {
      headerShown: false,
    },
  };
  // if (isAppInit) {
  //   return (
  //     <RootStackNavigator.Navigator screenOptions={{ ...OPTIONS.noHeader }}>
  //       <RootStackNavigator.Screen
  //         component={SplashScreen}
  //         name="SplashScreen"
  //         options={{
  //           ...OPTIONS.noHeader,
  //         }}
  //       />
  //     </RootStackNavigator.Navigator>
  //   );
  // }
  if (!token) {
    return (
      <RootStackNavigator.Navigator>
        <RootStackNavigator.Screen
          component={UnauthorizedStack}
          name="UnauthorStack"
          options={{
            ...OPTIONS.noHeader,
          }}
        />
      </RootStackNavigator.Navigator>
    );
  }
  if (token?.length > 0 && data?.idRole != null) {
    return (
      <RootStackNavigator.Navigator>
        <RootStackNavigator.Screen
          component={AdminStack}
          name="AuthorizedStack"
          options={{
            ...OPTIONS.noHeader,
          }}
        />
      </RootStackNavigator.Navigator>
    );
  } else if (token?.length > 0 && !data?.idRole) {
    return (
      <RootStackNavigator.Navigator>
        <RootStackNavigator.Screen
          component={AuthorizedStack}
          name="AuthorizedStack"
          options={{
            ...OPTIONS.noHeader,
          }}
        />
      </RootStackNavigator.Navigator>
    );
  }
};

export default RootStack;
