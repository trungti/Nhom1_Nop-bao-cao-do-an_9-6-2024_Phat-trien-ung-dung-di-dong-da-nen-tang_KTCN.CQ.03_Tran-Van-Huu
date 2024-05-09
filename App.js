import React,{useEffect} from "react";
import firestore from"@react-native-firebase/firestore";
import { useMyContextController } from "./store";

//import { NativeModules, StyleSheet } from "react-native";
import { MyContextControllerProvider } from "./store/index";
//import { BottomNavigation } from "react-native-paper";
import{NavigationContainer} from"@react-navigation/native";
import auth from"@react-native-firebase/auth";
import Login from "./screens/Login";
import RouterService from "./routers/RouterService";
const App=()=>{
    return(
        <MyContextControllerProvider>
            <NavigationContainer>
                <RouterService/>
            </NavigationContainer>
        </MyContextControllerProvider>
    )
}

export default App;