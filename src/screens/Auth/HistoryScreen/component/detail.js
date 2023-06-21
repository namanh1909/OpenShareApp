import { StyleSheet, Text, View, TouchableOpacity, FlatList, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import NavBar from '../../../../components/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { acceptRequest, getrequest, rejectRequest } from '../../../../redux/reducers/requestSlice';
import { getManegerRequest, getManegerRequestAll } from '../../../../redux/reducers/manegerRequestSlice';
import RenderImage from '../../../../components/RenderImage';

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Modal from "react-native-modal";
import AutoHeightTextInput from '../../../../components/AutoHeightTextInput';
import { formatTime } from '../../../../contants/helper';



const DetailRequestManegerScreen = ({ navigation, route }) => {
  const idPost = route.params.idPost
  const dispatch = useDispatch()
  const { data, error } = useSelector((state) => state.users)
  const idUser = data.idUser
  const authToken = useSelector((state) => state.auth.token)
  const dataUser = {
    idUser
  }

  const [selectUser, setSelectUser] = useState(null)
  const [refreshing, setRefreshing] = useState(false)


  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleReject, setIsModalVisibleReject] = useState(false);
  const [isModalVisibleAcp, setIsModalVisibleAcp] = useState(false);


  useEffect(() => {
    dispatch(getManegerRequestAll({ authToken, idUser }))
  }, [])

  const dataRequest = useSelector((state) => state.manegerRequest.listRequest)


  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalCancelRef = useRef(null);


  // variables
  const snapPoints = useMemo(() => ["25%", "25%"], []);

  const [message, setMessage] = useState('')
  const [messageAcp, setMessageAcp] = useState('')


  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentModalDismissPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  // console.log(dataRequest)

  return (
    <BottomSheetModalProvider>
      <Modal isVisible={isModalVisibleReject} style={{ height: 300 }}>
        <View style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#fff", height: 300 }}>
          <Text>Gửi thông tin đến người dùng</Text>
          <AutoHeightTextInput heightDefault={100} value={message} onChangeText={(value) => setMessage(value)} styles={{ flex: 1 }} />
          <View style={{
            flexDirection: "row",
            justifyContent: "space-around"
          }}>
            <TouchableOpacity onPress={() => setIsModalVisibleReject(false)} style={{
              width: 100,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
              backgroundColor: "#FFA925",
              borderRadius: 10
            }}>
              <Text style={{
                color: "#fff",
                fontWeight: "500"
              }}>Đóng</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              if (message.length <= 0) {
                Alert.alert('Vui lòng nhập thông tin')
              }
              else {
                try {
                  let dataUser = {
                    idRequest: selectUser?.idRequest,
                    idPost: selectUser?.idPost,
                    idUserRequest: selectUser?.idUserRequest,
                    message
                  }
                  setIsModalVisibleReject(false)
                  dispatch(acceptRequest({ dataUser, authToken }))
                  dispatch(getManegerRequestAll({ authToken, idUser }))
                  setIsModalVisibleReject(false)
                  setIsModalVisibleAcp(false)
                  navigation.goBack()
                } catch (err) {
                  console.log(err)
                }
              }

            }} style={{
              width: 100,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
              backgroundColor: "#FFA925",
              borderRadius: 10
            }}>
              <Text style={{
                color: "#fff",
                fontWeight: "500"
              }}>Xác nhận</Text>
            </TouchableOpacity>
          </View>

        </View>
      </Modal>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={{

        }}
      >
        <View style={styles.contentContainer}>
          <>
            <TouchableOpacity onPress={() => {
               handlePresentModalDismissPress()
               setIsModalVisibleReject(true)
            }} style={{
              height: 50,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderBottomWidth: 2,
              borderColor: "#f5f5f5"
            }}>
              <Text style={{
                fontSize: 18,
                color: "blue"
              }}>Duyệt cho</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              // console.log(selectUser)
              let dataUser = {
                idRequest: selectUser?.idRequest,
                idPost: selectUser?.idPost,
                idUserRequest: selectUser?.idUserRequest
              }
              dispatch(rejectRequest({dataUser, authToken}))
              handlePresentModalDismissPress()
              dispatch(rejectRequest({dataUser, authToken}))
              navigation.goBack()
            }} style={{
              height: 50,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderBottomWidth: 2,
              borderColor: "#f5f5f5"
            }}>
              <Text style={{
                fontSize: 18,
                color: "red"
              }}>Từ chối</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              handlePresentModalDismissPress()
            }} style={{
              height: 50,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderBottomWidth: 2,
              borderColor: "#f5f5f5"
            }}>
              <Text style={{
                fontSize: 18,
                color: "red"
              }}>Đóng</Text>
            </TouchableOpacity>
          </>

        </View>
      </BottomSheetModal>

      <View style={{flex : 1}}>
        <NavBar title="Danh sách yêu cầu"
          leftButton={
            <TouchableOpacity onPress={() => {
              navigation.goBack()
            }}
            >
              <Ionicons name="arrow-back-outline" color="#000" size={25} />
            </TouchableOpacity>
          }
        />
        {dataRequest?.length > 0 ?
          (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Text>Không có yêu cầu</Text></View>) : (<FlatList
          data={dataRequest.data}
          style={{ width: "100%", height: "100%", marginTop: 10 }}
          ListFooterComponent={<View style={{ height: 20 }} />}
          keyExtractor={(item) => item.idUser}
          ItemSeparatorComponent={() => {
            return (<View style={{ height: 10, backgroundColor: "#f5f5f5" }} />);
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                dispatch(getManegerRequestAll({ authToken, idUser }))
              }} />
            }
          renderItem={({ item, index }) => {
            if (item.idPost == idPost && item?.status == 0)
              return (
                <View
                  style={{
                    padding: 10,
                    backgroundColor: "#fff",
                    flex: 1,
                  }}
                  key={index}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    <RenderImage item={[item.photoURL]} />
                    <View
                    // onPress={() => {
                    //   navigation.navigate("DetailPost", { item });
                    // }}
                    >
                      <View
                        style={{
                          marginLeft: 10,
                          width: "100%"
                        }}
                      >
                        <View style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}>

                          <TouchableOpacity onPress={() => {
                            // console.log("item", item)
                            setSelectUser(item)
                            // console.log(selectUser)
                            setTimeout(() => {
                              handlePresentModalPress()
                            }, 500)
                          }}>
                            <Ionicons name="ellipsis-horizontal-outline" size={20} />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            marginVertical: 10
                          }}
                        >
                          <View>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate("ProfilePost", {
                                  name: item?.name
                                  ,
                                  idUser: item?.idUserRequest,
                                  photoURL: item?.photoURL,
                                });
                              }}>
                              <Text
                                lineBreakMode="tail"
                                numberOfLines={2}
                                style={{
                                  fontWeight: "bold",
                                  marginLeft: 10,
                                }}
                              >
                                {item.name}
                              </Text>
                            </TouchableOpacity>
                            <Text
                              lineBreakMode="tail"
                              numberOfLines={4}
                              style={{
                                marginLeft: 10,
                                fontSize: 16,
                                color: "gray",
                                maxWidth: 200
                              }}
                            >
                              {item.message}
                            </Text>
                            <Text
                              lineBreakMode="tail"
                              numberOfLines={2}
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                color: "gray",
                                marginVertical: 4
                              }}
                            >
                              {item?.email}
                            </Text>
                            <Text
                              lineBreakMode="tail"
                              numberOfLines={2}
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                color: "gray"
                              }}
                            >
                              {item?.phoneNumber}
                            </Text>
                            <Text
                              lineBreakMode="tail"
                              numberOfLines={2}
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                color: "gray"
                              }}
                            >
                              {formatTime(item?.requestDate)}
                            </Text>
                          </View>
                        </View>
                        <View>
                          <Text
                            style={{
                            }}
                          >
                            {/* {item.description} */}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      ></View>
                    </View>
                  </View>
                </View>
              );
          }}
          />)}

      </View>
    </BottomSheetModalProvider>
  )
}

export default DetailRequestManegerScreen

const styles = StyleSheet.create({})