import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList, Alert, RefreshControl } from 'react-native'
import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons'

import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../../../components/NavBar'
import MenuItem from '../../../components/MenuItem'
import { createType, deleteType, getType, updateType } from '../../../redux/reducers/typeAdminSlice'

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Input } from '@rneui/themed';


const TypeScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.auth.token)
  const [refreshing, setRefreshing] = useState(false)
  console.log("token", authToken)
  const [reset, setReset] = useState(true)
  const [nameType, setNameType] = useState("")

  const [typeSelect, setTypeSelect] = useState(null)

  const [nameEdit, setNameEdit] = useState("")

  const bottomSheetModalRef = useRef(null);

  const bottomSheetModalEditRef = useRef(null);


  // variables
  const snapPoints = useMemo(() => ["25%", "35%"], []);

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

  const handlePresentModalEditPress = useCallback(() => {
    bottomSheetModalEditRef.current?.present();
  }, []);

  const handlePresentModalEditDismissPress = useCallback(() => {
    bottomSheetModalEditRef.current?.dismiss();
  }, []);

  const handleSheetEditChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    dispatch(getType())
  }, [reset])

  const addressList = useSelector((state) => state.typeAdmin.data)
  console.log("address list", addressList)

  return (
    <BottomSheetModalProvider>
      <View style={{
        flex: 1,
        padding: 10
      }}>
        <NavBar title={"Danh sách đoanh mục"} leftButton={
          <TouchableOpacity onPress={() => {
            navigation.goBack()
          }}
          >
            <Ionicons name="arrow-back-outline" color="#000" size={25} />
          </TouchableOpacity>
        }
          rightButton={
            <TouchableOpacity onPress={() => {
              handlePresentModalPress()
            }}
            >
              <Ionicons name="add-outline" color="#000" size={25} />
            </TouchableOpacity>
          } />
        {addressList?.data?.length > 0 && <FlatList  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={() => {
        dispatch(getType(authToken))
      }}
    />
  } contentContainerStyle={{ marginBottom: 10 }} data={addressList?.data} keyExtractor={item => item.idType} renderItem={({ item }) => {
          console.log("item", item)
          return (
            <MenuItem title={item.nameType} iconName="grid-outline" onPress={() => {
                setTypeSelect(item)
                console.log("type select", typeSelect)
                setTimeout(() => {
                  handlePresentModalEditPress()
                  setNameEdit(typeSelect?.nameType)
                }, 500)
            }} />

          )
        }} />}
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
          <View>
            <Text style={{
              marginLeft: 10
            }} >Nhập tên loại mới</Text>
            <Input value={nameType} onChangeText={(value) => setNameType(value)} />
          </View>
          <TouchableOpacity onPress={() => {
            dispatch(createType({authToken, nameType}))
            handlePresentModalDismissPress()
            setReset(!reset)
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
            }}>Thêm</Text>
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

      <BottomSheetModal
        ref={bottomSheetModalEditRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={{

        }}
      >
        <View style={styles.contentContainer}>
          <View>
            <Text style={{
              marginLeft: 10
            }} >Chỉnh sửa</Text>
            <Input value={nameEdit} onChangeText={(value) => setNameEdit(value)} />
          </View>
          <TouchableOpacity onPress={() => {
            dispatch(updateType({authToken, nameType: nameEdit, idType: typeSelect?.idType}))
            handlePresentModalEditDismissPress()
            dispatch(getType(authToken))
            setReset(!reset)
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
            }}>Chỉnh sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {

 dispatch(deleteType({authToken, idType: typeSelect?.idType}))
            handlePresentModalEditDismissPress()
            dispatch(getType(authToken))
            setReset(!reset)          }} style={{
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
            }}>Xoá loại</Text>
            </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            handlePresentModalEditDismissPress()
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

export default TypeScreen

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20
  }
})