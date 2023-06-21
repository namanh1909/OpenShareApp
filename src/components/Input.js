import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Icon } from '@rneui/base';
import Ionicons from "react-native-vector-icons/Ionicons";


const Input = ({
  iconName,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  style,

}) => {
  const [onFocus, setOnFocus] = useState(false);
  const [show, setShow] = useState(false)
  return (
    <View
      style={{
        height: 58,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderColor: onFocus ? '#FFA925' : '#f5f5f5',
        borderWidth: 1,
        marginVertical: 10,

        width: '90%',
        ...style,
      }}>
      <Icon name={iconName} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => {
          setOnFocus(true);
        }}
        onBlur={() => {
          setOnFocus(false);
        }}
        secureTextEntry={show}
        onSubmitEditing={() => {
          setOnFocus(false);
        }}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={() => {
          setShow(!show)
        }}>
          {show == true ?
            <Ionicons name="eye-outline" size={20} /> :
            <Ionicons name="eye-off-outline" size={20} />}
        </TouchableOpacity>

      )


      }
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    height: 58,
    width: '80%',
    borderRadius: 10,
    height: 58,
    paddingHorizontal: 20,
    fontSize: 14,
    color: '#262626',
  },
});
