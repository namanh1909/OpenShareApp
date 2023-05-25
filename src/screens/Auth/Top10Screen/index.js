import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import NavBar from '../../../components/NavBar'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import { getTop10 } from '../../../redux/reducers/top10Slice'
import RenderImage from '../../../components/RenderImage'


const Top10Screen = ({navigation}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTop10())
  },[])
  const dataPost = useSelector((state) => state.top10.data);
  console.log("data top 10", dataPost)

  return (
    <View style={{flex : 1}}>
              <NavBar title="Top đóng góp"
                leftButton={
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }}
                    >
                        <Ionicons name="arrow-back-outline" color="#000" size={25} />
                    </TouchableOpacity>
                }
            />
            {dataPost?.data && dataPost?.data?.length > 0 && <FlatList
        data={dataPost.data}
        style={{ width: "100%", height: "100%", marginTop: 10 }}
        ListFooterComponent={<View style={{ height: 20 }} />}
        keyExtractor={(item) => item.idUser}
        ItemSeparatorComponent={() => {
          return (<View style={{ height: 10, backgroundColor: "#f5f5f5" }} />);
        }}
        renderItem={({ item, index }) => {
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
                            numberOfLines={2}
                            style={{
                              marginLeft: 10,
                              fontSize: 18,
                              color: "gray"
                            }}
                          >
                           Điểm đóng góp: {item.SoluongdochoTC}
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

    </View>
  )
}

export default Top10Screen

const styles = StyleSheet.create({})