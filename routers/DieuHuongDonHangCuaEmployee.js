import { createStackNavigator } from "@react-navigation/stack";
import { useMyContextController } from "../store";
import { IconButton } from "react-native-paper";
import LichSuDonHangCuaEmployee from "../screens/LichSuDonHangCuaEmployee";
import ChiTietDonHangCuaEmployee from "../screens/ChiTietDonHangCuaEmployee";
const Stack=createStackNavigator();
export default DieuHuongDonHangCuaEmployee=()=>{
    const[controller,dispatch]=useMyContextController();
    const{userLogin}=controller;
   
    return(
        <Stack.Navigator initialRouteName="LichSuDonHangCuaEmployee"
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
           
            <Stack.Screen name="LichSuDonHangCuaEmployee" component={LichSuDonHangCuaEmployee}
           />
            <Stack.Screen name="ChiTietDonHangCuaEmployee" component={ChiTietDonHangCuaEmployee}
           />
       </Stack.Navigator>
    )
}