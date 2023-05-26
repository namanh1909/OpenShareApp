import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import NavBar from "../../../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotify,
  seenAcpPost,
  seenAcpPostRequest,
  seenRequest,
} from "../../../redux/reducers/notifyUserSlice";
import { formatTime } from "../../../contants/helper";

const NotificationsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.users);
  const idUser = data?.idUser;
  const authToken = useSelector((state) => state.auth.token);
  const dataUser = {
    idUser,
  };

  useEffect(() => {
    dispatch(getNotify({ authToken, dataUser }));
  }, []);

  const notifyList = useSelector((state) => state.notify.data);
  console.log("data notify", notifyList);

  const [refreshing, setRefreshing] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <NavBar
        title="Thông báo"
        leftButton={
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back-outline" color="#000" size={25} />
          </TouchableOpacity>
        }
      />
      <FlatList
        data={notifyList}
        keyExtractor={(item) => item.idNotice}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              dispatch(getNotify({ authToken, dataUser }));
            }}
          />
        }
        renderItem={({ item, index }) => {
          if (item?.user_id) {
            return (
              <TouchableOpacity
                key={item.idNotice}
                onPress={() => {
                  console.log("data user post", item);
                  dispatch(
                    seenAcpPost({
                      authToken,
                      dataUser: { idPost: item?.post_id },
                    })
                  );
                  dispatch(getNotify({ authToken, dataUser }));
                  navigation.navigate("PostList");
                }}
                style={{
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: item?.isSeen == 0 ? "#f5f5f5" : "#fff",
                }}
              >
                <Ionicons name="clipboard-outline" size={70} />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>{item?.titlePost}</Text>
                  <Text style={{ marginBottom: 10 }}>
                    {item?.messagefromAdmin}
                  </Text>
                  <Text> {formatTime(item?.created_at)}</Text>
                </View>
              </TouchableOpacity>
            );
          } else {
            return (
              <TouchableOpacity
                key={item.idNotice}
                style={{
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: item?.issen_N == 0 ? "#f5f5f5" : "#fff",
                }}
                onPress={() => {
                  if (
                    item?.status_accept_reject == null ||
                    item?.status_accept_reject == 0
                  ) {
                    let dataUser2 = {
                      idPost: item?.idPost,
                      idUser: item?.idUser,
                      idNotice: item?.idNotice,
                    };
                    dispatch(
                      seenAcpPostRequest({ authToken, dataUser: dataUser2 })
                    );
                    dispatch(getNotify({ authToken, dataUser }));
                    navigation.navigate("Tab", { screen: "History" });
                  }

                  if (
                    item?.status_accept_reject == 2 ||
                    item?.status_accept_reject == 3
                  ) {
                    let dataUser2 = {
                      idPost: item?.idPost,
                      idUser: item?.idUser,
                      idNotice: item?.idNotice,
                    };
                    dispatch(
                      seenAcpPostRequest({ authToken, dataUser: dataUser2 })
                    );
                    dispatch(getNotify({ authToken, dataUser }));
                    navigation.navigate("Tab", { screen: "History" });
                  } else {
                    let dataUser2 = {
                      idPost: item?.idPost,
                      idUser: item?.idUser,
                      idNotice: item?.idNotice,
                    };
                    dispatch(seenRequest({ authToken, dataUser: dataUser2 }));
                    dispatch(getNotify({ authToken, dataUser }));
                    navigation.navigate("Tab", { screen: "Order" });
                  }
                }}
              >
                <Ionicons name="chatbubbles-outline" size={70} />
                <View style={{ marginLeft: 10 }}>
                  {item?.status_accept_reject == null && (
                    <>
                      <Text
                        style={{
                          maxWidth: 300,
                          marginBottom: 10,
                        }}
                      >
                        Bạn{" "}
                        <Text
                          style={{ fontWeight: "bold" }}
                        >{`${item?.name}`}</Text>{" "}
                        đã gửi yêu cầu đến bài viết{" "}
                        <Text
                          style={{ fontWeight: "bold" }}
                        >{`${item?.title}`}</Text>{" "}
                      </Text>
                      <Text> {formatTime(item?.createAt_N)}</Text>
                    </>
                  )}
                  {item?.status_accept_reject == 0 && (
                    <>
                      <Text
                        style={{
                          maxWidth: 300,
                          marginBottom: 10,
                        }}
                      >
                        Yêu cầu đến bài{" "}
                        <Text
                          style={{ fontWeight: "bold" }}
                        >{`${item?.title}`}</Text>{" "}
                        đã bị từ chối
                      </Text>
                      <Text>{`${item?.createAt_N}`}</Text>
                    </>
                  )}
                  {item?.status_accept_reject == 1 && (
                    <>
                      <Text
                        style={{
                          maxWidth: 300,
                          marginBottom: 10,
                        }}
                      >
                        Yêu cầu đến bài{" "}
                        <Text
                          style={{ fontWeight: "bold" }}
                        >{`${item?.title}`}</Text>{" "}
                        đã được chấp nhận
                      </Text>
                      <Text>{`${item?.createAt_N}`}</Text>
                    </>
                  )}
                  {item?.status_accept_reject == 2 && (
                    <>
                      <Text
                        style={{
                          maxWidth: 300,
                          marginBottom: 10,
                        }}
                      >
                        Bạn{" "}
                        <Text
                          style={{ fontWeight: "bold" }}
                        >{`${item?.name}`}</Text>{" "}
                        đã xác nhận nhận đồ{" "}
                        <Text
                          style={{ fontWeight: "bold" }}
                        >{`${item?.title}`}</Text>{" "}
                        thành công
                      </Text>
                      <Text>{`${item?.createAt_N}`}</Text>
                    </>
                  )}
                  {item?.status_accept_reject == 3 && (
                    <>
                      <Text
                        style={{
                          maxWidth: 300,
                          marginBottom: 10,
                        }}
                      >
                        Bạn{" "}
                        <Text
                          style={{ fontWeight: "bold" }}
                        >{`${item?.name}`}</Text>{" "}
                        đã xác nhận nhận đồ{" "}
                        <Text
                          style={{ fontWeight: "bold" }}
                        >{`${item?.title}`}</Text>{" "}
                        thất bại
                      </Text>
                      <Text>{`${item?.createAt_N}`}</Text>
                    </>
                  )}
                </View>
              </TouchableOpacity>
            );
          }
        }}
      />
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({});
