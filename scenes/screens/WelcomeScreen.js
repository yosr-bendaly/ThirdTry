import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    Animated
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import styling from '../constants/styling';
//import MaterialIcons from '@expo/vector-icons/fonts/MaterialIcons.ttf';
/*await Font.loadAsync({
    MaterialIcons
  });
  */
 //import FontAwesome from './node_modules/#expo/vector-icons/fonts/FontAwesome.ttf';
//import MaterialIcons from './node_modules/#expo/vector-icons/fonts/MaterialIcons.ttf';

const WelcomeScreen= ({navigation}) =>{ //{navigation}

    return(
        <View style={styles.container}>
           {/*<StatusBar backgroundColor='#ffffff' barStyle="light-content"/>*/} 
            <View style={styles.header}>
                <Animatable.Image
               animation="bounceIn"
              // duration="1500"
                source={require('../../assets/images/logo1.png')}
                style={styles.logo}
                resizeMode="stretch"
                />
            </View>
            <Animatable.View  
            style={styles.footer}
            animation="fadeInUpBig"
            >
                <Text style={styles.title}>Stay reminding everyone</Text>
                <Text style={styles.text}>You have to be logged in</Text>
                <View style={styles.button}>
                <TouchableOpacity onPress={()=>navigation.navigate('Login')} /* navigation.navigate('Login')*/>
                    <LinearGradient
                    colors={['#00BFFF','#1E90FF']}
                    style={styles.signIn}
                    >
                        <Text style={styles.textSign}>Get started</Text>
                        {/*
                        <Materialicons
                            name="navigate-next"
                            color="#fff"
                            size={20}
                        /> 
                        */}
                    </LinearGradient>
                </TouchableOpacity>
                </View>
            </Animatable.View >
        </View>
    )
}
export default WelcomeScreen;
const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#5257F2',
      marginTop:styling.marginTop,
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop:5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
  });