import React from "react";
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { CurvedBottomBar } from "react-native-curved-bottom-bar";
import Ionicons from "react-native-vector-icons/Ionicons";
import HistoryScreen from "../screens/Auth/HistoryScreen";
import HomeScreen from "../screens/Auth/HomeScreen/HomeScreen";
import ProfileScreen from "../screens/Auth/ProfileScreen";
import RequestScreen from "../screens/Auth/RequestScreen";

export default TabNavigation = ({ navigation }) => {
  const _renderIcon = (routeName, selectedTab) => {
    let icon = "";
    switch (routeName) {
      case "Home":
        icon = "ios-home-outline";
        break;
      case "Profile":
        icon = "person-outline";
        break;
      case "History":
        icon = "timer-outline";
        break;
      case "Order":
        icon = "reader-outline";
        break;
    }

    return (
      <Ionicons
        name={icon}
        size={25}
        color={routeName === selectedTab ? "black" : "gray"}
      />
    );
  };
  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <NavigationContainer> */}
      <CurvedBottomBar.Navigator
        style={styles.bottomBar}
        screenOptions={{
          headerShown: false,
        }}
        strokeWidth={0.5}
        strokeColor="#DDDDDD"
        height={55}
        circleWidth={50}
        bgColor="white"
        initialRouteName="Home"
        borderTopLeftRight
        renderCircle={({ selectedTab, navigate }) => (
          <Animated.View style={styles.btnCircle}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
              }}
              onPress={() => navigation.navigate("CreatePost")}
            >
              <Ionicons name={"add-outline"} color="gray" size={25} />
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}
      >
        <CurvedBottomBar.Screen
          name="Home"
          position="LEFT"
          component={HomeScreen}
        />
        <CurvedBottomBar.Screen
          name="Order"
          position="LEFT"
          component={RequestScreen}
        />
        <CurvedBottomBar.Screen
          name="History"
          component={HistoryScreen}
          position="RIGHT"
        />
        <CurvedBottomBar.Screen
          name="Profile"
          component={ProfileScreen}
          position="RIGHT"
        />
      </CurvedBottomBar.Navigator>
      {/* </NavigationContainer> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    marginVertical: 5,
  },
  bottomBar: {},
  btnCircle: {
    width: 60,
    height: 60,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
    bottom: 30,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: "gray",
  },
  img: {
    width: 30,
    height: 30,
  },
});
