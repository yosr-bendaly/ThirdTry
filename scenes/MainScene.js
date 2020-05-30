import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import { createCompatNavigatorFactory } from '@react-navigation/compat';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import WelcomeScreen from './screens/WelcomeScreen';

const RootStack = createStackNavigator();

const MainScene = ({ navigation }) => {
    return (

        <RootStack.Navigator headerMode='none' initialRouteName="Welcome">
            <RootStack.Screen name="Welcome" component={WelcomeScreen} />
            <RootStack.Screen name="Login" component={LoginScreen} />
            <RootStack.Screen name="Registration" component={RegistrationScreen} />
        </RootStack.Navigator>

    );
}
export default MainScene;