import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, Image, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import NavBar from '../../../components/NavBar'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import { getrequest } from '../../../redux/reducers/requestSlice'
import RenderImage from '../../../components/RenderImage'
import EmptyData from '../../../components/EmptyData'


const RequestScreen = ({ navigation }) => {
  const [tabIndex, setTabIndex] = useState(0)
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
    dispatch(getrequest({ authToken, dataUser }))
  }, [])

  const listRequest = useSelector((state) => state.request.data)

  console.log("list request", listRequest?.data)
  const [refreshing, setRefreshing] = useState(false)


  return (
    <View style={{ flex: 1 }}>
      <NavBar title="Yêu cầu của bạn" textCenter={true} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => setTabIndex(0)}
          style={{
            borderBottomWidth: tabIndex == 0 ? 3 : 0,
            borderColor: tabIndex == 0 ? "#FFA925" : null,
            marginRight: 25,
            marginLeft: 10,
          }}
        >
          <Text
            style={{
              paddingVertical: 10,
              fontWeight: "500",
            }}
          >
            Đang yêu cầu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTabIndex(1)}
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
          }}
          onPress={() => setTabIndex(2)}
        >
          <Text
            style={{
              paddingVertical: 10,
              fontWeight: "500",
            }}
          >
            Bị từ chối
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderBottomWidth: tabIndex == 3 ? 3 : 0,
            borderColor: tabIndex == 3 ? "#FFA925" : null,
          }}
          onPress={() => setTabIndex(3)}
        >
          <Text
            style={{
              paddingVertical: 10,
              marginRight: 25,
              fontWeight: "500",
              marginLeft: 10,
            }}
          >
            Thành công
          </Text>
        </TouchableOpacity>
      </ScrollView>
      {tabIndex == 0 && listRequest?.data && listRequest?.data?.length > 0 && (
        <FlatList
          data={listRequest?.data}
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
            if (item.status == 0) {
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
            } else return null;
          }}
        />
      )}

      {tabIndex == 1 && listRequest?.data && listRequest?.data?.length > 0 && (
        <FlatList
          data={listRequest?.data}
          style={{ width: "100%", height: "100%", marginTop: 10 }}
          ListFooterComponent={<View style={{ height: 20 }} />}
          keyExtractor={(item) => item.idPost}
          ItemSeparatorComponent={() => {
            return <View style={{ height: 10, backgroundColor: "#f5f5f5" }} />;
          }}
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
            }
            else return null
          }}
        />
      )}

      {
        tabIndex == 2 && listRequest?.data && listRequest?.data?.length > 0 && (
          <FlatList
            data={listRequest?.data}
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
              }
              else return null
            }}
          />
        )
      }

      {
        tabIndex == 3 && listRequest?.data && listRequest?.data?.length > 0 && (
          <FlatList
            data={listRequest?.data}
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
            ItemSeparatorComponent={() => {
              return (
                <View style={{ height: 10, backgroundColor: "#f5f5f5" }} />
              );
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
              }
              else return null
            }}
          />
        )
      }
    </View>
  )
}

export default RequestScreen

const styles = StyleSheet.create({})