import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import { dataProvinces } from '../services/provinces'
import DropDownPicker from 'react-native-dropdown-picker';


const AddressPicker = () => {
    const [province, setProvince] = useState(null);
    const [district, setDistrict] = useState(null);
    const [openProvince, setOpenProvince] = useState(false);
    const [openDistrict, setOpenDistrict] = useState(false);
    const [openWard, setOpenWard] = useState(false);

    const [ward, setWard] = useState(null);

    const handleProvinceChange = (item) => {
        setDistrict(null)
        setWard(null)
    };

    const handleDistrictChange = (item) => {
        setWard(null)
    };

    const handleWardChange = (item) => {
    };
    console.log("province", province)

    return (
        <View style={{
            backgroundColor: "red",
            flex: 1
        }}>
            <DropDownPicker
                open={openProvince}
                items={dataProvinces.map((province) => ({
                    label: province.name,
                    value: province.code,
                }))}

                setOpen={setOpenProvince}
                value={province}
                placeholder={province ? province : "Chọn tỉnh"}
                onSelectItem={
                    (item) => {
                        setProvince(item.label)
                        handleProvinceChange(item)
                    }
                }
            />
            {province && (
                <DropDownPicker
                    open={openDistrict}
                    items={dataProvinces.map((province) => ({
                        label: province.name,
                        value: province.code,
                    }))}
                    setOpen={setOpenDistrict}
                    // setValue={handleProvinceChange()}
                    // setItems={(item) => handleProvinceChange(item)}
                    value={district}
                    setValue={setDistrict}
                    onSelectItem={
                        (item) => {
                            handleDistrictChange(item)
                        }
                    }
                />
            )}

            {district && (
                <DropDownPicker
                    open={openWard}
                    items={dataProvinces.map((province) => ({
                        label: province.name,
                        value: province.code,
                    }))}
                    setOpen={setOpenWard}
                    // setValue={handleProvinceChange()}
                    // setItems={(item) => handleProvinceChange(item)}
                    value={ward}
                    setValue={setWard}
                    onSelectItem={
                        (item) => {
                            handleWardChange(item)
                        }
                    }
                />
            )}
        </View>
    )
}

export default AddressPicker

const styles = StyleSheet.create({})