import React, { useEffect, useState } from "react";
import { Alert, Image, View, ScrollView, TouchableOpacity,Linking } from "react-native";
import { Appbar, Button, IconButton, Text, TextInput } from "react-native-paper";
import { login, useMyContextController } from "../store";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const Login = ({ navigation }) => {
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;

  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    console.log(userLogin)
    if (userLogin != null) {
      if(userLogin.role === "admin")
        navigation.navigate("Admin");
      else if(userLogin.role === "employee")
        navigation.navigate("NhanVien");
    }
  }, [userLogin]);

  const handleLogin = () => {
    if (!email && !password) {
      Alert.alert("Cảnh báo", "Bạn chưa nhập tên đăng nhập !");
    } 
    else if (!password) {
      Alert.alert("Cảnh báo", "Bạn chưa nhập mật khẩu !");
    } else {
      login(dispatch, email, password);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center"}}>
      <View style={{ alignItems: "center", padding: 20, backgroundColor: "white"}}>
        <Image
          source={require("../asset/429652822_857938239677419_1061356817493488217_n.jpg")}
          style={{
            width: 80,
            height: 80,
            marginBottom: 20
          }}
        />
        <Text style={{ color: "white", fontSize: 18, marginBottom: 20, color: "blue" }}>CHÁO DINH DƯỠNG</Text>
      </View>
      <View style={{ paddingHorizontal: 20, backgroundColor: "green",bottom:20,height:500 }}>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <View style={{flexDirection:"row",backgroundColor:"white"}}>
        <IconButton icon="account"/>
        <TextInput
          style={{marginBottom: 10,width:320, color: "white"}}
          backgroundColor="white"
          label="Tên đăng nhập"
          value={email}
          onChangeText={setUsername}
        />
        </View>
        <Text></Text>
        <View style={{flexDirection:"row",backgroundColor:"white"}}>
        <IconButton icon="lock"/>
        <TextInput
          style={{marginBottom: 20,width:320, color: "white" }}
          backgroundColor="white"
          label="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          // right={
          //   <TextInput.Icon
          //     icon="eye"
          //     onPress={() => setShowPassword(!showPassword)}
          //   />
          // }
        />
        </View>
         <Button onPress={() => navigation.navigate("ForgotPassword")} style={{marginBottom: 20,left:120 }}>
        <Text style={{color:"white"}}>Quên mật khẩu?</Text>
        </Button>
        <Button
          mode="contained"
          onPress={handleLogin}
          style={{ marginBottom: 10,backgroundColor:"white" }}
        >
        <Text style={{color:"green",fontWeight:"bold"}}>ĐĂNG NHẬP</Text> 
        </Button>
        <Text></Text>
        <View style={{ alignItems: "center"}}>
          <Text style={{ color: "white", marginBottom: 10 }}>Bạn chưa có tài khoản?</Text>
          <Text></Text>
          <View style={{flexDirection:"row"}}>

          <Image
          source={require("../asset/429652822_857938239677419_1061356817493488217_n.jpg")}
          style={{
            width: 30,
            height: 30,
            marginBottom: 20
          }}
        />
          <Text style={{color:"white"}}>      CHÁO DINH DƯỠNG </Text>
          </View>
          <TouchableOpacity onPress={() => Linking.openURL('tel:0973549999')}>
<View style={{flexDirection:"row"}}>
          <IconButton style={{backgroundColor:"white"}} icon="phone"/>
          <Button>
          <Text style={{color:"white"}}> Hỗ trợ 0973549999</Text>
          </Button>
          </View>
          </TouchableOpacity>
        
        </View>
      </View>
    </ScrollView>
  );
}

export default Login;
