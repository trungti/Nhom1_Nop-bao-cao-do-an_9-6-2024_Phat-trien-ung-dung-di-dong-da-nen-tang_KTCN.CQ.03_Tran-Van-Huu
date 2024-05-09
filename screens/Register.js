import React from "react";
import { useState } from "react";
import { Alert, Image, ScrollView, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const Register = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [hiddenPasswordConfirm, setHiddenPasswordConfirm] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [disableCreateButton, setDisableCreateButton] = useState(true); // Step 1: Initialize state for button

  const hasErrorEmail = () => !email.includes("@");
  const hasErrorPassword = () => password.length < 6;
  const hasErrorFullName = () => fullName === "";
  const hasErrorPasswordConfirm = () => passwordConfirm !== password;
  const USERS = firestore().collection("USERS");

  // Step 3: Update disableCreateButton based on conditions
  React.useEffect(() => {
    setDisableCreateButton(
      !fullName ||
      !email ||
      !password ||
      hasErrorEmail() ||
      hasErrorPassword() ||
      hasErrorFullName() ||
      hasErrorPasswordConfirm()
    );
  }, [fullName, email, password, phone, address, passwordConfirm]);

  const handleCreateAccount = () => {
    if (!fullName || !email || !password) {
      Alert.alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        USERS.doc(email)
          .set({
            fullName,
            email,
            password,
          })
          .then(() => {
            navigation.navigate("Login");
          })
          .catch((error) => {
            console.error("Error updating user document: ", error);
            Alert.alert("Đã xảy ra lỗi khi đăng ký tài khoản.");
          });
      })
      .catch((error) => {
        console.error("Error creating user: ", error);
        Alert.alert("Tài khoản đã tồn tại hoặc đã xảy ra lỗi.");
      });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, justifyContent: "center" }}>
      <View>
        <Image
          source={require("../asset/firebase_28dp.png")}
          style={{
            alignSelf: "center",
            marginVertical: 50,
            height: 150,
            width: 150,
          }}
        />

        <TextInput style={{backgroundColor:"white"}}
         label={"Full Name"} value={fullName} onChangeText={setFullName} />
        <HelperText type="error" visible={hasErrorFullName()}>
        FullName và New entity không phép để trống
        </HelperText>

        <TextInput style={{backgroundColor:"white"}}
         label={"Email"} value={email} onChangeText={setEmail} />
        <HelperText type="error" visible={hasErrorEmail()}>
        Email phải chứa @
        </HelperText>

        <TextInput style={{backgroundColor:"white"}}
          label={"Password"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={hiddenPassword}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => setHiddenPassword(!hiddenPassword)}
            />
          }
        />
        <HelperText type="error" visible={hasErrorPassword()}>
        Password ít nhất 6 kí tự
        </HelperText>

        <TextInput style={{backgroundColor:"white"}}
          label={"Confirm Password"}
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          secureTextEntry={hiddenPasswordConfirm}
          right={
            <TextInput.Icon 
            icon="eye"
              
              onPress={() => setHiddenPasswordConfirm(!hiddenPasswordConfirm)}
            />
          }
        />
        <HelperText type="error" visible={hasErrorPasswordConfirm()}>
        Password và Confirm Password phải trùng nhau
        </HelperText>


        <Button mode="contained" buttonColor="blue" onPress={handleCreateAccount} disabled={disableCreateButton}>
          Tạo tài khoản mới
        </Button>

        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Text>Bạn chưa có tài khoản?</Text>
          <Button onPress={() => navigation.navigate("Login")}>Đăng Nhập</Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;
