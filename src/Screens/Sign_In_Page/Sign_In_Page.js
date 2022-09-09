import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, TextInput, Animated, Image, View } from 'react-native';
import Colors from '../../Utils/Colors/Colors';
import { fonts } from '../../Fonts/Fonts';
import { useSelector } from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';
import Feather from 'react-native-vector-icons/Feather';
import { none_null } from '../../Utils/None_Null/None_Null';
import Axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { api_base_endpoint } from '../../Configs/API/API_Base_Endpoint';
import { es_user_session } from '../../Configs/Secure/Secure_Storage';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';

const SignInPage = ({ navigation }) => {
  const isDarkMode = useSelector(state => state.isDarkMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [disableSignIn, setDisableSignIn] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('Warning');
  const [alertMsg, setAlertMsg] = useState('Please, input your correct Credentials.');

  const animateScale = useRef(new Animated.Value(1.1)).current;

  const password_checker = () => {
    return none_null(password) ? false : true;
  };

  const email_checker = () => {
    if (email?.length >= 5 && email?.includes('@') && email?.includes('.')) {
      return true;
    } else {
      return false;
    }
  };

  const sign_in = () => {
    if (email_checker() && password_checker()) {
      setDisableSignIn(true);
      setShowSpinner(true);
      try {
        Axios.post(`${api_base_endpoint()}users/auth/signin`, {
          email: email,
          password: password,
        })
          .catch(err => {
            if (err) {
              setShowSpinner(false);
              setDisableSignIn(false);
              setAlertTitle('Error');
              setAlertMsg('Login Error');
              setShowAlert(true);
            }
          })
          .then(async res => {
            if (res?.data?.status === 'success') {
              try {
                await EncryptedStorage.setItem(
                  es_user_session(),
                  JSON.stringify({
                    token: res?.data?.response?.token,
                    uid: res?.data?.response?.uid,
                  })
                )
                  .catch(err => {
                    if (err) {
                      setShowSpinner(false);
                      setDisableSignIn(false);
                      setAlertTitle('Error');
                      setAlertMsg("Failed to Store User's info, please Login into your account to retry.");
                      setShowAlert(true);
                    }
                  })
                  .then(result => {
                    if (result) {
                      if (res?.data?.response?.email_v) {
                        setShowSpinner(false);
                        setDisableSignIn(false);
                        setTimeout(() => {
                          navigation.navigate('Home');
                        }, 150);
                      } else {
                        setShowSpinner(false);
                        setDisableSignIn(false);
                        setTimeout(() => {
                          navigation.navigate('ConfirmMail');
                        }, 150);
                      }
                    } else {
                      setShowSpinner(false);
                      setDisableSignIn(false);
                      setAlertTitle('Error');
                      setAlertMsg("Failed to Store User's info, please Login into your account to retry.");
                      setShowAlert(true);
                    }
                  });
              } catch (error) {
                setShowSpinner(false);
                setDisableSignIn(false);
                setAlertTitle('Error');
                setAlertMsg("Failed to Store User's info, please Login into your account to retry.");
                setShowAlert(true);
              }
            } else if (res?.data.status === 'error' && res?.data?.code === 'ERR-BLGD-010') {
              setShowSpinner(false);
              setDisableSignIn(false);
              setAlertTitle('Error');
              setAlertMsg('Email does not exist!!!');
              setShowAlert(true);
            } else if (res?.data.status === 'error' && res?.data?.code === 'ERR-BLGD-012') {
              setShowSpinner(false);
              setDisableSignIn(false);
              setAlertTitle('Error');
              setAlertMsg('Password is incorrect!!!');
              setShowAlert(true);
            } else {
              setShowSpinner(false);
              setDisableSignIn(false);
              setAlertTitle('Error');
              setAlertMsg(res?.data?.code);
              setShowAlert(true);
            }
          });
      } catch (error) {
        setShowSpinner(false);
        setDisableSignIn(false);
        setAlertTitle('Error');
        setAlertMsg('Login Error');
        setShowAlert(true);
      }
    } else {
      setShowSpinner(false);
      setDisableSignIn(false);
      setAlertTitle('Warning');
      setAlertMsg('Please, input your correct credentials.');
      setShowAlert(true);
    }
  };

  const hideAlert = () => {
    setShowSpinner(false);
    setDisableSignIn(false);
    setShowAlert(false);
  };

  useEffect(() => {
    Animated
      .timing(animateScale, { toValue: 1, useNativeDriver: true, duration: 170 })
      .start();
  }, [animateScale]);

  return (
    <SafeAreaView style={[styles.signin_main, { backgroundColor: Colors(isDarkMode).BaseBG }]}>
      <OverlaySpinner showSpinner={showSpinner} />
      <AwesomeAlert
        show={showAlert}
        title={alertTitle}
        message={alertMsg}
        showProgress={false}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Got it!"
        confirmButtonColor={Colors().Primary}
        onConfirmPressed={hideAlert}
        onCancelPressed={hideAlert}
        onDismiss={hideAlert}
        contentContainerStyle={{ backgroundColor: Colors(isDarkMode).AlertBG }}
        titleStyle={[styles.alert_title_style, { color: Colors(isDarkMode).RedBG }]}
        messageStyle={[styles.alert_message_style, { color: Colors(isDarkMode).AlertText }]}
        confirmButtonTextStyle={styles.alert_confirm_button_text_style}
      />
      {navigation?.canGoBack() &&
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.si_gb}>
          <Feather
            name="chevron-left"
            size={38}
            color={Colors(isDarkMode).BaseText}
          />
        </TouchableOpacity>
      }
      {isDarkMode
        ?
        <Image
          style={styles.si_b_l}
          source={require('../../Images/Blogged_Logo_White.png')}
        />
        :
        <Image
          style={styles.si_b_l}
          source={require('../../Images/Blogged_Logo_Black.png')}
        />
      }
      <Animated.View style={[styles.si_w, { backgroundColor: Colors(isDarkMode).HighLightBG, transform: [{ scale: animateScale }] }]}>
        <Text style={[styles.si_w_bi, { color: Colors(isDarkMode).BaseText }]}>Login into your account</Text>
        <Text style={[styles.si_w_t, { color: Colors(isDarkMode).BasePHText }]}>Email</Text>
        <TextInput
          placeholder="Enter your Email Address"
          placeholderTextColor={Colors(isDarkMode).BasePHText}
          style={[styles.si_w_ti, { color: Colors(isDarkMode)?.BaseText, backgroundColor: Colors(isDarkMode).SearchBarBG }]}
          value={email}
          onChangeText={text => setEmail(text?.trim())}
        />
        <Text style={[styles.si_w_t, { color: Colors(isDarkMode).BasePHText }]}>Password</Text>
        <View style={[styles.si_hp, { backgroundColor: Colors(isDarkMode).SearchBarBG }]}>
          <TextInput
            placeholder="Enter your Password"
            placeholderTextColor={Colors(isDarkMode).BasePHText}
            style={[styles.si_w_hp_ti, { color: Colors(isDarkMode)?.BaseText }]}
            value={password}
            onChangeText={text => setPassword(text?.trim())}
            secureTextEntry={hidePassword}
          />
          {hidePassword
            ?
            <TouchableOpacity activeOpacity={0.65} onPress={() => setHidePassword(!hidePassword)} style={{ marginRight: 2 }}>
              <Feather
                name="eye"
                size={25}
                color={Colors(isDarkMode).BaseText}
              />
            </TouchableOpacity>
            :
            <TouchableOpacity activeOpacity={0.65} onPress={() => setHidePassword(!hidePassword)} style={{ marginRight: 2 }}>
              <Feather
                name="eye-off"
                size={25}
                color={Colors(isDarkMode).BaseText}
              />
            </TouchableOpacity>
          }
        </View>
        <View style={styles.si_fp_w}>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.si_fp_t}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.65}
          style={[styles.si_w_b, { backgroundColor: Colors().Primary }]}
          onPress={sign_in}
          disabled={disableSignIn}
        >
          <Text style={styles.si_w_b_t}>Sign In</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};


