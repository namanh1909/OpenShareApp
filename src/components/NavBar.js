import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';

const NavBar = ({ leftButton, title, rightButton, textCenter }) => {
  return (
    <SafeAreaView
      style={{
        borderBottomWidth: 2,
        borderColor: '#ECEBEB',
      }}>
      {textCenter ? <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: "center",
          paddingVertical: 10,
        }}>
        {title}
      </Text> : <View style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}>
        {leftButton}
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          {title}
        </Text>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {rightButton}
        </View>
      </View>}

    </SafeAreaView>
  );
};

export default NavBar;

const styles = StyleSheet.create({});
