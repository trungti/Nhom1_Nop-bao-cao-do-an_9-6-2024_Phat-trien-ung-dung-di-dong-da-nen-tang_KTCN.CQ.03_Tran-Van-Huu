import React,{useEffect} from "react";

import { MyContextControllerProvider } from "./store/index";

import{NavigationContainer} from"@react-navigation/native";

import DieuHuongQuyen from "./routers/DieuHuongQuyen";
import ThemNguoiDung from "./screens/ThemNguoiDung";
const App=()=>{
    return(
        <MyContextControllerProvider>
            <NavigationContainer>
                <DieuHuongQuyen/>
                {/* <ThemNguoiDung/> */}
            </NavigationContainer>
        </MyContextControllerProvider>
    )
}

export default App;