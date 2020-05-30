import React, { Component,useContext } from 'react';
import { SafeAreaView,View, Text, StyleSheet, ScrollView,FlatList} from 'react-native';
import { Form, Item, Input, Body, CheckBox, Button } from 'native-base';
//import {Constants} from 'expo';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';

import styling from '../constants/styling';

import { AuthContext } from '../components/context';
//import { NavigationContainer } from 'react-navigation';

//import { useTheme } from 'react-native-paper';
//const { colors } = useTheme();
const RegistrationScreen = ({navigation}) => {
    const [data, setData] = React.useState({
        username: '',
        tel: '',
        password: '', 
        confirm_password: '',
        check_textInputNameChange: false,
        check_textInputTelChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
      //  isValidUser: true,
       // isValidPassword: true,
    });

    const textInputNameChange = (val) => {
        if (val.length > 0) {
            setData({
                ...data,
                username: val,
                check_textInputNameChange: true,

            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputNameChange: false,
                //isValidUser: false
            });
        }
    }
    const textInputTelChange = (val) => {
        if (val.length > 0) {
            setData({
                ...data,
                tel: val,
                check_textInputTelChange: true,

            });
        } else {
            setData({
                ...data,
                tel: val,
                check_textInputTelChange: false,
                //isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val,
        });
    }
    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val,
        });
    }
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        })
    }
     const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry,
        })
    }

    const {signUp} = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.top}></View>
            <Animatable.View
                style={styles.middle}
                animation="fadeInDown"
            >
                <Text style={styles.textContainer}>Register now</Text>
                <View style={styles.formArea}>
                    {
                        /*
                        <Text style={[styles.textContainer, styles.signin]}>Sign Up</Text>
                        */
                    }
                    <Form style={styles.mainForm}>

                        <Item style={styles.formItems}>
                            <FontAwesome
                                name="user-o"
                                color="#05375a"
                                size={20}
                            />
                            <Input placeholder="Username"
                                style={styles.Input}
                                onChangeText={(val) => textInputNameChange(val)}
                            />
                            {data.check_textInputNameChange
                                ? <Animatable.View
                                    animation="bounceIn"
                                >
                                    <Feather
                                        name="check-circle"
                                        color="green"
                                        size={20}
                                    />
                                </Animatable.View>
                                : null
                            }
                        </Item>
                      
                       <Item style={styles.formItems}>
                            <FontAwesome
                                name="phone"
                                color="#05375a"
                                size={20}
                            />
                            <Input placeholder="Tel"
                                style={styles.Input}
                                onChangeText={(val) => textInputTelChange(val)}
                            />
                            {data.check_textInputTelChange
                                ? <Animatable.View
                                    animation="bounceIn"
                                >
                                    <Feather
                                        name="check-circle"
                                        color="green"
                                        size={20}
                                    />
                                </Animatable.View>
                                : null
                            }
                        </Item>

                        <Item style={styles.formItems}
                        >
                            <Feather
                                name="lock"
                                color="#05375a"
                                size={20}
                            />
                            <Input
                                secureTextEntry={data.secureTextEntry}
                                placeholder="Password"
                                style={styles.Input}
                                onChangeText={(val) => handlePasswordChange(val)}
                            />
                            <TouchableOpacity
                                onPress={() => updateSecureTextEntry()}
                            >
                                {data.secureTextEntry
                                    ? <Feather
                                        name="eye-off"
                                        color="grey"
                                        size={20}
                                    />
                                    : <Feather
                                        name="eye"
                                        color="grey"
                                        size={20}
                                    />
                                }
                            </TouchableOpacity>
                        </Item>
                        <Item style={styles.formItems}
                        >
                            <Feather
                                name="lock"
                                color="#05375a"
                                size={20}
                            />
                            <Input
                                secureTextEntry={data.confirm_secureTextEntry}
                                placeholder="Confirm Password"
                                style={styles.Input}
                                onChangeText={(val) => handleConfirmPasswordChange(val)}
                            />
                            <TouchableOpacity
                                onPress={() => updateConfirmSecureTextEntry()}
                            >
                                {data.confirm_secureTextEntry
                                    ? <Feather
                                        name="eye-off"
                                        color="grey"
                                        size={20}
                                    />
                                    : <Feather
                                        name="eye"
                                        color="grey"
                                        size={20}
                                    />
                                }
                            </TouchableOpacity>
                        </Item>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => { signUp }}
                        >
                            <LinearGradient
                                colors={['#87CEFA', '#1E90FF']}
                                style={styles.signIn}
                            >

                                <Text style={[styles.textSign, { color: '#fff' }]}>Sign Up</Text>

                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    borderWidth: 1,
                                    marginTop: 15,
                                    borderColor: '#692E9C',
                                }]}
                            onPress={() => {navigation.navigate('Login') }}//navigation.navigate('SignUp')
                        >


                            <Text style={[styles.textSign, { color: '#191970' }]}>
                                Sign In
                                </Text>


                        </TouchableOpacity>
                        {
                            /*
                            <Button block style={styles.mainBtn}>
                            <Text style={styles.btnText}>Sign up</Text>
                        </Button>
                            */
                        }

                    </Form>
                </View>
            </Animatable.View>




        </SafeAreaView>
    )

}
export default RegistrationScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //position: 'relative',
        //paddingTop: Constants.statusBarHeight,
       marginTop:styling.marginTop,
        },
        top: {
        position: 'relative',
        backgroundColor: '#5257F2',
        paddingRight: 12.7,
        paddingLeft: 12.7,
        height: 250,
    },
    textContainer: {
        color: '#fcfdff',
        fontSize: 24,
        marginBottom: 30,
        position: 'relative',
        top: '20%',
        alignSelf: 'center',
    },
    middle: {
        width: '100%',
        height: '80%',
        flex: 1,
        position: 'absolute',
        zIndex: 2,
        backgroundColor: 'transparent',
        paddingLeft: 26.3,
        paddingRight: 26.3,
    },
    bottom: {
        position: 'relative',
        height: '100%',
        paddingRight: 12.7,
        paddingLeft: 12.7,

        backgroundColor: '#5257F2',
    },
    formArea: {
        alignSelf: 'center',
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        top: '20%',
       // paddingBottom: 30,
       height:'100%',

    },
    signin: {
        top: 0,
        color: '#2D3057',
        marginTop: 0,


    },
    formItems: {
        marginTop: 8,
        borderBottomColor: '#2D3057',
        paddingRight: 5,

    },
    Input: {
        //fontFamily: 'Poppins-Bold',
        fontSize: 18,
    },

    loginText: {
        color: '#2D3057',
        fontSize: 10,
        // fontFamily: 'GoogleSans-Bold',
        fontWeight: 'bold',
    },
    cboxText: {
        // fontFamily: 'GoogleSans-Medium',
        fontSize: 10,
    },

    mainBtn: {
        backgroundColor: '#1DDCAF',
        marginBottom: 20,
    },
    btnText: {
        color: '#2D3057',
        //fontFamily: 'GoogleSans-Medium',
        fontSize: 12,
    },
    //
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        borderRadius: 10,
        width: '100%',
        height: 50,
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    rememberMe: {
       // paddingLeft: 46.6,
       // display: 'flex',
       // flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'center',
      },

})