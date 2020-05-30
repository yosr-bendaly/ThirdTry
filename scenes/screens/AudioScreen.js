import React, { useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    Animated,

} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome,FontAwesomeIcon } from '@expo/vector-icons';
import Feather from 'react-native-vector-icons/Feather';
import styling from '../constants/styling';
import { AuthContext } from '../components/context';
//import MaterialIcons from '@expo/vector-icons/fonts/MaterialIcons.ttf';
/*await Font.loadAsync({
    MaterialIcons
  });
  */
//import FontAwesome from './node_modules/#expo/vector-icons/fonts/FontAwesome.ttf';
//import MaterialIcons from './node_modules/#expo/vector-icons/fonts/MaterialIcons.ttf';

const AudioScreen = ({ navigation }) => { //{navigation}
    const { signOut } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text style={{fontSize:40,paddingBottom:20}}>Audio Application</Text>
            <TouchableOpacity onPress={()=>signOut()} /* navigation.navigate('Login')*/>
                    <LinearGradient
                    colors={['#00BFFF','#1E90FF']}
                    style={styles.signIn}
                    >
                        <Text style={styles.textSign}>log out</Text>
                        {/*
                        <Materialicons
                            name="navigate-next"
                            color="#fff"
                            size={20}
                        /> 
                        */}
                       <Feather 
                       name="log-out"
                       color="#05375a"
                       size={20}
                       />
                          
                    </LinearGradient>
                </TouchableOpacity>
        </View>
    )
}
export default AudioScreen;
const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#5257F2',
        marginTop: styling.marginTop,
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },

});