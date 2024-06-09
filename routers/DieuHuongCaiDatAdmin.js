import { createStackNavigator } from "@react-navigation/stack";
import { useMyContextController } from "../store";
import { IconButton } from "react-native-paper";
import CaiDatAdmin from "../screens/CaiDatAdmin";
import DieuKhoanSuDung from "../screens/DieuKhoanSuDung";
import NguoiDung from "../screens/NguoiDung";
import ChiTietNguoiDung from "../screens/ChiTietNguoiDung";
import ThemNguoiDung from "../screens/ThemNguoiDung";
import SuaNguoiDung from "../screens/SuaNguoiDung";
const Stack=createStackNavigator();
export default DieuHuongCaiDatAdmin=()=>{
    const[controller,dispatch]=useMyContextController();
    const{userLogin}=controller;
   
    return(
        <Stack.Navigator initialRouteName="CaiDatAdmin"
        screenOptions={{
            headerShown:false
            // title:(userLogin!=null)&&(userLogin.name),
            // headerTitleAlign:"center",
            // headerStyle:{
            //     backgroundColor:"pink"
            // },
            // headerRight:(props)=><IconButton icon={"account"}/>
        }}
        >
          <Stack.Screen name="SuaNguoiDung" component={SuaNguoiDung}
           />
             <Stack.Screen name="ThemNguoiDung" component={ThemNguoiDung}
           />
             <Stack.Screen name="ChiTietNguoiDung" component={ChiTietNguoiDung}
           />
            <Stack.Screen name="NguoiDung" component={NguoiDung}
           />
            <Stack.Screen name="CaiDatAdmin" component={CaiDatAdmin}
           />
            <Stack.Screen name="DieuKhoanSuDung" component={DieuKhoanSuDung}
           />
       </Stack.Navigator>
    )
}