import { createStackNavigator } from "@react-navigation/stack";
import { useMyContextController } from "../store";
import { IconButton } from "react-native-paper";
import HangHoa from "../screens/HangHoa";
import ThemSanPham from "../screens/ThemSanPham";
import SuaHangHoa from "../screens/SuaHangHoa";
const Stack=createStackNavigator();
export default DieuHuongHangHoa=()=>{
    const[controller,dispatch]=useMyContextController();
    const{userLogin}=controller;
   
    return(
        <Stack.Navigator initialRouteName="HangHoa"
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
            <Stack.Screen name="SuaHangHoa" component={SuaHangHoa}
           />
            <Stack.Screen name="HangHoa" component={HangHoa}
           />
            <Stack.Screen name="ThemSanPham" component={ThemSanPham}
           />
       </Stack.Navigator>
    )
}