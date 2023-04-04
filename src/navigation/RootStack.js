import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/Authendication/SplashScreen";
import AuthorizedStack from "./AuthorizedStack";
import UnauthorizedStack from "./UnauthorizedStack";
import { useSelector } from "react-redux";

const RootStackNavigator = createNativeStackNavigator();

const RootStack = () => {

  const { error, isLoading, token } = useSelector((state) => state.auth)

  const OPTIONS = {
    noHeader: {
      headerShown: false,
    },
  }
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

  if (token?.length > 0) {
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
  else {
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
};

export default RootStack;
