import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, Image,   RefreshControl} from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../../../components/NavBar'

import { useDispatch, useSelector } from 'react-redux';
import { getManegerRequest } from '../../../redux/reducers/manegerRequestSlice';
import RenderImage from '../../../components/RenderImage';
import Ionicons from "react-native-vector-icons/Ionicons";
import { getManegerRequestAll } from '../../../redux/reducers/listRequestAllSlice';
import { confirmCancel, confirmOk } from '../../../redux/reducers/detailRequestSlice';

const HistoryScreen = ({navigation}) => {
    const [tabIndex, setTabIndex] = useState(0)
    const dispatch = useDispatch()

    const { data, error } = useSelector((state) => state.users)
  const idUser = data?.idUser
  const authToken = useSelector((state) => state.auth.token)

  const [refreshing, setRefreshing] = useState(false)


  const formatAddress = (address) => {
    let firstElement = address.split(",")[0];
    return firstElement
  }

    useEffect(() => {
        dispatch(getManegerRequest({authToken, idUser}))
        dispatch(getManegerRequestAll({ authToken, idUser }))

    },[])

    const dataRequest = useSelector((state) => state.manegerRequest.data)
    const dataRequest2 = useSelector((state) => state.listRequestAll.listRequest)


    console.log("Data Request", dataRequest)

    return (
        <View style={{flex: 1}}>
            <NavBar title="Quản lý yêu cầu"
                textCenter={true}
            />
            <View style={{
                paddingHorizontal: 10,
                flexDirection: "row",
                justifyContent: 'space-around'
            }}>
                <TouchableOpacity onPress={() => setTabIndex(0)} style={{
                    borderBottomWidth: tabIndex == 0 ? 3 : 0,
                    borderColor: tabIndex == 0 ? "#FFA925" : null,
                }}>
                    <Text style={{
                        paddingVertical: 10,
                        fontWeight: '500'
                    }}>Yêu cầu</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTabIndex(1)} style={{
                    borderBottomWidth: tabIndex == 1 ? 3 : 0,
                    borderColor: tabIndex == 1 ? "#FFA925" : null,
                }}>
                    <Text style={{
                        paddingVertical: 10,
                        fontWeight: '500'

                    }}>Xác nhận</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTabIndex(2)} style={{
                    borderBottomWidth: tabIndex == 2 ? 3 : 0,
                    borderColor: tabIndex == 2 ? "#FFA925" : null,
                }}>
                    <Text style={{
                        paddingVertical: 10,
                        fontWeight: '500'

                    }}>Thành công</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTabIndex(3)} style={{
                    borderBottomWidth: tabIndex == 3 ? 3 : 0,
                    borderColor: tabIndex == 3 ? "#FFA925" : null,
                }}>
                    <Text style={{
                        paddingVertical: 10,
                        fontWeight: '500'

                    }}>Thất bại</Text>
                </TouchableOpacity>
            </View>
            {tabIndex == 0 &&
            <FlatList
          data={dataRequest}
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
                dispatch(getManegerRequest({authToken, idUser}))
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
            if(item.status == 0) {
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
                  >
                    <View
                      style={{
                        marginLeft: 10,
                        width: "100%"
                      }}
                    >
                      <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}>
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
                            width: 100
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
                        <TouchableOpacity onPress={
                          () => navigation.navigate("DetailRequestManeger", {
                            idPost: item.idPost,
                            output
                          })
                        }>
                          <Text style={{
                          }}>Xem</Text>
                        </TouchableOpacity>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          marginVertical: 10
                        }}
                      >
                        <Image
                          source={{ uri: data?.photoURL }}
                          style={{
                            height: 40,
                            width: 40,
                            borderRadius: 20,
                          }}
                        />
                        <View>
                          <TouchableOpacity onPress={() => {
                            navigation.navigate("ProfilePost", {
                              name: item.name,
                              idUser: item.idUser,
                              photoURL: item.photoURL
                            })
                          }}>
                            <Text
                              lineBreakMode="tail"
                              numberOfLines={2}
                              style={{
                                fontWeight: "bold",
                                marginLeft: 10,
                              }}
                            >
                              {data.name}
                            </Text>
                          </TouchableOpacity>

                          <View
                            style={{
                              flexDirection: "row",
                              marginLeft: 10,
                            }}
                          >
                            <Ionicons name="location-sharp" size={15} color="#000" />
                            <Text
                              lineBreakMode="tail"
                              numberOfLines={2}
                              style={{
                                fontSize: 12,
                                marginVertical: 4
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
                              color: "gray"
                            }}
                          >
                            {item.postDate}
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
        /> }

        {tabIndex == 1 &&
        <FlatList
          data={dataRequest2.data}
          style={{ width: "100%", height: "100%", marginTop: 10 }}
          ListFooterComponent={<View style={{ height: 20 }} />}
          keyExtractor={(item) => item.idUser}
          ItemSeparatorComponent={() => {
            return (<View style={{ height: 10, backgroundColor: "#f5f5f5" }} />);
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                dispatch(getManegerRequestAll({ authToken, idUser }))
              }} />
            }
          renderItem={({ item, index }) => {
            let a = [];
            let b = item.photos;
            const c = b.replace(/[[\]]/g, "");
            a.push(c);
            // console.log(a)
            const jsonString = a[0].replace(/'/g, '"');
            const output = JSON.parse(`[${jsonString}]`);
            // console.log(output)
            let convertedUrls = output.map((url: any) => ({ url }));
            if (item?.status == 1)
              return (
                <View
                style={{
                  padding: 10,
                  backgroundColor: "#fff",
                  flex: 1,
                  paddingHorizontal: 10
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
                        width: "100%"
                      }}
                    >
                      <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}>
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
                            width: 150
                          }}
                        >
                          <Text
                            style={{
                              color: "#ffff",
                              fontWeight: "500",
                              fontSize: 12,
                            }}
                          >
                            Đang chờ xác nhận
                          </Text>
                        </View>
                        <TouchableOpacity onPress={
                          () => navigation.navigate("DetailRequest", {
                            item,
                            output
                          })
                        }>
                          <Text style={{
                          }}>Xem</Text>
                        </TouchableOpacity>
                      </View>
                      <Text style={{
                        marginVertical: 10
                      }}>{item.title}</Text>
                      <View
                        style={{
                          flexDirection: "row",
                          marginVertical: 10
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
                          <TouchableOpacity onPress={() => {
                            navigation.navigate("ProfilePost", {
                              name: item.name,
                              idUser: item.idUser,
                              photoURL: item.photoURL
                            })
                          }}>
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
                            <Ionicons name="location-sharp" size={15} color="#000" />
                            <Text
                              lineBreakMode="tail"
                              numberOfLines={2}
                              style={{
                                fontSize: 12,
                                marginVertical: 4
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
                              color: "gray"
                            }}
                          >
                            Đã gửi lúc  {item.requestDate}
                          </Text>
                        </View>

                      </View>
                      <View>
                        <Text
                          style={{
                            marginVertical: 10,
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
        />}

  {tabIndex == 2 && <FlatList
          data={dataRequest2.data}
          style={{ width: "100%", height: "100%", marginTop: 10 }}
          ListFooterComponent={<View style={{ height: 20 }} />}
          keyExtractor={(item) => item.idUser}
          ItemSeparatorComponent={() => {
            return (<View style={{ height: 10, backgroundColor: "#f5f5f5" }} />);
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                dispatch(getManegerRequestAll({ authToken, idUser }))
              }} />
            }
          renderItem={({ item, index }) => {
            let a = [];
            let b = item.photos;
            const c = b.replace(/[[\]]/g, "");
            a.push(c);
            // console.log(a)
            const jsonString = a[0].replace(/'/g, '"');
            const output = JSON.parse(`[${jsonString}]`);
            // console.log(output)
            let convertedUrls = output.map((url: any) => ({ url }));
            if (item?.status == 3)
              return (
                <View
                style={{
                  padding: 10,
                  backgroundColor: "#fff",
                  flex: 1,
                  paddingHorizontal: 10
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
                        width: "100%"
                      }}
                    >
                      <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}>
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
                            width: 150
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
                        <TouchableOpacity onPress={
                          () => navigation.navigate("DetailRequest", {
                            item,
                            output
                          })
                        }>
                          <Text style={{
                          }}>Xem</Text>
                        </TouchableOpacity>
                      </View>
                      <Text style={{
                        marginVertical: 10
                      }}>{item.title}</Text>
                      <View
                        style={{
                          flexDirection: "row",
                          marginVertical: 10
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
                          <TouchableOpacity onPress={() => {
                            navigation.navigate("ProfilePost", {
                              name: item.name,
                              idUser: item.idUser,
                              photoURL: item.photoURL
                            })
                          }}>
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
                            <Ionicons name="location-sharp" size={15} color="#000" />
                            <Text
                              lineBreakMode="tail"
                              numberOfLines={2}
                              style={{
                                fontSize: 12,
                                marginVertical: 4
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
                              color: "gray"
                            }}
                          >
                            Đã gửi lúc  {item.requestDate}
                          </Text>
                        </View>

                      </View>
                      <View>
                        <Text
                          style={{
                            marginVertical: 10,
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
        />}

{tabIndex == 3 && <FlatList
          data={dataRequest2.data}
          style={{ width: "100%", height: "100%", marginTop: 10 }}
          ListFooterComponent={<View style={{ height: 20 }} />}
          keyExtractor={(item) => item.idUser}
          ItemSeparatorComponent={() => {
            return (<View style={{ height: 10, backgroundColor: "#f5f5f5" }} />);
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                dispatch(getManegerRequestAll({ authToken, idUser }))
              }} />
            }

          renderItem={({ item, index }) => {
            let a = [];
            let b = item.photos;
            const c = b.replace(/[[\]]/g, "");
            a.push(c);
            // console.log(a)
            const jsonString = a[0].replace(/'/g, '"');
            const output = JSON.parse(`[${jsonString}]`);
            // console.log(output)
            let convertedUrls = output.map((url: any) => ({ url }));
            if (item?.status == 4)
              return (
                <View
                style={{
                  padding: 10,
                  backgroundColor: "#fff",
                  flex: 1,
                  paddingHorizontal: 10
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
                        width: "100%"
                      }}
                    >
                      <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}>
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
                            width: 150
                          }}
                        >
                          <Text
                            style={{
                              color: "#ffff",
                              fontWeight: "500",
                              fontSize: 12,
                            }}
                          >
                            Thất bại
                          </Text>
                        </View>
                        <TouchableOpacity onPress={
                          () => navigation.navigate("DetailRequest", {
                            item,
                            output
                          })
                        }>
                          <Text style={{
                          }}>Xem</Text>
                        </TouchableOpacity>
                      </View>
                      <Text style={{
                        marginVertical: 10
                      }}>{item.title}</Text>
                      <View
                        style={{
                          flexDirection: "row",
                          marginVertical: 10
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
                          <TouchableOpacity onPress={() => {
                            navigation.navigate("ProfilePost", {
                              name: item.name,
                              idUser: item.idUser,
                              photoURL: item.photoURL
                            })
                          }}>
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
                            <Ionicons name="location-sharp" size={15} color="#000" />
                            <Text
                              lineBreakMode="tail"
                              numberOfLines={2}
                              style={{
                                fontSize: 12,
                                marginVertical: 4
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
                              color: "gray"
                            }}
                          >
                            Đã gửi lúc  {item.requestDate}
                          </Text>
                        </View>

                      </View>
                      <View>
                        <Text
                          style={{
                            marginVertical: 10,
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
        />}
        </View >
    )
}

export default HistoryScreen

const styles = StyleSheet.create({})