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
            {tabIndex == 0 && <FlatList
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

        {tabIndex == 1 && <FlatList
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
            if (item?.status == 1)
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
                    <RenderImage item={[item.photoURL]} />
                    <View
                    // onPress={() => {
                    //   navigation.navigate("DetailPost", { item });
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

                          <TouchableOpacity onPress={() => {
                            console.log("item", item)
                            setSelectUser(item)
                            console.log(selectUser)
                            setTimeout(() => {
                              handlePresentModalPress()
                            }, 500)
                          }}>
                            <Ionicons name="ellipsis-horizontal-outline" size={20} />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            marginVertical: 10
                          }}
                        >
                          <View>
                            <TouchableOpacity onPress={() => {

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
                            <Text
                              lineBreakMode="tail"
                              numberOfLines={4}
                              style={{
                                marginLeft: 10,
                                fontSize: 16,
                                color: "gray",
                                maxWidth: 200
                              }}
                            >
                              {item.message}
                            </Text>
                            <Text
                              lineBreakMode="tail"
                              numberOfLines={2}
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                color: "gray",
                                marginVertical: 4
                              }}
                            >
                              {item?.email}
                            </Text>
                            <Text
                              lineBreakMode="tail"
                              numberOfLines={2}
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                color: "gray"
                              }}
                            >
                              {item?.phoneNumber}
                            </Text>
                          </View>
                        </View>
                        <View>
                          <Text
                            style={{
                            }}
                          >
                          </Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => {
                              dispatch(confirmOk({authToken, idRequest: item.idRequest}))
                              dispatch(getManegerRequestAll({ authToken, idUser }))

                            }}>
                              <Text style={{color: "green", marginBottom: 10}}>Thành công</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                              dispatch(confirmCancel({authToken, idRequest: item.idRequest}))
                              dispatch(getManegerRequestAll({ authToken, idUser }))

                            }}>
                              <Text style={{color: "red", marginBottom: 10}}>Thất bại</Text>
                            </TouchableOpacity>
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
            if (item?.status == 3)
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
                    <RenderImage item={[item.photoURL]} />
                    <View
                    // onPress={() => {
                    //   navigation.navigate("DetailPost", { item });
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

                          <TouchableOpacity onPress={() => {
                            console.log("item", item)
                            setSelectUser(item)
                            console.log(selectUser)
                            setTimeout(() => {
                              handlePresentModalPress()
                            }, 500)
                          }}>
                            <Ionicons name="ellipsis-horizontal-outline" size={20} />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            marginVertical: 10
                          }}
                        >
                          <View>
                            <TouchableOpacity onPress={() => {

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
                            <Text
                              lineBreakMode="tail"
                              numberOfLines={4}
                              style={{
                                marginLeft: 10,
                                fontSize: 16,
                                color: "gray",
                                maxWidth: 200
                              }}
                            >
                              {item.message}1231231231ais[pdi[apisd[as[dp]]]]
                            </Text>
                            <Text
                              lineBreakMode="tail"
                              numberOfLines={2}
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                color: "gray",
                                marginVertical: 4
                              }}
                            >
                              {item?.email}
                            </Text>
                            <Text
                              lineBreakMode="tail"
                              numberOfLines={2}
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                color: "gray"
                              }}
                            >
                              {item?.phoneNumber}
                            </Text>
                          </View>
                        </View>
                        <View>
                          <Text
                            style={{
                            }}
                          >
                            {/* {item.description} */}
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
            if (item?.status == 4)
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
                    <RenderImage item={[item.photoURL]} />
                    <View
                    // onPress={() => {
                    //   navigation.navigate("DetailPost", { item });
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

                          <TouchableOpacity onPress={() => {
                            console.log("item", item)
                            setSelectUser(item)
                            console.log(selectUser)
                            setTimeout(() => {
                              handlePresentModalPress()
                            }, 500)
                          }}>
                            <Ionicons name="ellipsis-horizontal-outline" size={20} />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            marginVertical: 10
                          }}
                        >
                          <View>
                            <TouchableOpacity onPress={() => {

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
                            <Text
                              lineBreakMode="tail"
                              numberOfLines={4}
                              style={{
                                marginLeft: 10,
                                fontSize: 16,
                                color: "gray",
                                maxWidth: 200
                              }}
                            >
                              {item.message}
                            </Text>
                            <Text
                              lineBreakMode="tail"
                              numberOfLines={2}
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                color: "gray",
                                marginVertical: 4
                              }}
                            >
                              {item?.email}
                            </Text>
                            <Text
                              lineBreakMode="tail"
                              numberOfLines={2}
                              style={{
                                marginLeft: 10,
                                fontSize: 10,
                                color: "gray"
                              }}
                            >
                              {item?.phoneNumber}
                            </Text>
                          </View>
                        </View>
                        <View>
                          <Text
                            style={{
                            }}
                          >
                            {/* {item.description} */}
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