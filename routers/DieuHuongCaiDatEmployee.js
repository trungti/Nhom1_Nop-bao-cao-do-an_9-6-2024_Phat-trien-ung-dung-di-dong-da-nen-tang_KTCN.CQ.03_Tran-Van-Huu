import { createStackNavigator } from "@react-navigation/stack";
import { useMyContextController } from "../store";
import { IconButton } from "react-native-paper";
import CaiDatNhanVien from "../screens/CaiDatNhanVien";
import DieuKhoanSuDung from "../screens/DieuKhoanSuDung";
const Stack=createStackNavigator();
export default DieuHuongCaiDatEmployee=()=>{
    const[controller,dispatch]=useMyContextController();
    const{userLogin}=controller;
   
    return(
        <Stack.Navigator initialRouteName="CaiDatNhanVien"
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
            <Stack.Screen name="CaiDatNhanVien" component={CaiDatNhanVien}
           />
            <Stack.Screen name="DieuKhoanSuDung" component={DieuKhoanSuDung}
           />
       </Stack.Navigator>
    )
}