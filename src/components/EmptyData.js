import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const EmptyData = () => {
  return (
    <View style={{justifyContent: "center", alignItems: "center", paddingTop: 50}}>
          <Image source={require("../../assets/icons/Empty.png")} style={{width: 100, height: 100}} />
    </View>
  )
}

export default EmptyData

const styles = StyleSheet.create({})