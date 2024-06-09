import React from "react";
import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { Appbar, Button, HelperText, IconButton, Text, TextInput } from "react-native-paper";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const ThemNguoiDung = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [hiddenPasswordConfirm, setHiddenPasswordConfirm] = useState(true);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const hasErrorEmail = () => !email.includes("@");
  const hasErrorFullName = () => fullName === "";
  const hasErrorUsername = () => username === "";

  const hasErrorPasswordConfirm = () => passwordConfirm !== password;

  const isPasswordValid = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
  };

  const hasErrorPassword = () => !isPasswordValid(password);

  const USERS = firestore().collection("USERS");

  const handleCreateAccount = () => {
    if (!username || !fullName || !email || !password) {
      Alert.alert("Cảnh báo", "Vui lòng điền: username,fullName, email ,password");
      return;
    } else if (!isPasswordValid(password)) {
      Alert.alert("Cảnh báo", "Password không hợp lệ. Password phải chứa ít nhất 6 ký tự, bao gồm chữ cái thường, chữ cái in hoa và số.");
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        // const userId = USERS.doc().id; // Tạo một ID duy nhất
        USERS.doc(email)
          .set({
            // id: userId, // Lưu ID vào cơ sở dữ liệu
            phone,
            username,
            address,
            fullName,
            email,
            password,
            role: "employee"
          })
          .then(() => {
            navigation.navigate("NguoiDung");
          })
          .catch((error) => {
            console.error("Error updating user document: ", error);
            Alert.alert("Đã xảy ra lỗi khi đăng ký tài khoản.");
          });
      })
      .catch((error) => {
        console.error("Error creating user: ", error);
        Alert.alert("Cảnh báo","Email đã tồn tại!Vui lòng sử dụng email khác!");
      });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, justifyContent: "center" }}>
      <Appbar style={{backgroundColor:"green"}}>
        <IconButton icon="chevron-left" style={{ backgroundColor: 'white'}} onPress={()=>navigation.goBack()} />
        <Appbar.Content title={<Text style={{ color: 'white', textAlign:"center",fontWeight:"bold",fontSize:22}}>Thêm nhân viên</Text>} />
      </Appbar>
      <View>
        <TextInput style={{backgroundColor:"white"}} label={"User Name"} value={username} onChangeText={setUsername} />
        <HelperText type="error" visible={hasErrorUsername()}>UserName không phép để trống</HelperText>
        <TextInput style={{backgroundColor:"white"}} label={"Full Name"} value={fullName} onChangeText={setFullName} />
        <HelperText type="error" visible={hasErrorFullName()}>FullName không phép để trống</HelperText>
        <TextInput style={{backgroundColor:"white"}} label={"Email"} value={email} onChangeText={setEmail} />
        <HelperText type="error" visible={hasErrorEmail()}>Email phải chứa @</HelperText>
        <TextInput style={{backgroundColor:"white"}} label={"Số điện thoại "} value={phone} onChangeText={setPhone} />
        <TextInput style={{backgroundColor:"white"}} label={"Địa chỉ"} value={address} onChangeText={setAddress} />
        <TextInput style={{backgroundColor:"white"}}
          label={"Password"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={hiddenPassword}
          right={<TextInput.Icon icon="eye" onPress={() => setHiddenPassword(!hiddenPassword)} />}
        />
        <HelperText type="error" visible={hasErrorPassword()}>
          Password phải chứa ít nhất 6 ký tự, bao gồm chữ cái thường, chữ cái in hoa và số.
        </HelperText>
        <TextInput style={{backgroundColor:"white"}}
          label={"Confirm Password"}
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          secureTextEntry={hiddenPasswordConfirm}
          right={<TextInput.Icon icon="eye" onPress={() => setHiddenPasswordConfirm(!hiddenPasswordConfirm)} />}
        />
        <HelperText type="error" visible={hasErrorPasswordConfirm()}>Password và Confirm Password phải trùng nhau</HelperText>
        <Button mode="contained" buttonColor="blue" onPress={handleCreateAccount}>Tạo nhân viên mới</Button>
      </View>
    </ScrollView>
  );
};

export default ThemNguoiDung;
