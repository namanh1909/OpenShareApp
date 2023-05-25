import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import NavBar from "../../../../../components/NavBar";
import Ionicons from "react-native-vector-icons/Ionicons";
import Input from "../../../../../components/Input";
import AutoHeightTextInput from "../../../../../components/AutoHeightTextInput";
import ImagePicker from "react-native-image-crop-picker";
import {Dimensions} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../../../../redux/reducers/postSlice";
import storage from '@react-native-firebase/storage';
import DropDownPicker from "react-native-dropdown-picker";
import { getAddress } from "../../../../../redux/reducers/addressSlice";
import { getType } from "../../../../../redux/reducers/typeSlice";
import { CommonActions } from '@react-navigation/native';

const CreatePost = ({ navigation }) => {
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(false)
  const windowWidth = Dimensions.get('window').width;
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [address, setAddress] = useState("")
  const [idType, setType] = useState('')
  const { data, error } = useSelector((state) => state.users)
  const idUser = data?.idUser
  const authToken = useSelector((state) => state.auth.token)
  const [openAddressPicker, setOPenAddressPicker] = useState(false)
  const [selectAddress, setSelectAddress] = useState(null)

  const [openTypePicker, setOpenTypePicker] = useState(false)
  const [selectType, setSelectType] = useState(null)

  const [number, setNumber] = useState('')

  console.log(authToken)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAddress({authToken, idUser}))
  }, [])
  useEffect(() => {
    dispatch(getType())
  },[])


  const listItemAddress = useSelector((state) => state.address.listItemAddress)
  const listTypeItem = useSelector((state) => state.type.listTypeItem)
  console.log("listaddress", listItemAddress)

  // const [listItemAddress, setlistItemAddress] = useState(addressList?.map((province) => ({
  //       label: province.address,
  //       value: province.address,
  //   })))
//   const listItemAddress = 

const typePost = useSelector((state) => state.type.data)


// const listTypeItem = typePost?.data?.map((province) => ({
//   label: province.nameType,
//   value: province.nameType,
//   typeNumber: province.idType,
// }))

console.log(listTypeItem)

const uploadImages = async (images) => {
  try {
    setLoading(true)
    const urls = [];
    await Promise.all(
      images.map(async (image) => {
        const reference = storage().ref(`images/${image.path}`);
        await reference.putFile(image.path);
        const url = await reference.getDownloadURL();
        urls.push(url);
      })
    );
    return urls;
  } catch (error) {
    console.error(error);
  }
};

const getDownloadUrls = async (images) => {
  try {
    const urls = [];
    await Promise.all(
      images.map(async (image) => {
        const reference = storage().ref(`images/${image.path}`);
        const url = await reference.getDownloadURL();
        urls.push(url);
      })
    );
    return urls;
  } catch (error) {
    console.error(error);
  }
};

const selectImages = async () => {
  try {
    const images = await ImagePicker.openPicker({
      multiple: true,
    });
    const uploadUrls = await uploadImages(images);
    const downloadUrls = await getDownloadUrls(images);
   let newList = imageList.concat(downloadUrls)
    setImageList(newList)
    console.log('Upload URLs:', uploadUrls);
    console.log('Download URLs:', downloadUrls);
    setLoading(false)
  } catch (error) {
    console.error(error);
  }
};

  const handleCreatePost = () => {
    try {
      let dataPost = {
        title,
        description,
        address,
        idUser,
        idType,
        photos: `${JSON.stringify(imageList)}`,
        soluongdocho: number,      
      } 
      console.log("datapost", dataPost)
      dispatch(createPost({authToken, dataPost}))
      navigation.goBack()
    } catch (error) {
      
    }
    
  }

  const handleChangeType = (type) => {
    setType(type.value)
  }

  console.log("listimage", imageList.length);
  return (
    <ScrollView style={{flex: 1}}>
      <NavBar
        title="Tạo bài viết mới"
        leftButton={
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(CommonActions.goBack());
            }}
          >
            <Ionicons name="arrow-back-outline" color="#000" size={25} />
          </TouchableOpacity>
        }

        rightButton={
          <TouchableOpacity
            onPress={() => {
              handleCreatePost()
            }}
          >
            <Ionicons name="checkmark-outline" color="#000" size={25} />
          </TouchableOpacity>
        }
      />
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 30,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Tiêu đề
        </Text>
        <AutoHeightTextInput heightDefault={50} value={title} onChangeText={(value) => setTitle(value)} />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Mô tả
        </Text>
        <AutoHeightTextInput heightDefault={100} value={description} onChangeText={(value) => setDescription(value)} />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Địa chỉ
        </Text>
        <DropDownPicker
                open={openAddressPicker}
                value={selectAddress}
                items={listItemAddress}
                setOpen={setOPenAddressPicker}
                setValue={setSelectAddress}
                style={{
                  marginVertical: 10
                }}
                onSelectItem={(item) => setAddress(item.value)}
            />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Loại vật phẩm
        </Text>
        <DropDownPicker
                open={openTypePicker}
                value={selectType}
                items={listTypeItem}
                setOpen={setOpenTypePicker}
                setValue={setSelectType}
                style={{
                  marginVertical: 10
                }}
                onSelectItem={(item) => { 
                  console.log(item) 
                  setType(item.value)}
                }
            />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Số lượng cho
        </Text>
        <AutoHeightTextInput heightDefault={50} value={number} onChangeText={(value) => setNumber(value)}  />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Ảnh mô tả
        </Text>
        <ScrollView horizontal style={{
            marginTop: 10,
        }}>
        {
         imageList.map((items, index) => {
                return (
                  <Image key={index} source={{uri: items}} style={{
                    height: 100,
                    width: 100,
                    marginRight: 10,
                    borderRadius: 10
                  }} />
                )
              })
        }
        {
            loading && <Text>Loading</Text>
        }
    
        <TouchableOpacity
          onPress={() => selectImages()}
          style={{
            backgroundColor: "#fff",
            width: 100,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
        >
          <Ionicons name={"image-outline"} size={30} />
          <Text
            style={{
              fontSize: 10,
            }}
          >
            Chọn ảnh
          </Text>
        </TouchableOpacity>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default CreatePost;

const styles = StyleSheet.create({});
