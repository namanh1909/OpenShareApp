import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, Image, RefreshControl, Dimensions, Platform, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import NavBar from '../../../components/NavBar'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import { getrequest, getrequest0, getrequest1, getrequest2, getrequest3 } from '../../../redux/reducers/requestSlice'
import RenderImage from '../../../components/RenderImage'
import EmptyData from '../../../components/EmptyData'


const RequestScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { data, error } = useSelector((state) => state.users)
  const idUser = data?.idUser
  const authToken = useSelector((state) => state.auth.token)
  const dataUser = {
    idUser
  }
  const formatAddress = (address) => {
    let firstElement = address.split(",")[0];
    return firstElement
  }
  useEffect(() => {
    dispatch(getrequest0({ authToken, dataUser }))
    dispatch(getrequest1({ authToken, dataUser }))
    dispatch(getrequest2({ authToken, dataUser }))
    dispatch(getrequest3({ authToken, dataUser }))

  }, [])
  const [tabIndex, setTabIndex] = useState(route?.params?.index ? route?.params?.index : 0)

  const listRequest = useSelector((state) => state.request.data)
  const data0 = useSelector((state) => state.request.data0)
  const data1 = useSelector((state) => state.request.data1)
  const data2 = useSelector((state) => state.request.data2)
  const data3 = useSelector((state) => state.request.data3)
  const loading = useSelector((state) => state.request.loading)


  console.log("data 0", data0)
  console.log(tabIndex)


  const [refreshing, setRefreshing] = useState(false)

  const screenDimensions = Dimensions.get('screen').width;
  const screenDimensionsH = Dimensions.get('screen').height;
  if (loading == "pending") {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <NavBar title="Yêu cầu của bạn" textCenter={true} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          paddingHorizontal: 10,
        }}
        contentContainerStyle={{
          height: Platform.OS == "android" ? 70 : null,
          paddingVertical: 10,
        }}

      >
        <TouchableOpacity
          onPress={() => {
            setTabIndex(0);
            dispatch(getrequest0({ authToken, dataUser }))
          }}
          style={{
            borderBottomWidth: tabIndex == 0 ? 3 : 0,
            borderColor: tabIndex == 0 ? "#FFA925" : "red",
            marginRight: 25,
            marginLeft: 10,
          }}
        >
          <Text
            style={{
              paddingVertical: 10,
              fontWeight: "500",
              lineHeight: 30
            }}
          >
            Đang yêu cầu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTabIndex(1)
            dispatch(getrequest1({ authToken, dataUser }))
          }}
          style={{
            borderBottomWidth: tabIndex == 1 ? 3 : 0,
            borderColor: tabIndex == 1 ? "#FFA925" : null,
            marginRight: 25,
          }}
        >
          <Text
            style={{
              paddingVertical: 10,
              fontWeight: "500",
              lineHeight: 30
            }}
          >
            Được chấp nhận
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderBottomWidth: tabIndex == 2 ? 3 : 0,
            borderColor: tabIndex == 2 ? "#FFA925" : null,
            marginRight: 20,
            // height: data2?.length == 0 ? 50 : 100

          }}
          onPress={() => {
            setTabIndex(2)
            dispatch(getrequest2({ authToken, dataUser }))
          }}
        >
          <Text
            style={{
              paddingVertical: 10,
              fontWeight: "500",
              lineHeight: 30
            }}
          >
            Bị từ chối
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderBottomWidth: tabIndex == 3 ? 3 : 0,
            borderColor: tabIndex == 3 ? "#FFA925" : null,
            // height: data3?.length == 0 ? 50 : 100
          }}
          onPress={() => {
            setTabIndex(3)
            dispatch(getrequest3({ authToken, dataUser }))
          }}
        >
          <Text
            style={{
              paddingVertical: 10,
              marginRight: 25,
              fontWeight: "500",
              marginLeft: 10,
              lineHeight: 30
            }}
          >
            Thành công
          </Text>
        </TouchableOpacity>
      </ScrollView>
      {
        tabIndex == 0 &&
        (
          data0?.length > 0 ? (<FlatList
            data={data0}
            style={{ width: "100%", height: "100%", marginTop: 10 }}
            ListFooterComponent={<View style={{ height: 20 }} />}
            keyExtractor={(item) => item?.idPost}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  dispatch(getrequest({ authToken, dataUser }));
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
              return (
                <View
                  style={{
                    padding: 10,
                    backgroundColor: "#fff",
                    flex: 1,
                    paddingHorizontal: 10,
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
                      //   navigation.navigate("DetailRequest", { item });
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
                              width: 150,
                            }}
                          >
                            <Text
                              style={{
                                color: "#ffff",
                                fontWeight: "500",
                                fontSize: 12,
                              }}
                            >
                              Đang yêu cầu
                            </Text>
                          </View>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("DetailRequest", {
                                item,
                                output,
                              })
                            }
                          >
                            <Text style={{}}>Xem</Text>
                          </TouchableOpacity>
                        </View>
                        <Text
                          style={{
                            marginVertical: 10,
                            maxWidth: 200,
                          }}
                        >
                          {item.title}
                        </Text>
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
                              Đã gửi lúc {item.requestDate}
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
                            {item.message}
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
          />)
            : (<View style={{ position: "absolute", bottom: screenDimensionsH / 2, left: screenDimensions / 2 - 50 }}><Image source={require("../../../../assets/icons/Empty.png")} style={{ height: 100, width: 100 }} /></View>))
      }

      {tabIndex == 1 && (data1?.length > 0 ? (
        <FlatList
          data={data1}
          style={{ width: "100%", height: "100%", marginTop: 10 }}
          ListFooterComponent={<View style={{ height: 20 }} />}
          keyExtractor={(item) => item.idPost}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                dispatch(getrequest({ authToken, dataUser }));
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
            if (item.status == 1) {
              return (
                <View
                  style={{
                    padding: 10,
                    backgroundColor: "#fff",
                    flex: 1,
                    paddingHorizontal: 10,
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
                      //   navigation.navigate("DetailRequest", { item });
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
                              width: 150,
                            }}
                          >
                            <Text
                              style={{
                                color: "#ffff",
                                fontWeight: "500",
                                fontSize: 12,
                              }}
                            >
                              Được chấp nhận
                            </Text>
                          </View>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("DetailRequest", {
                                item,
                                output,
                              })
                            }
                          >
                            <Text
                              style={{
                                marginRight: 10,
                              }}
                            >
                              Xem
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <Text
                          style={{
                            marginVertical: 10,
                            maxWidth: 200,
                          }}
                        >
                          {item.title}
                        </Text>
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
                              Đã gửi lúc {item.requestDate}
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
                            {item.message}
                          </Text>
                        </View>

                        <View>
                          <Text
                            style={{
                              marginVertical: 10,
                              maxWidth: 200,
                            }}
                          >
                            Reply: {item.messageResponse}
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
            } else return null;
          }}
        />
      ) : (<View style={{ position: "absolute", bottom: screenDimensionsH / 2, left: screenDimensions / 2 - 50 }}><Image source={require("../../../../assets/icons/Empty.png")} style={{ height: 100, width: 100 }} /></View>))}

      {tabIndex == 2 && (data2?.length > 0 ? (
        <FlatList
          data={data2}
          style={{ width: "100%", height: "100%", marginTop: 10 }}
          ListFooterComponent={<View style={{ height: 20 }} />}
          keyExtractor={(item) => item.idPost}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                dispatch(getrequest({ authToken, dataUser }));
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
            if (item.status == 2) {
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
                      //   navigation.navigate("DetailRequest", { item });
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
                              backgroundColor: "red",
                              borderRadius: 20,
                              height: 40,
                              borderColor: "#f5f5f5",
                              borderWidth: 2,
                              width: 150,
                            }}
                          >
                            <Text
                              style={{
                                color: "#ffff",
                                fontWeight: "500",
                                fontSize: 12,
                              }}
                            >
                              Bị từ chối
                            </Text>
                          </View>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("DetailRequest", {
                                item,
                                output,
                              })
                            }
                          >
                            <Text style={{}}>Xem</Text>
                          </TouchableOpacity>
                        </View>
                        <Text
                          style={{
                            marginVertical: 10,
                            maxWidth: 200,
                          }}
                        >
                          {item.title}
                        </Text>
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
                              Đã gửi lúc {item.requestDate}
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
                            {item.message}
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
            } else return null;
          }}
        />
      ) : (<View style={{ position: "absolute", bottom: screenDimensionsH / 2, left: screenDimensions / 2 - 50 }}><Image source={require("../../../../assets/icons/Empty.png")} style={{ height: 100, width: 100 }} /></View>))}

      {tabIndex == 3 && (data3?.length > 0 ? (
        <FlatList
          data={data3}
          style={{ width: "100%", height: "100%", marginTop: 10 }}
          ListFooterComponent={<View style={{ height: 20 }} />}
          keyExtractor={(item) => item.idPost}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                dispatch(getrequest({ authToken, dataUser }));
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
            if (item.status == 3) {
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
                      //   navigation.navigate("DetailRequest", { item });
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
                              backgroundColor: "green",
                              borderRadius: 20,
                              height: 40,
                              borderColor: "#f5f5f5",
                              borderWidth: 2,
                              width: 150,
                            }}
                          >
                            <Text
                              style={{
                                color: "#ffff",
                                fontWeight: "500",
                                fontSize: 12,
                              }}
                            >
                              Thành công
                            </Text>
                          </View>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("DetailRequest", {
                                item,
                                output,
                              })
                            }
                          >
                            <Text style={{}}>Xem</Text>
                          </TouchableOpacity>
                        </View>
                        <Text
                          style={{
                            marginVertical: 10,
                            maxWidth: 200,
                          }}
                        >
                          {item.title}
                        </Text>
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
                              Đã gửi lúc {item.requestDate}
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
                            {item.message}
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
            } else return null;
          }}
        />
      ) : (<View style={{ position: "absolute", bottom: screenDimensionsH / 2, left: screenDimensions / 2 - 50 }}><Image source={require("../../../../assets/icons/Empty.png")} style={{ height: 100, width: 100 }} /></View>))}
    </View>

  );
}

export default RequestScreen

const styles = StyleSheet.create({})