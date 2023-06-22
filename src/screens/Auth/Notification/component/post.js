import {
    StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, Button, ActivityIndicator, ScrollView
} from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import NavBar from '../../../../components/NavBar'
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomImageCarousalSquare from '../../../../components/carousel/components/CustomImageCarousalSquare';
import Modal from "react-native-modal";
import Input from '../../../../components/Input';
import AutoHeightTextInput from '../../../../components/AutoHeightTextInput';
import { useDispatch, useSelector } from 'react-redux';
import { getrequest, requestPost } from '../../../../redux/reducers/requestSlice';
import { seenAcpPost } from '../../../../redux/reducers/notifyUserSlice';
import { convertImage } from '../../../../contants/helper';


const DetailPostNotifyScreen = ({ navigation, route }) => {
    const authToken = useSelector((state) => state.auth.token);
    const idPost = route?.params?.idPost
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(seenAcpPost({ authToken, dataUser: { idPost }, }))
    }, [])
    let itemPost = useSelector((state) => state.notify.detailPost)
    let loading = useSelector((state) => state.notify.loading)

    let item = itemPost?.data
    const output = itemPost?.output

    // console.log("itemPost", item)
    // console.log("output", output)
    const formatAddress = (address) => {
        let firstElement = address?.split(",")[0];
        return firstElement
    }

    if (loading == "pending") {
        return (
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                <ActivityIndicator size="small" color="#0000ff" />
            </View>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <NavBar title="Chi tiết bài viết"
                leftButton={
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }}
                    >
                        <Ionicons name="arrow-back-outline" color="#000" size={25} />
                    </TouchableOpacity>
                }
            />
            <ScrollView>
            <View style={{
                marginVertical: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10
            }}>
                <View
                    style={{
                        padding: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#FFA925",
                        borderRadius: 20,
                        height: 40,
                        borderColor: "#f5f5f5",
                        borderWidth: 2,
                        width: 100
                    }}
                >
                    <Text
                        style={{
                            color: "#ffff",
                            fontWeight: "500",
                            fontSize: 12,
                        }}
                    >
                        {item?.nameType}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        marginLeft: 10,
                    }}
                >
                    <Ionicons name="location-sharp" size={15} color="#000" />
                    <Text
                        lineBreakMode="tail"
                        numberOfLines={2}
                        style={{
                            fontSize: 12,
                            marginVertical: 4
                        }}
                    >
                        {formatAddress(item?.address)}
                    </Text>
                </View>


            </View>
            <CustomImageCarousalSquare
                data={output}
                pagination={true}
            />
            <View style={{
                padding: 10
            }}>
                <View style={{
                    flexDirection: "row"
                }}>
                    <Image
                        source={{ uri: item?.photoURL }}
                        style={{
                            height: 40,
                            width: 40,
                            borderRadius: 20,
                        }}
                    />
                    <View>
                        <TouchableOpacity onPress={() => {

                        }}>
                            <Text
                                lineBreakMode="tail"
                                numberOfLines={2}
                                style={{
                                    fontWeight: "bold",
                                    marginLeft: 10,
                                }}
                            >
                                {item?.name}
                            </Text>
                        </TouchableOpacity>
                        <Text
                            lineBreakMode="tail"
                            numberOfLines={2}
                            style={{
                                marginLeft: 10,
                                fontSize: 10,
                                color: "gray"
                            }}
                        >
                            {item?.postDate}
                        </Text>
                    </View>

                </View>
            </View>
            <Text style={{
                fontSize: 10,
                color: "green",
                marginLeft: 10,
            }}>{item.isShow == 0 ? "Đang đợi duyệt" : "Đã được duyệt"}</Text>
            <View style={{
                padding: 10
            }}>
                <Text style={{
                    fontWeight: "600",
                    fontSize: 16
                }}>{item?.title}</Text>
                <Text>{item?.description}</Text>

            </View>
            </ScrollView>
        </View>
    )
}

export default DetailPostNotifyScreen

const styles = StyleSheet.create({})