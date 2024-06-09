import { createStackNavigator } from "@react-navigation/stack";
import { useMyContextController } from "../store";
import { IconButton } from "react-native-paper";
import BanHang from"../screens/BanHang";
import KhachHang from"../screens/KhachHang"
import ThemKhachHang from "../screens/ThemKhachHang";
import ThemSanPham from "../screens/ThemSanPham";
import HoaDon from "../screens/HoaDon";
import ThanhToan from "../screens/ThanhToan";
import ChiTietSanPham from "../screens/ChiTietSanPham";

const Stack=createStackNavigator();
export default DieuHuongBanHang=()=>{
    const[controller,dispatch]=useMyContextController();
    const{userLogin}=controller;
   
    return(
        <Stack.Navigator initialRouteName="BanHang"
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
            <Stack.Screen name="BanHang" component={BanHang}
           />
            <Stack.Screen name="ChiTietSanPham" component={ChiTietSanPham}
           />
            <Stack.Screen name="KhachHang" component={KhachHang}
            />
             <Stack.Screen name="ThemSanPham" component={ThemSanPham}
            />
            <Stack.Screen name="ThemKhachHang" component={ThemKhachHang}
            />
             <Stack.Screen name="HoaDon" component={HoaDon}
           />
          <Stack.Screen name="ThanhToan" component={ThanhToan}
           />
       </Stack.Navigator>
    )
}