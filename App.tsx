import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RootStack from "./src/navigation/RootStack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { LogBox } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from "./src/redux/store";


LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </SafeAreaProvider>
      </PersistGate>

    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
