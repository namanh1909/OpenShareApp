import { StyleSheet, Text, View, Animated } from "react-native";
import React, { useRef } from "react";

const SplashScreen = () => {
  let logoAnimated = useRef(new Animated.Value(0.5)).current;

  return (
    <Animated.View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.Text
        style={{
          fontSize: 40,
          fontWeight: "bold",
          // transform: [{ scale: logoAnimated }],
        }}
      >
        Open Share
      </Animated.Text>
    </Animated.View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
