import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import NavBar from '../../../components/NavBar'
import GiveScreen from './components/GiveScreen';
import ReceiveScreen from './components/ReceiveScreen';

const HistoryScreen = () => {
    const [tabIndex, setTabIndex] = useState(0)

    return (
        <View>
            <NavBar title="Quản lý yêu cầu"
                textCenter={true}
            />
            <View style={{
                paddingHorizontal: 10,
                flexDirection: "row",
                justifyContent: 'space-around'
            }}>
                <TouchableOpacity onPress={() => setTabIndex(0)} style={{
                    borderBottomWidth: tabIndex == 0 ? 3 : 0,
                    borderColor: tabIndex == 0 ? "#FFA925" : null,
                }}>
                    <Text style={{
                        paddingVertical: 10,
                        fontWeight: '500'
                    }}>Yêu cầu</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTabIndex(1)} style={{
                    borderBottomWidth: tabIndex == 1 ? 3 : 0,
                    borderColor: tabIndex == 1 ? "#FFA925" : null,
                }}>
                    <Text style={{
                        paddingVertical: 10,
                        fontWeight: '500'

                    }}>Xác nhận</Text>
                </TouchableOpacity>


            </View>
        </View >
    )
}

export default HistoryScreen

const styles = StyleSheet.create({})