import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";


const MenuItem = ({ title, onPress, iconName, rightButton }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: "100%",
                paddingHorizontal: 20,
                alignItems: "flex-start",
                marginTop: 20,
                flex: 1

            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    // justifyContent: "space-evenly",
                    backgroundColor: "#fff",
                    alignItems: "center",
                    width: "100%",
                    padding: 10,
                    borderRadius: 20,
                }}
            >
                <Ionicons
                    name={iconName}
                    size={25}
                    style={{
                        marginRight: 20,
                    }}
                />
                <Text
                    style={{
                        fontSize: 16,
                        maxWidth: "80%"
                    }}
                >
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default MenuItem

const styles = StyleSheet.create({})