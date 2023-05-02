import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState} from 'react'
import NavBar from '../../../../../components/NavBar'
import Ionicons from 'react-native-vector-icons/Ionicons'

const PostListScreen = ({ navigation }) => {    
    const [tabIndex, setTabIndex] = useState(0)
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
               <View  style={{
                paddingHorizontal: 10,
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <TouchableOpacity onPress={() => setTabIndex(0)} style={{
                    borderBottomWidth: tabIndex == 0 ? 3 : 0,
                    borderColor: tabIndex == 0 ? "#FFA925" : null,
                    marginRight: 25,
                    marginLeft: 10,
                }}>
                    <Text style={{
                        paddingVertical: 10,
                        fontWeight: '500'
                    }}>Đang chờ duyệt</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTabIndex(1)} style={{
                    borderBottomWidth: tabIndex == 1 ? 3 : 0,
                    borderColor: tabIndex == 1 ? "#FFA925" : null,
                    marginRight: 25,

                }}>
                    <Text style={{
                        paddingVertical: 10,
                        fontWeight: '500'

                    }}>Đã duyệt</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    borderBottomWidth: tabIndex == 2 ? 3 : 0,
                    borderColor: tabIndex == 2 ? "#FFA925" : null,
                    marginRight: 20

                }} onPress={() => setTabIndex(2)}>
                    <Text style={{
                        paddingVertical: 10,
                        fontWeight: '500'
                    }}>Bị từ chối</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

export default PostListScreen

const styles = StyleSheet.create({})