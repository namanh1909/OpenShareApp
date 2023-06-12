import { StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import axios from 'axios';

import Ionicons from 'react-native-vector-icons/Ionicons'
import Button from '../../../../../components/Button'
import NavBar from '../../../../../components/NavBar'
import Input from '../../../../../components/Input'
import DropDownPicker from 'react-native-dropdown-picker';
import AutoHeightTextInput from '../../../../../components/AutoHeightTextInput';
import { useDispatch, useSelector } from 'react-redux';
import { createAddress, getAddress } from '../../../../../redux/reducers/addressSlice';


const CreateAddressScreen = ({ navigation }) => {

    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [wards, setWards] = useState([]);
    const [selectedWard, setSelectedWard] = useState(null);
    const [open, setOpen] = useState(false);
    const [opendistricts, setOpendistricts] = useState(false);
    const [openward, setopenward] = useState(false);
    const user = useSelector((state) => state.users.data)
    const idUser = user.idUser
    const authToken = useSelector((state) => state.auth.token)

    const [addressDetail, setAddress] = useState("")

    const dispatch = useDispatch()

    async function getProvimces() {
        await axios
            .get('https://provinces.open-api.vn/api/p')
            .then((response) => {
                let newList = provinces.concat(response.data)
                setProvinces(newList)
                console.log('provinces', provinces)
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        getProvimces()
      navigation.addListener('focus', () => dispatch(getAddress({ authToken, idUser })))
    }, [navigation]);



    const handleProvinceChange = (province) => {
      console.log("code", province);
      setSelectedDistrict(null);
      setSelectedWard(null);
      try {
        axios
          .get(`https://provinces.open-api.vn/api/p/${province}?depth=2`)
          .then((response) => {
            setDistricts(response.data.districts);
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    };

    const handleDistrictChange = (district) => {
      setSelectedWard(null);
      axios
        .get(`https://provinces.open-api.vn/api/d/${district}?depth=2`)
        .then((response) => {
          console.log("huyen", response);
          setWards(response.data.wards);
        })
        .catch((error) => console.log(error));
    };

    const getAddresss = () => {
        let address = '';
        if (selectedProvince) {
            address += provinces.find((p) => p.code === selectedProvince)?.name + ', ';
        }
        if (selectedDistrict) {
            address += districts.find((d) => d.code === selectedDistrict)?.name + ', ';
        }
        if (selectedWard) {
            address += wards.find((w) => w.code === selectedWard)?.name + ', ' + addressDetail;
        }
        return address
    };

    return (
      <View
        style={{
          flex: 1,
          padding: 20,
        }}
      >
        <NavBar
          title="Thêm địa chỉ"
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
            addressDetail && (
              <TouchableOpacity
                onPress={() => {
                  try {
                    dispatch(
                      createAddress({
                        authToken,
                        idUser,
                        address: `${getAddresss()}`,
                      })
                    );
                    dispatch(getAddress({ authToken, idUser }));
                  } catch (error) {
                  } finally {
                    dispatch(getAddress({ authToken, idUser }));
                    navigation.goBack();
                    dispatch(getAddress({ authToken, idUser }));
                  }
                }}
              >
                <Ionicons name="checkmark-outline" color="#000" size={25} />
              </TouchableOpacity>
            )
          }
        />
        <Text
          style={{
            marginBottom: 10,
          }}
        >
          Chọn tỉnh:
        </Text>
        <DropDownPicker
          open={open}
          value={selectedProvince}
          items={provinces?.map((province) => ({
            label: province.name,
            value: province.code,
          }))}
          setOpen={setOpen}
          setValue={setSelectedProvince}
          onSelectItem={(item) => handleProvinceChange(item.value)}
        />

        {selectedProvince ? (
          <View
            style={{
              marginVertical: 20,
            }}
          >
            <Text
              style={{
                marginBottom: 10,
              }}
            >
              Chọn Huyện:
            </Text>
            <DropDownPicker
              open={opendistricts}
              value={selectedDistrict}
              items={districts?.map((district) => ({
                label: district.name,
                value: district.code,
              }))}
              setOpen={setOpendistricts}
              setValue={setSelectedDistrict}
              onSelectItem={(item) => handleDistrictChange(item.value)}
            />
          </View>
        ) : null}

        {selectedDistrict ? (
          <View>
            <Text
              style={{
                marginBottom: 10,
              }}
            >
              Xã:
            </Text>
            <View>
              <DropDownPicker
                open={openward}
                value={selectedWard}
                items={wards?.map((district) => ({
                  label: district.name,
                  value: district.code,
                }))}
                setOpen={setopenward}
                setValue={setSelectedWard}
                setItems={(item) => handleDistrictChange(item.value)}
              />
            </View>
          </View>
        ) : null}

        {selectedWard && (
          <>
            <Text
              style={{
                marginVertical: 10,
              }}
            >
              Địa chỉ chi tiết/ Số Nhà
            </Text>
            <AutoHeightTextInput
              heightDefault={100}
              value={addressDetail}
              onChangeText={(value) => setAddress(value)}
            />
          </>
        )}

        {/* <Text>Address: {getAddress()}</Text> */}
      </View>
    );
}

export default CreateAddressScreen

