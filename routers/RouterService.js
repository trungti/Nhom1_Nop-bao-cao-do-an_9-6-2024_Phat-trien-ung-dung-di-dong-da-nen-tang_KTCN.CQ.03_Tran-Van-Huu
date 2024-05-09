import { createStackNavigator } from "@react-navigation/stack";
import { useMyContextController } from "../store";
import Register from "../screens/Register";
import Login from "../screens/Login";
import Services from"../screens/Services";
import { Provider } from "react-redux";
const Stack=createStackNavigator();
export default RouterServices=()=>{
    const[controller,dispatch]=useMyContextController();
    const{userLogin}=controller;
    return(
        <Stack.Navigator initialRouteName="Login"
        screenOptions={{
            //headerTitle:"Home",
            title:(userLogin!=null)&&(userLogin.name), 
            headerTitleAlign:"center",
            headerStyle:{
                backgroundColor:"white"
            }
        }}
        
        >
             <Stack.Screen name="Register" component={Register}/>
            <Stack.Screen name="Services" component={Services}/>
            <Stack.Screen name="Login" component={Login}/>
            
        
       </Stack.Navigator>
    )
}