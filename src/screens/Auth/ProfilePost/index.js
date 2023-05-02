import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image } from 'react-native'
import React, { useEffect } from 'react'
import NavBar from '../../../components/NavBar'
import Ionicons from "react-native-vector-icons/Ionicons";
import { getPostProfile } from '../../../redux/reducers/postProfileSlice';
import { useSelector, useDispatch } from 'react-redux';


const ProfilePost = ({navigation, route}) => {
  const userName = route.params.name
  const idUser = route.params.idUser
  const photoURL = route.params.photoURL
  const authToken = useSelector((state) => state.auth.token)
  const dispatch  = useDispatch()
  console.log(authToken)

  useEffect(() => {
    let dataUser = {
      id_Userget: idUser
    }
    dispatch(getPostProfile({authToken, dataUser}))  
  },[])

  const dataPost = useSelector((state) => state.postProfile.data)
  const formatAddress = (address) => {
    let firstElement = address.split(",")[0];
    return firstElement
  }

  return (
    <View>
      <NavBar title={`Trang cá nhân của ${userName}`} leftButton={
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}
                >
                    <Ionicons name="arrow-back-outline" color="#000" size={25} />
                </TouchableOpacity>
            } />
            <View style={{
              backgroundColor: "#f5f5f5",
              height: 200,
              width: "100%",
              justifyContent: "center",
              paddingHorizontal: 20,
            }}>
              <View style={{
                flexDirection: "row"
              }}>
              <Image source={{uri: photoURL}} style={{
                height: 100,
                width: 100,
                borderRadius: 50,
              }} />
              <View>
                <Text>Thành viên</Text>
                <Text>{userName}</Text>
                <Text>Điểm đóng góp</Text>

              </View>
              </View>
             
            </View>
              {dataPost?.data && dataPost?.data?.length > 0 && (
        <FlatList
          data={dataPost.data}
          style={{ width: "100%", height: "100%", marginTop: 10 }}
          ListFooterComponent={<View style={{ height: 20 }} />}
          keyExtractor={(item) => item.idPost}
          ItemSeparatorComponent={() => {
            return (<View style={{ height: 10, backgroundColor: "#f5f5f5" }} />);
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
                  <Image
                    source={{ uri: output[0] }}
                    style={{
                      height: 150,
                      width: 130,
                    }}
                  />
                  <View
                    key={item.idPost}
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
                        <TouchableOpacity style={{}}>
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
                              idUser: item.idUser
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
          }}
        />
      )}
    </View>
  )
}

export default ProfilePost

const styles = StyleSheet.create({})