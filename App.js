
import React, { useState, useEffect , useMemo, useReducer} from 'react';
import {ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import LoadingScene from './scenes/LoadingScene';
import LoginScreen from './scenes/screens/LoginScreen';
import RegistrationScreen from './scenes/screens/RegistrationScreen';
import WelcomeScreen from './scenes/screens/WelcomeScreen';
import MainScene from './scenes/MainScene';
import AudioScreen from './scenes/screens/AudioScreen';
import { AppLoading } from 'expo';
import { Asset } from "expo-asset";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from './scenes/components/context';
import AsyncStorage from '@react-native-community/async-storage';
//import styling from './scenes/constants/styling';
const Src = [
  require('./assets/images/logo2.png'),
]

const RouteStack = createStackNavigator();

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(true);
  //const [isLoading,setIsLoading] = useState(true); //check if the user is authenticated
 // const [userToken, setUserToken] = useState(null);//usertoken is used to validate the user
 const initialLoginState = {
  isLoading: true,
  userName: null,
 // userTel: null,
  userToken: null,
};


 const loginReducer = (prevState, action) => {
  switch( action.type ) {
    case 'RETRIEVE_TOKEN': //when the user opens the app for the first time
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case 'LOGIN': 
      return {
        ...prevState,
        userName: action.id,
        userToken: action.token,
        isLoading: false,
      };
    case 'LOGOUT': 
      return {
        ...prevState,
        userName: null,
        userToken: null,
        isLoading: false,
      };
    case 'REGISTER': 
      return {
        ...prevState,
        userName: action.id,
        userToken: action.token,
        isLoading: false,
      };
  }
};


  /*
  	useMemo uses the memoization technique which is an optimization technique for speeding up the execution and within useMemo we can define those functions
  */
 const authContext = useMemo(() => ({
   signIn: async (foundUser) => {
     // setUserToken('yyy123');
      //setIsLoading(false);
   
      
     // if(userName=="User" && password=="password"){
      const userToken=foundUser[0].userToken;
      const userName = foundUser[0].userName;

        try {
         // userToken="yyy123";
          await AsyncStorage.setItem('userToken', userToken)
          /*
          setItem() is used both to add new data item (when no data for given key exists), 
          and to modify exiting item (when previous data for given key exists).
          */
        } catch (e) {
          console.log(e);
          // saving error
        }
      
     // console.log("user token while signIn: ",userToken);
      dispatch({type:'LOGIN',id:userName,token:userToken});
   },
   signOut: async() => {
    try {
      await AsyncStorage.removeItem('userToken');
      
    } catch(e) {
      console.log(e);
      // error reading value
    }
    //setUserToken(null);
  //  setIsLoading(false);
    dispatch({type:'LOGOUT'});

   },
   signUp: () => {
   // setUserToken('yyy123');
   // setIsLoading(false);
   },
 }), [] ); // we add an empty array so it doesn't run each time we rerender the component

 /*
We implement authentication by using global state management system properly by using useReducer 
 ( we create a reducer function and provide initial state for it).
 */

const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  handleResourcesAsync = async () => {
    // we're caching all the images for better performance on the app
    const cacheSrc = Src.map(src => {
      return Asset.fromModule(src).downloadAsync();
    });
    return Promise.all(cacheSrc);
  }
  // useEffect() react hook runs when the component is being rendered, to check if the user is authenticated or not
  //useEffect function is executed every time the component re-renders or is rendered
  useEffect(() => {
    setTimeout(async() => {
     // setIsLoading(false);
     let userToken;
     userToken = null;
     try {
      userToken = await AsyncStorage.getItem('userToken')
     // return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      console.log(e);
      // error reading value
    }
     console.log("user token : ",userToken);
     dispatch({type:'RETRIEVE_TOKEN',token: userToken});
    }, 1500);
  }, []);
  
  if (!loadingComplete) { //&& props.skipLoadingScreen
    return (
      <AppLoading
        startAsync={handleResourcesAsync}
        onError={error => console.warn(error)}
        onFinish={() => setLoadingComplete(true)}
      />
    )
  }

  if(loginState.isLoading ) { //with reducer isLoading is found in loginState returned by the reducer
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large" color="#512DA8"/> 
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
  /* when passing authContext as value we can use its value in other components */
  /*
        <RouteStack.Navigator headerMode='none' initialRouteName="Welcome">
        <RouteStack.Screen name="Loading" component={LoadingScene}></RouteStack.Screen>
        <RouteStack.Screen name="Main" component={MainScene}></RouteStack.Screen>

      </RouteStack.Navigator>
        */
  return (
    
   <AuthContext.Provider value={authContext}> 
   {loginState.userToken != null 
   ? (
     <AudioScreen/>
   )
   :
<NavigationContainer>
   <MainScene/>
</NavigationContainer>
  }   
   </AuthContext.Provider> 
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop:styling.marginTop,
  },
  loadingText: {
    color: '#512DA8',
    fontSize: 14,
    fontWeight: 'bold'
  }
});
