import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Button,
  Alert,
} from "react-native";
import React, { useState, useCallback, useMemo, useRef } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { requestPost } from "../../../redux/reducers/requestSlice";
import NavBar from "../../../../components/NavBar";
import AutoHeightTextInput from "../../../../components/AutoHeightTextInput";
import CustomImageCarousalSquare from "../../../../components/carousel/components/CustomImageCarousalSquare";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { approvePost, deletePost, unApprovePost } from "../../../../redux/reducers/avpproveSlice";
import { getPostUnApprove } from "../../../../redux/reducers/postUnApproveSlice";

const DetailPostScreen = ({ navigation, route }) => {
  const output = route.params.output.map((letter) => ({ image: letter }));
  const width = Dimensions.get("window").width;
  const item = route.params.item;
  // // console.log("item", item)
  // console.log(output);
  const [message, setMessage] = useState("");
  const formatAddress = (address) => {
    let firstElement = address.split(",")[0];
    return firstElement;
  };
  const authToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleReject, setIsModalVisibleReject] = useState(false);

  const user = useSelector((state) => state.users.data)

  // console.log("user", user)

  const idStaff = user.idStaff

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalCancelRef = useRef(null);


  // variables
  const snapPoints = useMemo(() => ["25%", "25%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentModalDismissPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheetModalProvider>
      <View style={{ flex: 1 }}>
        <NavBar
          title="Chi tiết bài viết"
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
            <TouchableOpacity
              onPress={() => {
                handlePresentModalPress();
              }}
            >
              <Ionicons name="arrow-redo-outline" color="#000" size={25} />
            </TouchableOpacity>
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
          {/* <View
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
        </View> */}
          <Text
            style={{
              fontSize: 10,
              color: "green",
              marginLeft: 10,
            }}
          >
            {item.isShow == 0 ? "Đang đợi duyệt" : "Đã duyệt"}
          </Text>
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
              <Text
                lineBreakMode="tail"
                numberOfLines={2}
                style={{
                  marginLeft: 10,
                  fontSize: 10,
                  color: "gray",
                  maxWidth: 250
                }}
              >
                {item.address}
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
        </View>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        style={{}}
      >
        <View style={styles.contentContainer}>
          {item.isShow == 0 ? (
            <>
              <TouchableOpacity
                onPress={() => {
                  dispatch(
                    approvePost({
                      idStaff,
                      authToken,
                      idPost: item.idPost,
                      title: item.title,
                      idUser: item.idUser,
                    })
                  );
                  handlePresentModalDismissPress();
                  dispatch(getPostUnApprove(authToken));
                  navigation.goBack();
                  Alert.alert("Duyệt bài viết thành công");
                }}
                style={{
                  height: 50,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomWidth: 2,
                  borderColor: "#f5f5f5",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "blue",
                  }}
                >
                  Duyệt bài
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handlePresentModalDismissPress();
                  setIsModalVisibleReject(true);
                }}
                style={{
                  height: 50,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomWidth: 2,
                  borderColor: "#f5f5f5",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "red",
                  }}
                >
                  Từ chối
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handlePresentModalDismissPress();
                }}
                style={{
                  height: 50,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomWidth: 2,
                  borderColor: "#f5f5f5",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "red",
                  }}
                >
                  Đóng
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                  onPress={() => {
                    let idPost = item?.idPost
                    dispatch(deletePost({ authToken, idPost }))
                    navigation.goBack()
                  }}
                style={{
                  height: 50,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomWidth: 2,
                  borderColor: "#f5f5f5",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "red",
                  }}
                >
                  Xoá bài
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handlePresentModalDismissPress();
                }}
                style={{
                  height: 50,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomWidth: 2,
                  borderColor: "#f5f5f5",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "red",
                  }}
                >
                  Đóng
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </BottomSheetModal>

      <Modal isVisible={isModalVisibleReject} style={{ height: 300 }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            height: 300,
          }}
        >
          <Text>Nhập tin nhắn từ chối bài viết</Text>
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
              onPress={() => setIsModalVisibleReject(false)}
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
                    unApprovePost({
                      idStaff,
                      authToken,
                      idPost: item.idPost,
                      title: item.title,
                      messagefromAdmin: message,
                      idUser: item.idUser,
                    })
                  );
                  dispatch(getPostUnApprove(authToken));
                  setIsModalVisibleReject(false);
                  navigation.goBack();
                  Alert.alert("Từ chối bài viết thành công");
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
                Xác nhận
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </BottomSheetModalProvider>
  );
};

export default DetailPostScreen;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
  },
});
