import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationActions } from '@react-navigation/native';
import MainScene from './MainScene';
import Logo from '../assets/images/logo2.png';
import styling from './constants/styling';
/*
const navigateToScreen = (routeName) => NavigationActions.replace({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName })
    ]
})
*/
/*
const navigateAction =() => {
    NavigationActions.navigate({
        routeName: 'Main',
      
        params: {},
      
        action: NavigationActions.navigate({ routeName: 'Main' }),
      });
}  
*/
class LoadingScene extends Component {
    
    state ={
        LogoAnime: new Animated.Value(0),
        LogoText: new Animated.Value(0),
        loadingSpinner: false,
       // navigation: this.props.navigation,
       
    };
   
    componentDidMount () {
        const {LogoAnime, LogoText} =this.state;
        let { navigation } = this.props;
        Animated.parallel([
            Animated.spring(LogoAnime, {
                toValue:1,
                tension:10,
                friction:2,
                duration :1000,

            }).start(),
            Animated.timing(LogoText,
                {
                    toValue:1,
                    duration:1300
                }),

        ])
        .start(()=> {
            this.setState({
                loadingSpinner:true,
            });
           setTimeout(navigation.navigate('Main'),1500);

        });
    }
    render(){
        
        return (

            <View style={styles.container}>
                
                <Animated.View style={{
                    opacity: this.state.LogoAnime,


                    top: this.state.LogoAnime.interpolate({
                        inputRange: [0, 1],
                        outputRange :[ 80 , 0],
                    }),
                }}><Image source={Logo}/>
                </Animated.View>
                <Animated.View style ={{opacity: this.state.LogoText}}>
                <Text style={styles.logoText}>
                   Reminder
                </Text>
                </Animated.View>
               
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,        
        backgroundColor: '#5257F2',
        justifyContent: 'center', //centré horizontalement
        alignItems:'center',
        marginTop:styling.marginTop,
    },
    logoText :{
        color: '#FFFFFF',
        fontSize: 30,
        marginTop: 29.1,
        fontWeight:'300',
    }
})
export default LoadingScene;
