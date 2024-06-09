import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
//import Router from "../routers/Router";
//import { TransitionPresets } from "@react-navigation/stack";
import DieuHuongBanHang from "../routers/DieuHuongBanHang";
import DieuHuongDonHangCuaAdmin from "../routers/DieuHuongDonHangCuaAdmin";
import DieuHuongCaiDatAdmin from "../routers/DieuHuongCaiDatAdmin";
import DieuHuongHangHoa from "../routers/DieuHuongHangHoa";
const Tab=createMaterialBottomTabNavigator()
const Admin=()=>{
    return(
        <Tab.Navigator>
        <Tab.Screen name="DieuHuongDonHangCuaAdmin" component={DieuHuongDonHangCuaAdmin}
        options={{
            title:"Hóa đơn",
            tabBarIcon:"card-text-outline"
        }}
        />
        <Tab.Screen name="DieuHuongBanHang" component={DieuHuongBanHang}
        options={{
            title:"Bán hàng",
            tabBarIcon:"cart-variant"
        }}
        />
         <Tab.Screen name="DieuHuongHangHoa" component={DieuHuongHangHoa}
        options={{
            title:"Hàng hóa",
            tabBarIcon:"cube-outline"
        }}
        />
        <Tab.Screen name="DieuHuongCaiDatAdmin" component={DieuHuongCaiDatAdmin}
        options={{
            title:"Nhiều hơn",
            tabBarIcon:"store-cog"
        }}
        />
        </Tab.Navigator>
    )
}
export default Admin;