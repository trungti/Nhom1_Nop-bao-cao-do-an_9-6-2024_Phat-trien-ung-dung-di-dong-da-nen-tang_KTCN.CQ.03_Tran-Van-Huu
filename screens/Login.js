import React, { useEffect, useState } from "react";
import { Alert, Image, View, ScrollView } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { login, useMyContextController } from "../store";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const Login = ({ navigation }) => {
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [isValid, setIsValid] = useState(false); // Biến trạng thái để kiểm tra dữ liệu hợp lệ

  const hasErrorEmail = () => !email.includes("@");
  const hasErrorPassword = () => password.length < 6;

  useEffect(() => {
    console.log(userLogin);
    if (userLogin != null) {
      // if(userLogin.role=="admin")
      navigation.navigate("Services");
      // else if(userLogin.role=="customers")
      //     navigation.navigate("Customers")
    }
  }, [userLogin]);

  useEffect(() => {
    // Kiểm tra xem dữ liệu có hợp lệ không
    setIsValid(!(hasErrorEmail() || hasErrorPassword() || !email || !password));
  }, [email, password]);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Lỗi", "Tên đăng nhập và mật khẩu không được để trống");
    } else {
      login(dispatch, email, password);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10, justifyContent: "center" }}>
      <View style={{ flex: 0, padding: 10, justifyContent: "center" }}>
        <Image
          source={require("../asset/firebase_28dp.png")}
          style={{
            alignSelf: "center",
            marginVertical: 50,
            height: 150,
            width: 150
          }}
        />

        <TextInput
          style={{ backgroundColor: "white" }}
          label={"Email"}
          value={email}
          onChangeText={setEmail}
        />
        <HelperText type="error" visible={hasErrorEmail()}>
          Email phải chứa @
        </HelperText>
        <TextInput
          style={{ backgroundColor: "white" }}
          label={"Password"}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        <HelperText type="error" visible={hasErrorPassword()}>
          Password ít nhất 6 kí tự
        </HelperText>
        <Button
          mode="contained"
          buttonColor="blue"
          onPress={handleLogin}
          disabled={!isValid} // Sử dụng biến trạng thái để disable nút khi dữ liệu không hợp lệ
        >
          Login
        </Button>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Text>Bạn chưa có tài khoản ?</Text>
          <Button onPress={() => navigation.navigate("Register")}>
            Tạo tài khoản mới
          </Button>
        </View>
        {/* <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Button onPress={() => navigation.navigate("ForgotPassword")}>
            Quên mật khẩu
          </Button>
        </View> */}
      </View>
    </ScrollView>
  );
}

export default Login;
