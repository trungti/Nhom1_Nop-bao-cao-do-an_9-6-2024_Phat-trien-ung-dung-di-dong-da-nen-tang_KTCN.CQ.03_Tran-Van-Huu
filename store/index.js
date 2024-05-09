//////////////////////////////////////Code theo Slide////////////////////////////////////////////////////
import { createContext,useContext,useReducer,useMemo } from "react";
import auth from"@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";
const MyContext=createContext();
MyContext.displayName="MyContextContext";
const reducer = (state,action)=>{
    switch(action.type){
        case"USER_LOGIN":
            return{...state,userLogin:action.value};
        
        case"LOGOUT":
            return{...state,userLogin:null};
        
        default:
return new Error("Action not found")
break;
        

    }
}
const MyContextControllerProvider=({children})=>{
    const initialState={
        userLogin:null,
        jobs:[],
    };
    const [controller,dispatch]=useReducer(reducer,initialState);
    const value = useMemo(()=>[controller,dispatch],[controller]);
    return( <MyContext.Provider value={value}>
        {children}</MyContext.Provider>
    )
}
const useMyContextController=()=>{
    const context=useContext(MyContext);
    if(context==null)
    return new Error(
            "useMycontextController should be used inside the MyContextControllerProvider."
        )   
    return context
}
const USERS=firestore().collection("USERS")

// const login=(dispatch,email,password)=>{
//     auth().signInWithEmailAndPassword(email,password)
//     .then(
//         response=>
//             USERS.doc(email)
//         .onSnapshot(
//             u=>          
//             dispatch({type:"USER_LOGIN",value:u.data()})
//     )
//     )
// .catch(e=>Alert.alert("Sai user va passwd"))
// }
const login = (dispatch, email, password) => {
    auth().signInWithEmailAndPassword(email, password)
        .then(response =>
            USERS.doc(email).onSnapshot(u =>
                dispatch({ type: "USER_LOGIN", value: u.data() })
            )
        )
        .catch(error => {
            console.error("Firebase authentication error:", error);
            Alert.alert("Sai user và password");
        });
}
const logout=(dispatch)=>{
    auth().signOut()
    .then(()=>
    dispatch({type:"LOGOUT",}))
}
export{
    MyContextControllerProvider,
    useMyContextController,
    login,
    logout
}
////////////////////////////////////Code theo AI////////////////////////////////////////////////////////////////////////

