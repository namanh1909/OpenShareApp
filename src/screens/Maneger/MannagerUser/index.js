import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native'
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import NavBar from '../../../components/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { getPostApprove } from '../../../redux/reducers/postApproveSlice';
import { getPostUnApprove } from '../../../redux/reducers/postUnApproveSlice';
import RenderImage from '../../../components/RenderImage';
import { getManegerUser } from '../../../redux/reducers/manegerUserSlice';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { banUser, UnbanUser } from '../../../redux/reducers/postUserAdminSlice';


const ManagerUserScreen = ({ navigation }) => {
  const token = useSelector((state) => state.auth.token);
  const [selectUser, setSelectUser] = useState(null)
  const [reset, setReset] = useState(false)
  let selectItem = useRef(null).current
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getManegerUser(token))
  }, [reset])

  const dataUser = useSelector((state => state.manegerUser.data))
  // console.log('list user', dataUser)

  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "25%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentModalDismissPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    // console.log("handleSheetChanges", index);
  }, []);


  return (
    <BottomSheetModalProvider>
    <View style={{
      flex: 1
    }}>
      <NavBar title={"Quản lý người dùng"} leftButton={
        <TouchableOpacity onPress={() => {
          navigation.goBack()
        }}
        >
          <Ionicons name="arrow-back-outline" color="#000" size={25} />
        </TouchableOpacity>
      }
      />
      <FlatList
        data={dataUser.data}
        style={{ width: "100%", height: "100%", marginTop: 10 }}
        ListFooterComponent={<View style={{ height: 20 }} />}
        keyExtractor={(item) => item.idUser}
        ItemSeparatorComponent={() => {
          return (<View style={{ height: 10, backgroundColor: "#f5f5f5" }} />);
        }}
        renderItem={({ item, index }) => {
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
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          padding: 10,
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor:
                            item.isBan == 0 ? "#31b07d" : "#c23a58",
                          borderRadius: 20,
                          height: 40,
                          width: 100,
                        }}
                      >
                        <Text
                          style={{
                            color: "#ffff",
                            fontWeight: "500",
                            fontSize: 12,
                          }}
                        >
                          {item.isBan == 0 ? "Hoạt động" : "Đã khoá"}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          setSelectUser(item);
                          // console.log(selectUser);
                          setTimeout(() => {
                            handlePresentModalPress();
                          }, 500);
                        }}
                      >
                        <Ionicons
                          name="ellipsis-horizontal-outline"
                          size={20}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginVertical: 10,
                      }}
                    >
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate("UserPost", {
                              name: item.name,
                              idUser: item.idUser,
                              photoURL: item.photoURL,
                            });
                          }}
                        >
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
                        {item?.email && (
                          <Text
                            lineBreakMode="tail"
                            numberOfLines={2}
                            style={{
                              marginLeft: 10,
                              fontSize: 10,
                              color: "gray",
                              marginVertical: 4,
                            }}
                          >
                            {item?.email}
                          </Text>
                        )}
                        {item?.phoneNumber && (
                          <Text
                            lineBreakMode="tail"
                            numberOfLines={2}
                            style={{
                              marginLeft: 10,
                              fontSize: 10,
                              color: "gray",
                            }}
                          >
                            {item?.phoneNumber}
                          </Text>
                        )}
                      </View>
                    </View>
                    <View>
                      <Text style={{}}>{/* {item.description} */}</Text>
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
      />
    </View>
    <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={{

        }}
      >
        <View style={styles.contentContainer}>
          <TouchableOpacity onPress={() => {
            // console.log(selectUser)
                navigation.navigate("UserPost", {
                  name: selectUser?.name,
                  idUser: selectUser?.idUser,
                  photoURL: selectUser?.photoURL
                })
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
              color: "blue"
            }} >Xem trang cá nhân</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            let dataUser = {
              idUser: selectUser.idUser
            }
            if(selectUser?.isBan == 0){
              dispatch(banUser({dataUser, authToken: token}))
              handlePresentModalDismissPress()
              setReset(!reset)
            }
            else {
              dispatch(UnbanUser({dataUser, authToken: token}))
              handlePresentModalDismissPress()
              setReset(!reset)
            }
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
            }}>{selectUser?.isBan == 0 ? "Khoá tài khoản" : "Mở khoá tài khoản"}</Text>
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

        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}

export default ManagerUserScreen

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  }
})