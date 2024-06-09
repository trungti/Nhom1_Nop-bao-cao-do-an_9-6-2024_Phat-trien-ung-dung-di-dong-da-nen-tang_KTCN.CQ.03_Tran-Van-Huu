import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, Image } from 'react-native';
import { Appbar, Text, IconButton, TextInput, Checkbox } from 'react-native-paper';
import DatePicker from '@react-native-community/datetimepicker'; // Import DatePicker
import { useNavigation } from '@react-navigation/native';
import ImageCropPicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from "../store";

const ThemKhachHang = () => {
  const navigation = useNavigation();
  const [LoaiKH, setLoaiKH] = useState('');
  const [NhomKH, setNhomKH] = useState('');

  const [MaKH, setMaKH] = useState('');
  const [TenKH, setTenKH] = useState('');
  const [SDT1, setSDT1] = useState('');
  const [SDT2, setSDT2] = useState('');
  const [DiaChi, setDiaChi] = useState('');
  const [KhuVuc, setKhuVuc] = useState('');
  const [GioiTinh, setGioiTinh] = useState('');
  const [Email, setEmail] = useState('');
  const [Facebook, setFacebook] = useState('');
  const [MaThue, setMaThue] = useState('');
  const [GhiChu, setGhiChu] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [patchImage, setPatchImage] = useState("");
  const [image, setImage] = useState("");
  const ref = firestore().collection('DuLieuKhachHang');
  const [controller] = useMyContextController();

  const { userLogin } = controller;

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const handledAddStorage = async () => {
    if (!MaKH) {
      Alert.alert("Cảnh báo", "Vui lòng điền Mã khách hàng");
      return;
    } else if (!TenKH) {
      Alert.alert("Cảnh báo", "Vui lòng điền Tên khách hàng");
      return;
    } else if (!SDT1) {
      Alert.alert("Cảnh báo", "Vui lòng điền SDT 1");
      return;
    } else if (!DiaChi) {
      Alert.alert("Cảnh báo", "Vui lòng điền địa chỉ");
      return;
    } else if (!patchImage) {
      Alert.alert("Cảnh báo", "Chưa thêm hình ảnh");
      return;
    }
    try {
      const response = await ref.add({
        LoaiKH,
        MaKH,
        NhomKH,
        TenKH,
        SDT1,
        SDT2,
        DiaChi,
        KhuVuc,
        GioiTinh,
        Email,
        Facebook,
        GhiChu,
        createBy: userLogin.role,
        MaThue,
        image,
      });

      const imageRef = storage().ref(`/Services/${response.id}.png`);
      await imageRef.putFile(patchImage);
      const imageUrl = await imageRef.getDownloadURL();
      await ref.doc(response.id).update({ id: response.id, image: imageUrl });

      // Alert.alert("Success!");
      navigation.navigate("KhachHang");
    } catch (error) {
      console.log(error)
    }
  };

  const uploadImages = () => {
    ImageCropPicker.openPicker({
      cropping: true,
      width: 100,
      height: 100,
      mediaType: "photo"
    })
      .then(image => setPatchImage(image.path))
      .catch(e => console.log(e.message));
  };

  const handleCheckboxChange = (value) => {
    setGioiTinh(value);
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar style={{ backgroundColor: "green" }}>
        <IconButton icon="close" style={{ backgroundColor: 'white' }}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content title={<Text style={{ color: 'white', textAlign: "center",fontWeight:"bold",fontSize:22 }}>Thêm khách hàng</Text>} />
        <Text style={{ color: "white",fontWeight:"bold",fontSize:22 }}
          onPress={handledAddStorage}
        >LƯU</Text>
      </Appbar>

      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps='handled'>
        <View style={styles.centerContent}>
          {patchImage !== "" &&
            <Image source={{ uri: patchImage }}
              resizeMode="contain"
              style={{ height: 100, width: 100 }}
            />
          }
          <View style={{ alignItems: "center", left: 70 }}>
            <IconButton icon="account" onPress={uploadImages} />
            <Text style={{ color: "green" }} onPress={uploadImages}>Thêm ảnh đại diện</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            label={`Loại khách hàng`}
            value={LoaiKH}
            onChangeText={(text) => setLoaiKH(text)}
          />
          <TextInput
            style={styles.input}
            label={`Mã khách hàng`}
            value={MaKH}
            onChangeText={(text) => setMaKH(text)}
          />
          <TextInput
            style={styles.input}
            label={`Tên khách hàng`}
            value={TenKH}
            onChangeText={(text) => setTenKH(text)}
          />
          <TextInput
            style={styles.input}
            label={`Số điện thoại 1`}
            value={SDT1}
            onChangeText={(text) => setSDT1(text)}
          />
          <TextInput
            style={styles.input}
            label={`Số điện thoại 2`}
            value={SDT2}
            onChangeText={(text) => setSDT2(text)}
          />
          <Text></Text>
          <TextInput
            style={styles.input}
            label={`Địa chỉ`}
            value={DiaChi}
            onChangeText={(text) => setDiaChi(text)}
          />
          <TextInput
            style={styles.input}
            label={`Khu Vực`}
            value={KhuVuc}
            onChangeText={(text) => setKhuVuc(text)}
          />
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={styles.input}
              label={`Ngày sinh`}
              value={date.toDateString()}
              onChangeText={(text) => setDate(text)}
            />
            <IconButton icon="calendar" onPress={showDatePickerModal} />
            {showDatePicker && (
              <DatePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
          <View style={styles.checkboxContainer}>
            <Text style={{ fontSize: 16, left: 15, top: 15, }}>Giới tính </Text>
            <Checkbox.Item
              label="Nam"
              status={GioiTinh === 'Nam' ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('Nam')}
            />
            <Checkbox.Item
              label="Nữ"
              status={GioiTinh === 'Nữ' ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('Nữ')}
            />
            <Checkbox.Item
              label="Khác"
              status={GioiTinh === 'Khác' ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxChange('Khác')}
            />
          </View>
          <TextInput
            style={styles.input}
            label={`Mã số thuế`}
            value={MaThue}
            onChangeText={(text) => setMaThue(text)}
          />
          <TextInput
            style={styles.input}
            label={`Email`}
            value={Email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            label={`Facebook`}
            value={Facebook}
            onChangeText={(text) => setFacebook(text)}
          />
          <TextInput
            style={styles.input}
            label={`Nhóm khách hàng`}
            value={NhomKH}
            onChangeText={(text) => setNhomKH(text)}
          />
          <Text></Text>
          <TextInput
            style={styles.input}
            label={`Nhập ghi chú`}
            value={GhiChu}
            onChangeText={(text) => setGhiChu(text)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ThemKhachHang;

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
  },
  centerContent: {
    flexDirection: "row",
    alignItems: 'center',
    backgroundColor: "lightgray",
    paddingVertical: 20,
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
  },
});
