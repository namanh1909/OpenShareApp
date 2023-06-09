import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, Image, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../../../../../components/NavBar'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import { getPostProfile } from '../../../../../redux/reducers/postProfileSlice'
import RenderImage from '../../../../../components/RenderImage'

const PostListScreen = ({ navigation }) => {
  const [tabIndex, setTabIndex] = useState(0)
  const dispatch = useDispatch()
  const { data, error } = useSelector((state) => state.users)
  const idUser = data?.idUser
  const authToken = useSelector((state) => state.auth.token)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    let dataUser = {
      id_Userget: idUser
    }
    dispatch(getPostProfile({ authToken, dataUser }))
  }, [])
  const dataPost = useSelector((state) => state.postProfile.data)

  console.log("data post", dataPost)

  const formatAddress = (address) => {
    let firstElement = address.split(",")[0];
    return firstElement
  }

  return (
    <View style={{ flex: 1 }}>
      <NavBar title={"Danh sách bài viết"} leftButton={
        <TouchableOpacity onPress={() => {
          navigation.goBack()
        }}
        >
          <Ionicons name="arrow-back-outline" color="#000" size={25} />
        </TouchableOpacity>
      } />
      <View style={{
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between"
      }}>
        <TouchableOpacity onPress={() => setTabIndex(0)} style={{
          borderBottomWidth: tabIndex == 0 ? 3 : 0,
          borderColor: tabIndex == 0 ? "#FFA925" : null,
          marginRight: 25,
          marginLeft: 10,
        }}>
          <Text style={{
            paddingVertical: 10,
            fontWeight: '500'
          }}>Đang chờ duyệt</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTabIndex(1)} style={{
          borderBottomWidth: tabIndex == 1 ? 3 : 0,
          borderColor: tabIndex == 1 ? "#FFA925" : null,
          marginRight: 25,

        }}>
          <Text style={{
            paddingVertical: 10,
            fontWeight: '500'

          }}>Đã duyệt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          borderBottomWidth: tabIndex == 2 ? 3 : 0,
          borderColor: tabIndex == 2 ? "#FFA925" : null,
          marginRight: 20

        }} onPress={() => setTabIndex(2)}>
          <Text style={{
            paddingVertical: 10,
            fontWeight: '500'
          }}>Bị từ chối</Text>
        </TouchableOpacity>
      </View>

      {
        tabIndex == 1 && (
          <FlatList
            data={dataPost.data}
            style={{ width: "100%", height: "100%", marginTop: 10 }}
            ListFooterComponent={<View style={{ height: 20 }} />}
            keyExtractor={(item) => item.idPost}
            ItemSeparatorComponent={() => {
              return (
                <View style={{ height: 10, backgroundColor: "#f5f5f5" }} />
              );
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  let dataUser = {
                    id_Userget: idUser,
                  };
                  dispatch(getPostProfile({ authToken, dataUser }));
                }}
              />
            }
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
              if (item.isShow == 1) {
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
                      <RenderImage item={output} />

                      <View key={item.idPost}>
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
                                height: 40,
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
                                {item.postDate}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 10,
                                  color: "green",
                                  marginLeft: 10,
                                }}
                              >
                                {item.isShow == 0
                                  ? "Đang đợi duyệt"
                                  : "Đã duyệt"}
                              </Text>
                            </View>
                          </View>
                          <View>
                            <Text
                              style={{
                                marginVertical: 10,
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
        )
      }
      {
        tabIndex == 0 && (
          <FlatList
            data={dataPost.data}
            style={{ width: "100%", height: "100%", marginTop: 10 }}
            ListFooterComponent={<View style={{ height: 20 }} />}
            keyExtractor={(item) => item.idPost}
            ItemSeparatorComponent={() => {
              return (
                <View style={{ height: 10, backgroundColor: "#f5f5f5" }} />
              );
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  let dataUser = {
                    id_Userget: idUser,
                  };
                  dispatch(getPostProfile({ authToken, dataUser }));
                }}
              />
            }
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
              if (item.isShow == 0) {
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
                                height: 40,
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
                                {item.postDate}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 10,
                                  color: "green",
                                  marginLeft: 10,
                                }}
                              >
                                {item.isShow == 0
                                  ? "Đang đợi duyệt"
                                  : "Đã duyệt"}
                              </Text>
                            </View>
                          </View>
                          <View>
                            <Text style={{}}>{item.description}</Text>
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
        )
      }

      {tabIndex == 2 && <FlatList
        data={dataPost.data}
        style={{ width: "100%", height: "100%", marginTop: 10 }}
        ListFooterComponent={<View style={{ height: 20 }} />}
        keyExtractor={(item) => item.idPost}
        ItemSeparatorComponent={() => {
          return (<View style={{ height: 10, backgroundColor: "#f5f5f5" }} />);
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              let dataUser = {
                id_Userget: idUser
              }
              dispatch(getPostProfile({ authToken, dataUser }))
            }} />
        }
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
          if (item.isShow == 2) {
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
                            height: 40,
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
                            {item.postDate}
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              color: "red",
                              marginLeft: 10,
                            }}
                          >
                            {item.isShow == 2 && "Bị từ chối"}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text style={{}}>{item.description}</Text>
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
      />}

    </View>
  )
}

export default PostListScreen

const styles = StyleSheet.create({})