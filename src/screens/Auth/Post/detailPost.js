import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, Button } from 'react-native'
import React, { useState } from 'react'
import NavBar from '../../../components/NavBar'
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomImageCarousalSquare from '../../../components/carousel/components/CustomImageCarousalSquare';
import Modal from "react-native-modal";
import Input from '../../../components/Input';
import AutoHeightTextInput from '../../../components/AutoHeightTextInput';
import { useDispatch, useSelector } from 'react-redux';
import { getrequest, requestPost } from '../../../redux/reducers/requestSlice';


const DetailPostScreen = ({ navigation, route }) => {
  const output = route.params.output.map(letter => ({ image: letter }));
  const width = Dimensions.get('window').width;
  const item = route.params.item

  console.log(output)
  const [message, setMessage] = useState("")
  const formatAddress = (address) => {
    let firstElement = address.split(",")[0];
    return firstElement
  }
  const authToken = useSelector((state) => state.auth.token);
  const { data, error } = useSelector((state) => state.users)
  const idUser = data.idUser
  const dispatch = useDispatch()

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal isVisible={isModalVisible} style={{ height: 300 }}>
        <View style={{ alignItems: "center", justifyContent: "center", backgroundColor: "#fff", height: 300}}>
          <Text>Nhập tin nhắn yêu cầu</Text>
          <AutoHeightTextInput heightDefault={100} value={message} onChangeText={(value) => setMessage(value)} styles={{flex: 1}} />
          <View style={{
            flexDirection: "row",
            justifyContent: "space-around"
          }}>
          <TouchableOpacity onPress={() => toggleModal()} style={{
            width: 100,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            backgroundColor: "#FFA925",
            borderRadius: 10
          }}>
            <Text style={{
              color: "#fff",
              fontWeight: "500"
            }}>Đóng</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            let dataUser = {
              idUserRequest: idUser,
              idPost: item.idPost,
              message: message
            }
            try {
              dispatch(requestPost({authToken, dataUser}))
              dispatch(getrequest({ authToken, dataUser: idUser }));

              navigation.goBack()
            } catch (err) {
              console.log(err)
            }
          }} style={{
            width: 100,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            backgroundColor: "#FFA925",
            borderRadius: 10
          }}>
            <Text  style={{
              color: "#fff",
              fontWeight: "500"
            }}>Gửi</Text>
          </TouchableOpacity>
          </View>

        </View>
      </Modal>
      <NavBar title="Chi tiết bài viết"
        leftButton={
          <TouchableOpacity onPress={() => {
            navigation.goBack()
          }}
          >
            <Ionicons name="arrow-back-outline" color="#000" size={25} />
          </TouchableOpacity>
        }
        rightButton={
          idUser !== item.idUser &&
          <TouchableOpacity onPress={() => {
            toggleModal()
          }}
          >
            <Ionicons name="arrow-redo-outline" color="#000" size={25} />
          </TouchableOpacity>
        }
      />
      <View style={{
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10
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


      </View>
      <CustomImageCarousalSquare
        data={output}
        pagination={true}
      />
      <View style={{
        padding: 10
      }}>
        <View style={{
          flexDirection: "row"
        }}>
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
      </View>
      <View style={{
        padding: 10
      }}>
        <Text style={{
          fontWeight: "600",
          fontSize: 16
        }}>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>


    </View>
  )
}

export default DetailPostScreen

const styles = StyleSheet.create({})