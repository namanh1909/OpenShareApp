import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Button = ({text, onPress, style}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{
        marginVertical: 10,
        height: 58,
        width: "90%",
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#FFA925",
        borderRadius: 10,
        ...style
    }}>
        <Text style={{
            fontSize: 18,
            color: "#fff",
            fontWeight: "500"
        }}>{text}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({})