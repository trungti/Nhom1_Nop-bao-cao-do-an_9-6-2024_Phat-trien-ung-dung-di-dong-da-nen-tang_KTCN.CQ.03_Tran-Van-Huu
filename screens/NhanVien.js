import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
//import Router from "../routers/Router";
//import { TransitionPresets } from "@react-navigation/stack";
import DieuHuongBanHang from "../routers/DieuHuongBanHang";
import DieuHuongDonHangCuaEmployee from "../routers/DieuHuongDonHangCuaEmployee";
import DieuHuongCaiDatEmployee from "../routers/DieuHuongCaiDatEmployee";
const Tab=createMaterialBottomTabNavigator()
const NhanVien=()=>{
    return(
        <Tab.Navigator>
        <Tab.Screen name="DieuHuongBanHang" component={DieuHuongBanHang}
        options={{
            title:"Bán hàng",
            tabBarIcon:"cart-variant"
        }}
        />
        <Tab.Screen name="DieuHuongDonHangCuaEmployee" component={DieuHuongDonHangCuaEmployee}
        options={{
            title:"Lịch sử",
            tabBarIcon:"clock-time-nine-outline"
        }}
        />
        <Tab.Screen name="DieuHuongCaiDatEmployee" component={DieuHuongCaiDatEmployee}
        options={{
            title:"Nhiều hơn",
            tabBarIcon:"store-cog"
        }}
        />
        </Tab.Navigator>
    )
}
export default NhanVien;