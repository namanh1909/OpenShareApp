import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons'

import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../../../components/NavBar'
import MenuItem from '../../../components/MenuItem'
import { getType } from '../../../redux/reducers/typeAdminSlice'

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Input } from '@rneui/themed';


const TypeScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const authToken = useSelector((state) => state.auth.token)
  console.log("token", authToken)
  const [reset, setReset] = useState(true)

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "35%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentModalDismissPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    dispatch(getType(authToken))
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
        {addressList?.data?.length > 0 && <FlatList contentContainerStyle={{ marginBottom: 10 }} data={addressList?.data} keyExtractor={item => item.idType} renderItem={({ item }) => {
          console.log("item", item)
          return (
            <MenuItem title={item.nameType} iconName="grid-outline" onPress={() => {
              Alert.alert('Xác nhận', 'Bạn có muốn xoá loại vật phẩm này', [
                {
                  text: 'OK',
                  onPress: () => {
                    // dispatch(deleteAddress({authToken, idAdress: `${item.idAdress}`})) 
                    // dispatch(getAddress({ authToken, idUser }))
                    setReset(!reset)
                  },
                },
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
              ]);
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
            <Input />
          </View>
          <TouchableOpacity style={{
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