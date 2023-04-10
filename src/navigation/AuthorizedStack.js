import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Auth/HomeScreen/HomeScreen";
import TabNavigation from "./TabNavigation";
// import EditAddressScreen from "../screens/Auth/EditAddressScreen";
import SupportScreen from "../screens/Auth/ProfileScreen/components/support";
import PostListScreen from "../screens/Auth/ProfileScreen/components/post";
import AddressListScreen from "../screens/Auth/ProfileScreen/components/address";
import CreateAddressScreen from "../screens/Auth/ProfileScreen/components/address/CreateAddressScreen";
import CreatePost from "../screens/Auth/ProfileScreen/components/post/create";
import NotificationsScreen from "../screens/Auth/Notification";
import EditProfileScreen from "../screens/Auth/ProfileScreen/components/editProfile";
import ChangePasswordScreen from "../screens/Auth/ProfileScreen/components/changePassword";

const AuthorizedStack = () => {
  const AuthorizedStackNavigator = createNativeStackNavigator();
  const OPTIONS = {
    noHeader: {
      headerShown: false,
    },
  };

  return (
    <AuthorizedStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthorizedStackNavigator.Screen
        name="Tab"
        component={TabNavigation}
        options={{
          ...OPTIONS.noHeader,
        }}
      />
      {/* <AuthorizedStackNavigator.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          ...OPTIONS.noHeader,
        }}
      /> */}
      <AuthorizedStackNavigator.Screen
        name="CreatePost"
        component={CreatePost}
        options={{
          ...OPTIONS.noHeader,
        }}
      />
      <AuthorizedStackNavigator.Screen
        name="Address"
        component={AddressListScreen}
        options={{
          ...OPTIONS.noHeader,
        }}
      />
      <AuthorizedStackNavigator.Screen
        name="CreateAddress"
        component={CreateAddressScreen}
        options={{
          ...OPTIONS.noHeader,
        }}
      />
      {/* <AuthorizedStackNavigator.Screen
        name="EditAddress"
        component={EditAddressScreen}
        options={{
          ...OPTIONS.noHeader,
        }}
      /> */}
      <AuthorizedStackNavigator.Screen
        name="Support"
        component={SupportScreen}
        options={{
          ...OPTIONS.noHeader,
        }}
      />
      <AuthorizedStackNavigator.Screen
        name="PostList"
        component={PostListScreen}
        options={{
          ...OPTIONS.noHeader,
        }}
      />
      <AuthorizedStackNavigator.Screen
        name="Notification"
        component={NotificationsScreen}
        options={{
          ...OPTIONS.noHeader,
        }}
      />
      <AuthorizedStackNavigator.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          ...OPTIONS.noHeader,
        }}
      />
      <AuthorizedStackNavigator.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          ...OPTIONS.noHeader,
        }}
      />
    </AuthorizedStackNavigator.Navigator>
  );
};

export default AuthorizedStack;
