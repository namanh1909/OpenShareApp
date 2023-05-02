import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
// import ImageView from 'react-native-image-viewing';
import FastImage from 'react-native-fast-image';
import ImageViewer from 'react-native-image-zoom-viewer';

const RenderImage = ({item}: any) => {
  const [visible, setIsVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const convertedUrls = item.map((url: any) => ({url}));

  if (item) {
    // console.log(item);
    return (
      <View
        style={{
          height: 150,
          width: 130,
          borderRadius: 10
        }}>
        <Modal visible={visible} transparent={true}>
          <ImageViewer
            imageUrls={convertedUrls}
            enableSwipeDown
            onCancel={() => setIsVisible(false)}
          />
        </Modal>
        {item && (
          <TouchableOpacity
            onPress={() => {
              setIsVisible(true);
            }}>
            <FastImage
              style={{ height: 150,
                width: 130,
                borderRadius: 10}}
              source={{
                uri: item[0],
                priority: FastImage.priority.normal,
              }}
            />
            {/* <Image source={{uri: item[0]}} /> */}
          </TouchableOpacity>
        )}
      </View>
    );
  } else {
    return null;
  }
};

export default RenderImage;

const styles = StyleSheet.create({});