import React, { Component, useContext } from 'react';
import { View, Text, StyleSheet ,Alert} from 'react-native';
import { Form, Item, Input, Body, CheckBox, Button } from 'native-base';
//import {Constants} from 'expo';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styling from '../constants/styling';
import { AuthContext } from '../components/context';
import users from '../../model/users';
//import { useTheme } from 'react-native-paper';
//const { colors } = useTheme();
const LoginScreen = ({ navigation }) => {
    const [data, setData] = React.useState({
        username: '',
        tel: '',
        password: '',
        check_textInputNameChange: false,
        check_textInputTelChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const textInputNameChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                username: val,
                check_textInputNameChange: true,
                isValidUser: true,
               // isValidPassword:true,

            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputNameChange: false,
                isValidUser: false
            });
        }
    }
    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        })
    }

    //after adding reducer
    const loginHandle = (userName, password) => {
        if ( userName.length == 0 || password.length == 0 ) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }
        if ( userName.length < 4 || password.length < 8 ) {
            
            return;
        }
        const foundUser = users.filter( item => {
            return userName == item.username && password == item.password;
        } );
       
        if ( foundUser.length == 0 ) {
            Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                {text: 'Okay'}
            ]);
            return;
        }
        signIn(foundUser);
        //signIn(username, password);
    }

    const { signIn } = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <View style={styles.top}></View>
            <Animatable.View
                style={styles.middle}
                animation="fadeInDown"
            >
                <Text style={styles.textContainer}>You are ready to go</Text>
                <View style={styles.formArea}>
                    <Text style={[styles.textContainer, styles.signin]}>Sign In</Text>
                    <Form style={styles.mainForm}>

                        <Item style={styles.formItems}>
                            <FontAwesome
                                name="user-o"
                                color="#05375a"
                                size={20}
                            />
                            <Input placeholder="Username (at least 4 characters)"
                                style={styles.Input}
                                onChangeText={(val) => textInputNameChange(val)}
                                onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
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
                        {data.isValidUser ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>
                                <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
                            </Animatable.View>
                        }

                        <Item style={[styles.formItems,
                        { marginBottom: 10 }]}
                        >
                            <Feather
                                name="lock"
                                color="#05375a"
                                size={20}
                            />
                            <Input
                                secureTextEntry={data.secureTextEntry}
                                placeholder="Password (at least 8 char)"
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
                        {data.isValidPassword ? null :
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                                </Animatable.View>
                            }
                        <View style={styles.rememberMe}>


                            <CheckBox checked={true} />
                            <Body>
                                <Text style={styles.cboxText}>Remember Me</Text>
                            </Body>



                            <TouchableOpacity>
                                <Text style={[{ color: '#009387', paddingLeft: 15 }]}>Forgot password?</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            /*
                         
                            */
                        }
                        {
                            /*
                            <View style={styles.loginAs}>
                            <Text style={styles.loginText}>Login as</Text>
                        <CheckBox checked={true} />
                        <Body>
                            <Text style={styles.cboxText}>Admin</Text>
                        </Body>
                        <CheckBox checked={false} />
                        <Body>
                            <Text style={styles.cboxText}>User</Text>
                        </Body>
                           </View>
                            */
                        }

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => { loginHandle(data.username, data.password) }}
                        >
                            <LinearGradient
                                colors={['#87CEFA', '#1E90FF']}
                                style={styles.signIn}
                            >

                                <Text style={[styles.textSign, { color: '#fff' }]}>Sign In</Text>

                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    borderWidth: 1,
                                    marginTop: 15,
                                    borderColor: '#008080',
                                }]}
                            onPress={() => { navigation.navigate('Registration') }}//navigation.navigate('SignUp')
                        >


                            <Text style={[styles.textSign, { color: '#191970' }]}>
                                Sign Up
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




        </View>
    )

}
export default LoginScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //position: 'relative',
        //paddingTop: Constants.statusBarHeight,
        marginTop: styling.marginTop,
    },
    top: {
        position: 'relative',
        backgroundColor: '#5257F2',
        paddingRight: 12.7,
        paddingLeft: 12.7,
        height: 250
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
        paddingBottom: 40,
        height:'100%',

    },
    signin: {
        top: 0,
        color: '#2D3057',
        marginTop: 5,


    },
    formItems: {
        marginTop: 5,
        borderBottomColor: '#2D3057',
        paddingRight: 5,

    },
    Input: {
        //fontFamily: 'Poppins-Bold',
        fontSize: 16,
    },

    loginText: {
        color: '#2D3057',
        fontSize: 10,
        // fontFamily: 'GoogleSans-Bold',
        fontWeight: 'bold',
    },
    cboxText: {
        // fontFamily: 'GoogleSans-Medium',
        fontSize: 14,
        marginLeft: 0,
    },

    mainBtn: {
        backgroundColor: '#1DDCAF',
        marginBottom: 10,
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
        marginTop: 15,
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
        margin: 20,
        // paddingLeft: 46.6,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 20,
        alignItems: 'center',

        //justifyContent: 'center',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
        marginLeft: 15,

    },

})