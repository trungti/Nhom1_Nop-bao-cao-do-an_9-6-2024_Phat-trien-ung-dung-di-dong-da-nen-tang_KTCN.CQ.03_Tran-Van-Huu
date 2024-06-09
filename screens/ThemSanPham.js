import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, Image } from 'react-native';
import { Appbar, Text, IconButton, TextInput, Switch } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ImageCropPicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from "../store";

const ThemSanPham = () => {
  const navigation = useNavigation();
  const [id] = useState('');
  const [MaH, setMaH] = useState('');
  const [MaVach, setMaVach] = useState('');
  const [Brand, setBrand] = useState('');
  const [name, setTenH] = useState('');
  const [NH, setNH] = useState('');
  const [Location, setLocation] = useState('');
  const [DV, setDV] = useState('');
  const [price, setGiaBan] = useState('0');
  const [slton, setTonKho] = useState('0');
  const [MoTa, setMoTa] = useState('');
  const [BanTrucTiep, setBanTrucTiep] = useState(false);
  const [TichDiem, setTichDiem] = useState(false);

  const [GhiChu, setGhiChu] = useState('');
  const ref = firestore().collection('DuLieuSanPham');
  const [image, setImage] = useState("");
  const [patchImage, setPatchImage] = useState("");
  const [controller] = useMyContextController();
  const { userLogin } = controller;

  const handledAddStorage = async () => {
    if (!MaH) {
      Alert.alert("Cảnh báo", "Vui lòng điền Mã hàng");
      return;
    } else if (!name) {
      Alert.alert("Cảnh báo", "Vui lòng điền Tên hàng");
      return;
    } else if (price <= 0) {
      Alert.alert("Cảnh báo", "Giá bán > 0");
      return;
    } else if (slton > 999999999) {
      Alert.alert("Cảnh báo", "0<=slton<=999999999");
      return;
    } else if (!patchImage) {
      Alert.alert("Cảnh báo", "Chưa thêm hình ảnh");
      return;
    }
    try {
      const response = await ref.add({
        id,
        MaH,
        MaVach,
        Brand,
        name,
        NH,
        Location,
        DV,
        price,
        slton,
        MoTa,
        GhiChu,
        createBy: userLogin.role,
        image,
        BanTrucTiep,
        TichDiem,
      });

      const imageRef = storage().ref(`/Services/${response.id}.png`);
      await imageRef.putFile(patchImage);
      const imageUrl = await imageRef.getDownloadURL();
      await ref.doc(response.id).update({ id: response.id, image: imageUrl });

      navigation.navigate("BanHang");
    } catch (error) {
      // Alert.alert("Failed!");
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

  return (
    <View style={{ flex: 1 }}>
      <Appbar style={{ backgroundColor: "green" }}>
        <IconButton icon="close" style={{ backgroundColor: 'white' }}
          onPress={() => navigation.goBack()}
        />
        <Appbar.Content title={<Text style={{ fontSize:22,fontWeight:"bold",color: 'white', textAlign: "center" }}>THÊM HÀNG HÓA</Text>} />
        <Text style={{fontSize:22,fontWeight:"bold", color: "white" }}
          onPress={handledAddStorage}
        >LƯU</Text>
      </Appbar>
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps='handled'>
        <View style={styles.centerContent}>
          <Text>{`                   `}</Text>
          {patchImage !== "" &&
            <Image source={{ uri: patchImage }}
              resizeMode="contain"
              style={{ height: 100, width: 100 }}
            />
          }
          <IconButton
            icon="camera"
            onPress={uploadImages}
            size={100}  // Increase the size of the IconButton
            style={{ marginRight: 10 }}  // Add some margin if needed
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            label={`Mã hàng`}
            value={MaH}
            onChangeText={(text) => setMaH(text)}
          />
          <TextInput
            style={styles.input}
            label={`Mã vạch`}
            value={MaVach}
            onChangeText={(text) => setMaVach(text)}
          />
          <TextInput
            style={styles.input}
            label={`Tên hàng`}
            value={name}
            onChangeText={(text) => setTenH(text)}
          />
          <TextInput
            style={styles.input}
            label={`Thương hiệu`}
            value={Brand}
            onChangeText={(text) => setBrand(text)}
          />
          <TextInput
            style={styles.input}
            label={`Nhóm hàng`}
            value={NH}
            onChangeText={(text) => setNH(text)}
          />
          <TextInput
            style={styles.input}
            label={`Giá bán`}
            value={price}
            keyboardType="numeric"
            onChangeText={(text) => {
              // Bỏ số 0 nếu nhập vào là 0
              let newText = text.replace(/^0+/, '');
              // Chuyển giá trị rỗng thành 0
              if (newText === '') newText = '0';
              // Kiểm tra giá trị lớn hơn 0
              if (parseInt(newText) <= 0) newText = '0';
              setGiaBan(newText);
            }}
          />
          <TextInput
            style={styles.input}
            label={`Tồn kho`}
            value={slton}
            keyboardType="numeric"
            onChangeText={(text) => {
              // Bỏ số 0 nếu nhập vào là 0
              let newText = text.replace(/^0+/, '');
              // Chuyển giá trị rỗng thành 0
              if (newText === '') newText = '0';
              // Kiểm tra giá trị lớn hơn 0
              if (parseInt(newText) <= 0) newText = '0';
              setTonKho(newText);
            }}
          />
          <TextInput
            style={styles.input}
            label={`Vị trí`}
            value={Location}
            onChangeText={(text) => setLocation(text)}
          />
          <Text>{` `}</Text>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <TextInput
              style={{backgroundColor: 'white', width: 330 }}
              label={<Text style={{ fontWeight: 'bold' }}>Bán trực tiếp</Text>}
              disabled
            />
            <Switch value={BanTrucTiep} onValueChange={setBanTrucTiep} />
          </View>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <TextInput
              style={{ backgroundColor: 'white', width: 330 }}
              label={<Text style={{ fontWeight: 'bold' }}>Tích điểm</Text>}
              disabled
            />
            <Switch value={TichDiem} onValueChange={setTichDiem} />
          </View>
          <Text>{` `}</Text>
          <TextInput
            style={styles.input}
            label={`Đơn vị`}
            value={DV}
            onChangeText={(text) => setDV(text)}
          />
          <Text>{` `}</Text>
          <TextInput
            style={styles.input}
            disabled={true}
          ><Text>{`Tồn ít nhất                               0`}</Text></TextInput>
          <TextInput
            style={styles.input}
            disabled={true}
          ><Text>{`Tồn nhiều nhất                       999,999,999`}</Text></TextInput>
          <Text>{` `}</Text>
          <TextInput
            style={styles.input}
            label={`Mô tả`}
            value={MoTa}
            onChangeText={(text) => setMoTa(text)}
          />
          <Text>{` `}</Text>
          <TextInput
            style={styles.input}
            label={`Mẫu ghi chú (hóa đơn, đặt hàng)`}
            value={GhiChu}
            onChangeText={(text) => setGhiChu(text)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ThemSanPham;

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
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
    color: "black",
    backgroundColor: 'white',
    fontWeight:"bold"
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});
