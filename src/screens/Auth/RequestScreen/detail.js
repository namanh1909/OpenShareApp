import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import React, { useState } from "react";
import NavBar from "../../../components/NavBar";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomImageCarousalSquare from "../../../components/carousel/components/CustomImageCarousalSquare";
import Modal from "react-native-modal";
import Input from "../../../components/Input";
import AutoHeightTextInput from "../../../components/AutoHeightTextInput";
import { useDispatch, useSelector } from "react-redux";
import { getrequest, requestPost } from "../../../redux/reducers/requestSlice";
import { Rating } from "react-native-ratings";
import Button from "../../../components/Button";
import { confirmCancel, confirmOk } from "../../../redux/reducers/detailRequestSlice";


const DetailRequestScreen = ({ navigation, route }) => {
  const output = route.params.output.map((letter) => ({ image: letter }));
  const width = Dimensions.get("window").width;
  const item = route.params.item;
  console.log("item", item);

  console.log(output);
  const [message, setMessage] = useState("");
  const formatAddress = (address) => {
    let firstElement = address.split(",")[0];
    return firstElement;
  };
  const authToken = useSelector((state) => state.auth.token);
  const { data, error } = useSelector((state) => state.users);
  const idUser = data.idUser;
  const dispatch = useDispatch();
  const [star, setStar] = useState(0);
  const dataUser = {
    idUser
  }

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [message2, setMessage2] = useState("");


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };
  const ratingCompleted = (rating) => {
    setStar(rating);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Modal isVisible={isModalVisible} style={{ height: 300 }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            height: 300,
          }}
        >
          <Rating
            showRating
            onFinishRating={ratingCompleted}
            style={{ paddingVertical: 10 }}
          />
          <Text>Nhập tin nhắn xác nhận đã nhận</Text>
          <AutoHeightTextInput
            heightDefault={100}
            value={message}
            onChangeText={(value) => setMessage(value)}
            styles={{ flex: 1 }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity
              onPress={() => toggleModal()}
              style={{
                width: 100,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
                backgroundColor: "#FFA925",
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "500",
                }}
              >
                Đóng
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                try {
                  dispatch(
                    confirmOk({
                      authToken,
                      idRequest: item.idRequest,
                      idPost: item.idPost,
                      idUserRequest: item.idUserRequest,
                      messageAfterReceiveGood: message,
                      ratingStar: star,
                    })
                  );
                  toggleModal()
                  navigation.goBack();
                  dispatch(getrequest({ authToken, dataUser }))

                } catch (err) {
                  console.log(err);
                }
              }}
              style={{
                width: 100,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
                backgroundColor: "#FFA925",
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "500",
                }}
              >
                Gửi
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal isVisible={isModalVisible2} style={{ height: 300 }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            height: 300,
          }}
        >
          <Text>Nhập tin nhắn vấn đề khi nhận</Text>
          <AutoHeightTextInput
            heightDefault={100}
            value={message2}
            onChangeText={(value) => setMessage2(value)}
            styles={{ flex: 1 }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity
              onPress={() => toggleModal2()}
              style={{
                width: 100,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
                backgroundColor: "#FFA925",
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "500",
                }}
              >
                Đóng
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                try {
                  dispatch(
                    confirmCancel({
                      authToken,
                      idRequest: item.idRequest,
                      idPost: item.idPost,
                      idUserRequest: item.idUserRequest,
                      messageAfterReceiveGood: message,
                    })
                  );
                  toggleModal2()
                  navigation.goBack();
                  dispatch(getrequest({ authToken, dataUser }))

                } catch (err) {
                  console.log(err);
                }
              }}
              style={{
                width: 100,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
                backgroundColor: "#FFA925",
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "500",
                }}
              >
                Gửi
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <NavBar
        title="Chi tiết yêu cầu"
        leftButton={
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back-outline" color="#000" size={25} />
          </TouchableOpacity>
        }
        rightButton={
          idUser !== item.idUser &&
          item.status == 1 && (
            <TouchableOpacity
              onPress={() => {
                toggleModal();
              }}
            >
              <Ionicons name="arrow-redo-outline" color="#000" size={25} />
            </TouchableOpacity>
          )
        }
      />
      <View
        style={{
          marginVertical: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
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
              marginVertical: 4,
            }}
          >
            {formatAddress(item.address)}
          </Text>
        </View>
      </View>
      <CustomImageCarousalSquare data={output} pagination={true} />
      <View
        style={{
          padding: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
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
          </View>
        </View>
      </View>
      <View
        style={{
          padding: 10,
        }}
      >
        <Text
          style={{
            fontWeight: "600",
            fontSize: 16,
          }}
        >
          {item.title}
        </Text>
        <Text>{item.description}</Text>
        {item?.message && (
          <Text style={{ marginTop: 20 }}>
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              Bạn:
            </Text>{" "}
            {item.message}
          </Text>
        )}
        {item?.messageResponse && (
          <Text>
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              Reply:
            </Text>
            {item.messageResponse}
          </Text>
        )}
         {item?.messageAfterReceiveGood && (
          <Text>
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              Bạn:
            </Text>
            {item.messageAfterReceiveGood}
          </Text>
        )}
        {
          item?.ratingStar &&  <Rating
          type='star'
          ratingCount={5}
          imageSize={30}
          startingValue={item?.ratingStar}
          showReadOnlyText
          isDisabled
          readonly={true}
          style={{backgroundColor: "#fff"}}
        />
        }

      </View>
      {item.status == 1 && <View
        style={{
          alignItems: "center",
        }}
      >
        <Button text="Từ chối/Không nhận được hàng" onPress={() => toggleModal2()} />
      </View>}

    </View>
  );
};

export default DetailRequestScreen;

const styles = StyleSheet.create({});
