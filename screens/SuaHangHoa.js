import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { Appbar, Text, IconButton, TextInput, Divider, Provider, Portal, Dialog, Paragraph, Button } from 'react-native-paper';
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import ImagePicker from "react-native-image-crop-picker";
import { MenuProvider, Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';

const SuaHangHoa = ({ route, navigation }) => {
  const { id, image, name, NH, price, MaVach, slton } = route.params.item;
  const [service, setService] = useState({ id, MaVach, name, NH, price, slton });
  const [visible, setVisible] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [imagePath, setImagePath] = useState(image);
  const [previousImageUrl, setPreviousImageUrl] = useState(image);
  const [imageSelected, setImageSelected] = useState(false); // Thêm trạng thái để kiểm tra ảnh đã được chọn hay chưa

  const SERVICES = firestore().collection("DuLieuSanPham");
  const deleteService = () => {
    SERVICES.doc(id)
        .delete()
        .then(() => {
            setVisible(false);
            navigation.navigate("HangHoa");
        });
  };

  useEffect(() => {
    const unsubscribe = SERVICES.doc(id).onSnapshot(response => {
        if (response.exists) {
            const data = response.data();
            if (data && data.image) {
                setService(data);
                setPreviousImageUrl(data.image);
            }
        } else {
            console.log("Document not found!");
        }
    }, error => {
        console.error("Error fetching Firestore document:", error);
    });
    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
      if (updateSuccess) {
          Alert.alert("Thông báo", "Sản phẩm đã được cập nhật !", [
              { text: "OK", onPress: () => navigation.navigate("HangHoa") }
          ]);
          setUpdateSuccess(false);
      }
  }, [updateSuccess]);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const uploadImage = () => {
    ImagePicker.openPicker({
        mediaType: "photo",
        width: 400,
        height: 300,
    }).then(image => {
        console.log("Selected image path:", image.path);
        setImagePath(image.path);
        setImageSelected(true); // Đánh dấu ảnh đã được chọn
    }).catch(e => console.log("Error selecting image:", e.message));
  };

  const updateService = () => {
    if (!imageSelected && imagePath === previousImageUrl) {
        Alert.alert("Cảnh báo", "Vui lòng thêm hình ảnh !");
        return;
    }
    if (!imagePath && previousImageUrl) {
        SERVICES.doc(id)
            .update({ ...service, image: previousImageUrl })
            .then(() => setUpdateSuccess(true))
            .catch(e => console.log(e.message));
    } else if (imagePath) {
        const refImage = storage().ref("/Services/" + id + ".png");
        refImage.putFile(imagePath)
            .then(() => {
                refImage.getDownloadURL()
                    .then(link => {
                        SERVICES.doc(id)
                            .update({ ...service, image: link })
                            .then(() => setUpdateSuccess(true))
                            .catch(e => console.log(e.message));
                    })
                    .catch(e => console.log("Error getting download URL:", e.message));
            })
            .catch(e => console.log("Error uploading file:", e.message));
    } else {
        console.log("No image path provided");
    }
  };

  return (
    <Provider>
      <MenuProvider>
        <Appbar.Header style={styles.appbar}>
          <IconButton style={{ backgroundColor: "white" }} icon="arrow-left" color="white" onPress={() => navigation.goBack()} />
          <Appbar.Content title="SỬA HÀNG HÓA" color="white" />
          <Menu>
            <MenuTrigger>
              <IconButton style={{ backgroundColor: "white" }} icon="dots-vertical" />
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles}>
              <View style={{ flexDirection: "row" }} >
                <IconButton onSelect={updateService} style={{ backgroundColor: "white" }} icon="reply" />
                <MenuOption onSelect={updateService} text="Lưu" customStyles={optionStyles} />
              </View>
              <View style={{ flexDirection: "row" }}>
                <IconButton  onSelect={showDialog} style={{ backgroundColor: "white" }} icon="delete-outline" />
                <MenuOption  onSelect={showDialog} text="Xóa hàng" customStyles={optionStyles} />
              </View>
            </MenuOptions>
          </Menu>
        </Appbar.Header>
        <ScrollView>
          <View style={styles.imageContainer}>
            <IconButton onPress={uploadImage} size={100} icon="camera" />
            {imagePath && (
              <Image source={{ uri: imagePath }}
                     style={{ width: 300, height: 200 }}
                     resizeMode={"contain"} />
            )}
          </View>
          <View style={styles.section}>
            <TextInput
              label={"Mã hàng"}
              value={id}
              onChangeText={(text) => setService({ ...service, id: text })}
            />
            <Text></Text>
            <TextInput
              label={"Mã vạch"}
              value={service.MaVach}
              onChangeText={(text) => setService({ ...service, MaVach: text })}
            />
            <Text></Text>
            <TextInput
              label={"Tên hàng"}
              value={service.name}
              onChangeText={(text) => setService({ ...service, name: text })}
            />
            <Text></Text>
            <TextInput
              label={"Nhóm hàng"}
              value={service.NH}
              onChangeText={(text) => setService({ ...service, NH: text })}
            />
            <Text></Text>
            <TextInput
              keyboardType="numeric"
              label={"Giá bán"}
              value={service.price.toString()}
              onChangeText={(text) => setService({ ...service, price: text })}
            />
            <Text></Text>
            <TextInput
              keyboardType="numeric"
              label={"Tồn kho"}
              value={service.slton.toString()}
              onChangeText={(text) => setService({ ...service, slton: text })}
            />
          </View>
          <View style={styles.section}>
            <Divider />
          </View>
        </ScrollView>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Cảnh báo</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Bạn chắc chắn muốn xóa hàng hóa này chứ !</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Hủy</Button>
              <Button onPress={deleteService}>Xóa</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </MenuProvider>
    </Provider>
  );
};

export default SuaHangHoa;

const optionsStyles = {
  optionsContainer: {
    padding: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
  },
  optionsWrapper: {
    backgroundColor: 'white',
  },
  optionWrapper: {
    padding: 10,
  },
  optionTouchable: {
    underlayColor: 'lightgray',
    activeOpacity: 70,
  },
};

const optionStyles = {
  optionText: {
    fontSize: 18,
    color: 'black',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  appbar: {
    backgroundColor: 'green',
  },
  section: {
    padding: 10,
  },
  label: {
    color: 'gray',
    marginBottom: 5,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 10,
    flexDirection: "row"
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
