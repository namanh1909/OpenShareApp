import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import NavBar from "../../../../../components/NavBar";
import Ionicons from "react-native-vector-icons/Ionicons";
import Input from "../../../../../components/Input";
import AutoHeightTextInput from "../../../../../components/AutoHeightTextInput";
import ImagePicker from "react-native-image-crop-picker";
import {Dimensions} from 'react-native';



const CreatePost = ({ navigation }) => {
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(false)
  const windowWidth = Dimensions.get('window').width;


  const openPicker = async () => {
    try {
    setLoading(true)
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        includeBase64: true,
        multiple: true,
      });
      image.forEach((element, index) => {
        let newList = imageList;
        let base64Images = `data:${element.mime};base64,${element.data}`;
        newList.push(base64Images);
        setImageList(newList);
      });
      setLoading(false)
      console.log(imageList);
    } catch (error) {}
  };
  console.log("listimage", imageList.length);
  return (
    <View>
      <NavBar
        title="Tạo bài viết mới"
        leftButton={
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back-outline" color="#000" size={25} />
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
        <AutoHeightTextInput heightDefault={50} />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Mô tả
        </Text>
        <AutoHeightTextInput heightDefault={100} />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Địa chỉ
        </Text>
        <AutoHeightTextInput heightDefault={50} />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Loại vật phẩm
        </Text>
        <AutoHeightTextInput heightDefault={50} />
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
          onPress={() => openPicker()}
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
    </View>
  );
};

export default CreatePost;

const styles = StyleSheet.create({});
