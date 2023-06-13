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
import PostDetailScreen from "../screens/Auth/Post/detailPost";
import ProfilePost from "../screens/Auth/ProfilePost";
import DetailRequestManegerScreen from "../screens/Auth/HistoryScreen/component/detail";
import Top10Screen from "../screens/Auth/Top10Screen";
import DetailRequestScreen from "../screens/Auth/RequestScreen/detail";
import DetailPostNotifyScreen from "../screens/Auth/Notification/component/post";
import DetailRequestNotifyScreen from "../screens/Auth/Notification/component/request";

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
        <AuthorizedStackNavigator.Screen
        name="DetailPost"
        component={PostDetailScreen}
        options={{
          ...OPTIONS.noHeader,
        }}
      />
      <AuthorizedStackNavigator.Screen
        name="ProfilePost"
        component={ProfilePost}
        options={{
          ...OPTIONS.noHeader,
        }}
      />
      <AuthorizedStackNavigator.Screen
        name="DetailRequestManeger"
        component={DetailRequestManegerScreen}
        options={{
          ...OPTIONS.noHeader,
        }}
      />
      <AuthorizedStackNavigator.Screen
        name="Top10"
        component={Top10Screen}
        options={{
          ...OPTIONS.noHeader,
        }}
      />
         <AuthorizedStackNavigator.Screen
        name="DetailRequest"
        component={DetailRequestScreen}
        options={{
          ...OPTIONS.noHeader,
        }}
      />
      <AuthorizedStackNavigator.Screen
        name="DetailPostNotify"
        component={DetailPostNotifyScreen}
        options={{
          ...OPTIONS.noHeader,
        }}
      />
      <AuthorizedStackNavigator.Screen
        name="DetailRequestNotify"
        component={DetailRequestNotifyScreen}
        options={{
          ...OPTIONS.noHeader,
        }}
      />

    </AuthorizedStackNavigator.Navigator>
  );
};

export default AuthorizedStack;
