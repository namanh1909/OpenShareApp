import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import NavBar from '../../../../../components/NavBar'
import Ionicons from 'react-native-vector-icons/Ionicons'

const PostListScreen = ({ navigation }) => {
    return (
        <View>
            <NavBar title={"Danh sách bài viết"} leftButton={
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}
                >
                    <Ionicons name="arrow-back-outline" color="#000" size={25} />
                </TouchableOpacity>
            } />
        </View>
    )
}

export default PostListScreen

const styles = StyleSheet.create({})