export default SignInPage;

const styles = StyleSheet.create({
  signin_main: {
    flex: 1,
    alignItems: 'center',
  },
  si_gb: {
    position: 'absolute',
    left: 10,
    top: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  si_b_l: {
    width: 320,
    height: 320,
    transform: [{ scale: 1.35 }],
    position: 'absolute',
    top: 60,
  },
  si_w: {
    width: '90%',
    height: 350,
    marginTop: 'auto',
    marginBottom: 30,
    borderRadius: 20,
    padding: 20,
    zIndex: 2,
  },
  si_w_bi: {
    fontFamily: fonts.Poppins_600,
    fontSize: 27,
  },
  si_w_t: {
    fontFamily: fonts.Poppins_400,
    marginBottom: 2,
    fontSize: 15,
    marginLeft: 4,
    marginTop: 19,
  },
  si_w_ti: {
    height: 45,
    maxHeight: 45,
    borderRadius: 8,
    fontFamily: fonts.Poppins_400,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  si_hp: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  si_w_hp_ti: {
    height: 45,
    maxHeight: 45,
    fontFamily: fonts.Poppins_400,
    fontSize: 16,
    flex: 1,
  },
  si_fp_w: {
    marginTop: 12,
    alignItems: 'flex-end',
  },
  si_fp_t: {
    fontFamily: fonts.Poppins_400,
    color: Colors().Primary,
    marginRight: 3,
  },
  si_w_b: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 8,
    marginTop: 'auto',
    marginBottom: 5,
  },
  si_w_b_t: {
    fontFamily: fonts.Poppins_600,
    fontSize: 20,
    color: 'white',
  },
  alert_title_style: {
    fontFamily: fonts.Poppins_400,
    fontSize: 21,
  },
  alert_message_style: {
    fontFamily: fonts.Poppins_400,
    fontSize: 16,
    marginBottom: -5,
  },
  alert_confirm_button_text_style: {
    fontFamily: fonts.Poppins_400,
    fontSize: 15,
    margin: -2.5,
  },
});
