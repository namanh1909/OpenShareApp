import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import NavBar from '../../../components/NavBar'
import Ionicons from "react-native-vector-icons/Ionicons";

const TypeScreen = ({navigation}) => {
  return (
    <View>
         <NavBar title="Quản lý doanh mục"
        leftButton={
          <TouchableOpacity onPress={() => {
            navigation.goBack()
          }}
          >
            <Ionicons name="arrow-back-outline" color="#000" size={25} />
          </TouchableOpacity>
        }
        rightButton={
          <TouchableOpacity onPress={() => {
            toggleModal()
          }}
          >
            <Ionicons name="arrow-redo-outline" color="#000" size={25} />
          </TouchableOpacity>
        }
      />
    </View>
  )
}

export default TypeScreen

const styles = StyleSheet.create({})