import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { Appbar, Text, Checkbox, Button, IconButton,Provider, Portal, Dialog, Paragraph } from 'react-native-paper';
import firestore from "@react-native-firebase/firestore";
import { MenuProvider, Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';

const SuaNguoiDung = ({ route, navigation }) => {
  const { fullName, username, phone, password, id } = route.params.item;
  
  const [service, setService] = useState({ fullName, username, phone, password, id });
  const [visible, setVisible] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const SERVICES = firestore().collection("USERS");
  const deleteService = () => {
    SERVICES.doc(id)
        .delete()
        .then(() => {
            setVisible(false);
            navigation.navigate("NguoiDung");
        });
  };
  useEffect(() => {
    const unsubscribe = SERVICES.doc(id).onSnapshot(response => {
        if (response.exists) {
            const data = response.data();
            setService(data);
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
          Alert.alert("Thông báo", "Người dùng đã được cập nhật", [
              { text: "OK", onPress: () => navigation.navigate("NguoiDung") }
          ]);
          setUpdateSuccess(false);
      }
  }, [updateSuccess]);

  // State for managing password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const updateService = () => {
    SERVICES.doc(id)
      .update({ fullName: service.fullName, phone: service.phone, username: service.username })
      .then(() => setUpdateSuccess(true))
      .catch(e => console.log(e.message));
  };

  return (
    <Provider>
    <MenuProvider>
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{backgroundColor:"green"}}>
        <Appbar.BackAction style={{backgroundColor:"white"}} onPress={() => navigation.goBack()} />
        <Appbar.Content title={<Text style={{ color: 'white', fontSize: 22 }}>Sửa người dùng</Text>} />
     
        <Menu>
            <MenuTrigger>
              <IconButton style={{ backgroundColor: "white" }} icon="dots-vertical" />
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles}>
              <View style={{ flexDirection: "row" }}>
                <IconButton  onSelect={showDialog} style={{ backgroundColor: "white" }} icon="delete-outline" />
                <MenuOption  onSelect={showDialog} text="Xóa người dùng" customStyles={optionStyles} />
              </View>
            </MenuOptions>
          </Menu>
     
      </Appbar.Header>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>THÔNG TIN CÁ NHÂN</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Tên người dùng *</Text>
            <TextInput 
              style={styles.input} 
              value={service.fullName} 
              onChangeText={(text) => setService({ ...service, fullName: text })}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Số điện thoại</Text>
            <TextInput 
              style={styles.input} 
              value={service.phone} 
              placeholder="Nhập số điện thoại" 
              keyboardType="phone-pad" 
              onChangeText={(text) => setService({ ...service, phone: text })}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>THÔNG TIN ĐĂNG NHẬP</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Tên đăng nhập *</Text>
            <TextInput 
              style={styles.input} 
              value={service.username} 
              onChangeText={(text) => setService({ ...service, username: text })}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Mật khẩu</Text>
            <TextInput
              style={styles.input}
              value={service.password}
              placeholder="Nhập mật khẩu"
              secureTextEntry={!isPasswordVisible}
              editable={false}
            />
            <IconButton
              icon={isPasswordVisible ? "eye-off" : "eye"}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Nhập lại mật khẩu</Text>
            <TextInput
              style={styles.input}
              value={service.password}
              placeholder="Nhập lại mật khẩu"
              secureTextEntry={!isConfirmPasswordVisible}
              editable={false}
            />
            <IconButton
              icon={isConfirmPasswordVisible ? "eye-off" : "eye"}
              onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PHÂN QUYỀN</Text>
          <View style={styles.row}>
            <Text style={styles.value}>Chi nhánh trung tâm</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>Nhân viên thu ngân</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>QUYỀN HẠN</Text>
          <View style={styles.row}>
            <Checkbox status="checked" />
            <Text style={styles.value}>Xem thông tin chung trong các giao dịch</Text>
          </View>
          <View style={styles.row}>
            <Checkbox status="checked" />
            <Text style={styles.value}>Xem giao dịch của nhân viên khác</Text>
          </View>
        </View>

        <Button mode="contained" onPress={updateService} style={styles.saveButton}>
          <Text style={{ color: "white" }}>LƯU</Text>
        </Button>
      </ScrollView>
    </View>
    <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Cảnh báo</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Bạn chắc chắn muốn xóa người dùng này chứ !</Paragraph>
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

export default SuaNguoiDung;
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
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
  },
  value: {
    flex: 2,
    textAlign: 'left',
  },
  input: {
    flex: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 5,
    fontWeight:"bold",
    color:"black"
  },
  saveButton: {
    marginVertical: 20,
    backgroundColor: '#007bff',
    color: 'white',
  },
});
