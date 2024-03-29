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
  Modal,
  RefreshControl,
  ActivityIndicator
} from "react-native";
import React, { useLayoutEffect, useState, useEffect, useMemo } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Avatar, Badge } from "@rneui/base";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/reducers/userSlice";
import { getPost } from "../../../redux/reducers/postSlice";
import { getType } from "../../../redux/reducers/typeSlice";
import RenderImage from "../../../components/RenderImage";
import ImageViewer from "react-native-image-zoom-viewer";
import { formatTime } from "../../../contants/helper";

const HomeScreen = ({ navigation }) => {
  const [filter, setFilter] = useState(0);
  const [indexType, setIndexType] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [refreshing, setRefreshing] = useState(false);

  useLayoutEffect(() => {
    dispatch(getUsers(token));
  }, []);

  useEffect(() => {
    dispatch(getPost());
    dispatch(getType());
  }, []);

  function searchPosts(posts, searchText) {
    try {
      searchText = searchText.toLowerCase();
      return posts?.data?.filter((post) => {
        const { address, nameType, title, description, name } = post;
        return (
          address.toLowerCase().includes(searchText) ||
          nameType.toLowerCase().includes(searchText) ||
          title.toLowerCase().includes(searchText) ||
          name.toLowerCase().includes(searchText) ||
          description.toLowerCase().includes(searchText)
        );
      });
    } catch (error) {}
  }

  const dataPost = useSelector((state) => state.post.data);
  let loading = useSelector((state) => state.post.loading);

  let typePost = useSelector((state) => state.type.data);

  const formatAddress = (address) => {
    let firstElement = address.split(",")[0];
    return firstElement;
  };
  const [visible, setIsVisible] = useState(false);

  let filteredPosts = searchPosts(dataPost, searchValue);

  useEffect(() => {
    const newData = filteredPosts?.filter((post) => post.idType === indexType);
    if (indexType !== 0) filteredPosts = newData;
  }, [filteredPosts, indexType]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#f5f5f5",
        flex: 1,

      }}
    >
      <View
        style={{
          padding: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 10,
            }}
          >
            Open Share
          </Text> */}
          <Image
            source={require("../../../../assets/icons/logoOpenShare.png")}
            style={{
              width: 140,
              height: 60,
            }}
          />
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => {
                navigation.navigate("Top10");
              }}
            >
              <Ionicons name="fitness-outline" color="#000" size={25} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Notification");
              }}
            >
              <Ionicons name="notifications-outline" color="#000" size={25} />
              <Badge
                status="error"
                containerStyle={{ position: "absolute", top: -5, right: -4 }}
                badgeStyle={{
                  height: 14,
                  width: 14,
                  borderRadius: 7,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Input
          placeholder="Bạn muốn tìm gì?"
          style={{
            marginLeft: 10,
            width: "90%",
            backgroundColor: "#fff",
            height: 40,
          }}
          value={searchValue}
          onChangeText={(value) => setSearchValue(value)}
          iconName="search"
        />
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{ marginVertical: 10, height: 60 }}
        showsHorizontalScrollIndicator={false}
      >
           <TouchableOpacity
                onPress={() => {
                  setFilter(0);
                  setIndexType(0)
                }}
                style={{
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: filter == 0 ? "#FFA925" : "#ffff",
                  borderRadius: 20,
                  marginLeft: 10,
                  height: 50,
                  borderColor: "#f5f5f5",
                  borderWidth: 2,
                }}
              >
                <Text
                  style={{
                    color: filter == 0 ? "#ffff" : "#ccc",
                    fontWeight: "500",
                    fontSize: 12,
                  }}
                >
                  Tất cả
                </Text>
              </TouchableOpacity>
        {typePost?.data &&
          typePost?.data?.length > 0 &&
          typePost?.data?.map((item, index) => {
            index = index + 1
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setFilter(index);
                  setIndexType(item.idType);
                }}
                style={{
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: filter == index ? "#FFA925" : "#ffff",
                  borderRadius: 20,
                  marginLeft: 10,
                  height: 50,
                  borderColor: "#f5f5f5",
                  borderWidth: 2,
                }}
              >
                <Text
                  style={{
                    color: filter == index ? "#ffff" : "#ccc",
                    fontWeight: "500",
                    fontSize: 12,
                  }}
                >
                  {item.nameType}
                </Text>
              </TouchableOpacity>
            );
          })}

      </ScrollView>
      {loading == "pending" && <ActivityIndicator />}
      {dataPost?.data && dataPost?.data?.length > 0 && (
        <FlatList
          data={filteredPosts}
          style={{ width: "100%", height: "100%", marginTop: 10 }}
          ListFooterComponent={<View style={{ height: 20 }} />}
          keyExtractor={(item) => item.idPost}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                dispatch(getPost(token));
              }}
            />
          }
          ItemSeparatorComponent={() => {
            return <View style={{ height: 10, backgroundColor: "#f5f5f5" }} />;
          }}
          renderItem={({ item, index }) => {
            // let imageList =
            let a = [];
            let b = item.photos;
            const c = b.replace(/[[\]]/g, "");
            a.push(c);
            // console.log(a)
            const jsonString = a[0].replace(/'/g, '"');
            const output = JSON.parse(`[${jsonString}]`);
            // console.log(output)
            let convertedUrls = output.map((url: any) => ({ url }));
            if (
              item.idType == indexType ||
              filter == 0 ||
              item.soluongdocho > 0
            ) {
              return (
                <View
                  style={{
                    padding: 10,
                    backgroundColor: "#fff",
                    flex: 1,
                    maxWidth: "100%"
                  }}
                  key={index}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    <RenderImage item={output} />

                    <View
                      key={item.idPost}
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
                              backgroundColor: "#FFA925",
                              borderRadius: 20,
                              height: 50,
                              borderColor: "#f5f5f5",
                              borderWidth: 2,
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
                              {item.nameType}
                            </Text>
                          </View>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("DetailPost", {
                                item,
                                output,
                              })
                            }
                          >
                            <Text style={{}}>Xem</Text>
                          </TouchableOpacity>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            marginVertical: 10,
                          }}
                        >
                          <Image
                            source={{ uri: item.photoURL }}
                            style={{
                              height: 40,
                              width: 40,
                              borderRadius: 20,
                            }}
                          />
                          <View>
                            <TouchableOpacity
                              onPress={() => {
                                navigation.navigate("ProfilePost", {
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

                            <View
                              style={{
                                flexDirection: "row",
                                marginLeft: 10,
                              }}
                            >
                              <Ionicons
                                name="location-sharp"
                                size={15}
                                color="#000"
                              />
                              <Text
                                lineBreakMode="tail"
                                numberOfLines={2}
                                style={{
                                  fontSize: 12,
                                  marginVertical: 4,
                                }}
                              >
                                {formatAddress(item.address)}
                              </Text>
                            </View>
                            <Text
                              lineBreakMode="tail"
                              numberOfLines={2}
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                color: "gray",
                              }}
                            >
                              {formatTime(item.postDate)}
                            </Text>
                          </View>
                        </View>
                        <View>
                          <Text
                            style={{
                              marginVertical: 10,
                              maxWidth: 200,
                            }}
                          >
                            {item.description}
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
            }
          }}
        />
      )}

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
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
