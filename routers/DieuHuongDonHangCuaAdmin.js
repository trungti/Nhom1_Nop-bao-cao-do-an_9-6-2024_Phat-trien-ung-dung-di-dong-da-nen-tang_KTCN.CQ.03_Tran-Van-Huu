import { createStackNavigator } from "@react-navigation/stack";
import { useMyContextController } from "../store";
import { IconButton } from "react-native-paper";
import LichSuDonHangCuaAdmin from "../screens/LichSuDonHangCuaAdmin";
import ChiTietDonHangCuaAdmin from "../screens/ChiTietDonHangCuaAdmin";
const Stack=createStackNavigator();
export default DieuHuongDonHangCuaAdmin=()=>{
    const[controller,dispatch]=useMyContextController();
    const{userLogin}=controller;
   
    return(
        <Stack.Navigator initialRouteName="LichSuDonHangCuaAdmin"
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
           
            <Stack.Screen name="LichSuDonHangCuaAdmin" component={LichSuDonHangCuaAdmin}
           />
            <Stack.Screen name="ChiTietDonHangCuaAdmin" component={ChiTietDonHangCuaAdmin}
           />
       </Stack.Navigator>
    )
}