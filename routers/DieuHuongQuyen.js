
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import NhanVien from "../screens/NhanVien";
import Admin from "../screens/Admin";
const Stack=createStackNavigator();
const DieuHuongQuyen=()=>{
    return(
        <Stack.Navigator initialRouteName="Login"
        screenOptions={{
            headerShown:false
        }}
        >
                 <Stack.Screen name="Admin" component={Admin}/>
     <Stack.Screen name="NhanVien" component={NhanVien}/>
     <Stack.Screen name="Login" component={Login}/>
        </Stack.Navigator>
    )
}
export default DieuHuongQuyen