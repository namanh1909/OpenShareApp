import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import NavBar from '../../../components/NavBar'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ProcessRequestScreen from './components/process'
import AcceptedRequestScreen from './components/accepted'
import DeclineRequestScreen from './components/decline'

const RequestScreen = ({ navigation }) => {
    const [tabIndex, setTabIndex] = useState(0)
    return (
        <View>
            <NavBar title="Yêu cầu của bạn"
                textCenter={true}
            />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{
                paddingHorizontal: 10,
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
                    }}>Đang yêu cầu</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTabIndex(1)} style={{
                    borderBottomWidth: tabIndex == 1 ? 3 : 0,
                    borderColor: tabIndex == 1 ? "#FFA925" : null,
                    marginRight: 25,

                }}>
                    <Text style={{
                        paddingVertical: 10,
                        fontWeight: '500'

                    }}>Được chấp nhận</Text>
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
                <TouchableOpacity style={{
                    borderBottomWidth: tabIndex == 3 ? 3 : 0,
                    borderColor: tabIndex == 3 ? "#FFA925" : null
                }} onPress={() => setTabIndex(3)}>
                    <Text style={{
                        paddingVertical: 10,
                        marginRight: 25,
                        fontWeight: '500',
                        marginLeft: 10
                    }}>Thành công</Text>
                </TouchableOpacity>

            </ScrollView>

            {
                tabIndex == 0 && <ProcessRequestScreen />
            }
            {
                tabIndex == 1 && <AcceptedRequestScreen />
            }
            {
                tabIndex == 2 && <DeclineRequestScreen />
            }
        </View>
    )
}

export default RequestScreen

const styles = StyleSheet.create({})