import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  TextInput,

} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Avatar, Badge } from "@rneui/base";
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from "../../../redux/reducers/userSlice";
import { getPost } from "../../../redux/reducers/postSlice";


const HomeScreen = ({ navigation }) => {

  // console.log("user", user);
  const [filter, setFilter] = useState(0)

  let menu = [
    {
      id: 1,
      name: "Tất cả",
      icon: "grid-outline",
    },
    {
      id: 2,
      name: "Quần áo",
      icon: "shirt-outline",
    },
    {
      id: 3,
      name: "Gia dụng",
      icon: "shapes-outline",
    },
    {
      id: 4,
      name: "Thú cưng",
      icon: "paw-outline",
    },
    {
      id: 5,
      name: "Nội thất",
      icon: "tv-outline",
    },
    {
      id: 6,
      name: "Sách",
      icon: "library-outline",
    },
  ];

  const dispatch = useDispatch()

  const token = useSelector((state) => state.auth.token)
  // console.log(token)
  useLayoutEffect(() => {
    dispatch(getUsers(token))
  }, [])

  useEffect(() => {
    dispatch(getPost(token))
  }, [])

  const dataPost = useSelector((state) => state.post.data)

  return (
    <SafeAreaView style={{
      backgroundColor: "#ffff"
    }}>
      <View
        style={{
          padding: 10,
        }}
      >
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 10,
            }}
          >
            Open Share
          </Text>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Notification')
          }}
          >
            <Ionicons name="notifications-outline" color="#000" size={25} />
            <Badge
              status="error"
              containerStyle={{ position: 'absolute', top: -5, right: -4 }}
              badgeStyle={{
                height: 14,
                width: 14,
                borderRadius: 7,
              }}
            />
          </TouchableOpacity>
        </View>

        <Input
          placeholder="Bạn muốn tìm gì?"
          style={{
            marginLeft: 10,
            width: "90%",
            backgroundColor: "#fff",
            height: 40,
          }}
          iconName="search"
        />
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{ marginVertical: 10, height: 50 }}
        showsHorizontalScrollIndicator={false}
      >
        {menu.map((item, index) => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                setFilter(index)

              }}
              style={{
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: filter == index ? '#FFA925' : "#ffff",
                borderRadius: 20,
                marginLeft: 10,
                height: 40,
                borderColor: '#f5f5f5',
                borderWidth: 2,
              }}
            >
              <Text style={{
                color: filter == index ? '#ffff' : "#ccc",
                fontWeight: "500",
                fontSize: 12,
              }}>{item.name}</Text>
            </TouchableOpacity>

          );
        })}

      </ScrollView>
      {
        dataPost?.data && dataPost?.data?.length > 0 &&
        <FlatList data={dataPost.data} keyExtractor={item =>item.idPost} renderItem={({item, index}) => {
          // let imageList = 
          let a = []
          let b = item.photos
          const c = b.replace(/[[\]]/g, '');
          a.push(c)
          // console.log(a)
          const jsonString = a[0].replace(/'/g, '"');
          const output = JSON.parse(`[${jsonString}]`);
          // console.log(output)
          return (
            <TouchableOpacity key={item.idPost}>
              <Text>{item.title}</Text>
              {
                output.map((items, index) => {
                  return (
                    <Image key={index} source={{uri: items}} style={{
                      height: 100,
                      width: 100
                    }} />
                  )
                })
              }
            </TouchableOpacity>
  
          )
        }} />
      }
    

      {/* <FlatList data={data}
        ItemSeparatorComponent={
          () => {
            return (
              <View style={{
                height: 0.4,
                backgroundColor: "gray"
              }}></View>
            )
          }
        }
        keyExtractor={item => item.id} contentContainerStyle={{
          padding: 10
        }} renderItem={({ item }) => {
          return (
            <TouchableOpacity style={{
              padding: 10,
              marginBottom: 20,
            }}>
              <View style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,

              }}>
                <Avatar source={{ uri: auth().currentUser?.photoURL }} size={40} rounded />
                <View style={{
                  marginLeft: 10,
                }}>
                  <Text style={{
                    fontWeight: 'bold'
                  }}>{item.name}</Text>
                  <Text>{item.time}</Text>
                </View>
              </View>
              <View style={{
                marginVertical: 10,
              }}>
                <Text>{item.des}</Text>
              </View>
              <Image source={{ uri: item.img }} style={{
                height: 300,
                width: "100%",
                borderRadius: 20,
              }} />
            </TouchableOpacity>
          )
        }} /> */}

    </SafeAreaView >
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
