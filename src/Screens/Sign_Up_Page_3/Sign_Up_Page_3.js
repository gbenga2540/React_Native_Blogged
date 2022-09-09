import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, View, Animated, Image } from 'react-native';
import Colors from '../../Utils/Colors/Colors';
import { fonts } from '../../Fonts/Fonts';
import { useSelector } from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import Axios from 'axios';
import { api_base_endpoint } from '../../Configs/API/API_Base_Endpoint';
import { es_user_session } from '../../Configs/Secure/Secure_Storage';
import EncryptedStorage from 'react-native-encrypted-storage';

const SignUpPage3 = ({ navigation, route }) => {
  const isDarkMode = useSelector(state => state.isDarkMode);
  const animateScale = useRef(new Animated.Value(1.1)).current;

  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('Warning');
  const [alertMsg, setAlertMsg] = useState('Please, input a correct Information');
  const [alertFuncIndex, setAlertFuncIndex] = useState(0);

  const email = route.params?.email;
  const username = route.params?.username;
  const password = route.params?.password;
  const [displayPicture, setDisplayPicture] = useState('none');

  const send_ver_mail = ({ token }) => {
    try {
      Axios.patch(`${api_base_endpoint()}users/verifymail/send`, {
        token: token,
      })
        .catch(err => {
          if (err) {
            setAlertTitle('Error');
            setAlertMsg('Error sending verification mail.');
            setAlertFuncIndex(1);
            setShowAlert(true);
          }
        })
        .then(result => {
          if (result?.data?.status === 'success') {
            navigation.navigate('ConfirmMail');
          } else {
            setAlertTitle('Error');
            setAlertMsg('Error sending verification mail.');
            setAlertFuncIndex(1);
            setShowAlert(true);
          }
        });
    } catch (error) {
      setAlertTitle('Error');
      setAlertMsg('Error sending verification mail.');
      setAlertFuncIndex(1);
      setShowAlert(true);
    }
  };

  const sign_up = () => {
    try {
      Axios.post(`${api_base_endpoint()}users/auth/signup`, {
        email: email,
        username: username,
        password: password,
        dp: displayPicture,
      })
        .catch(err => {
          if (err) {
            setAlertTitle('Error');
            setAlertMsg('SignUp Error');
            setAlertFuncIndex(0);
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
                    setAlertTitle('Error');
                    setAlertMsg("Failed to Store User's info, please Login into your account to retry.");
                    setAlertFuncIndex(2);
                    setShowAlert(true);
                  }
                })
                .then(result => {
                  if (result) {
                    send_ver_mail({ token: res?.data?.response?.token });
                  } else {
                    setAlertTitle('Error');
                    setAlertMsg("Failed to Store User's info, please Login into your account to retry.");
                    setAlertFuncIndex(2);
                    setShowAlert(true);
                  }
                });
            } catch (error) {
              setAlertTitle('Error');
              setAlertMsg("Failed to Store User's info, please Login into your account to retry.");
              setAlertFuncIndex(2);
              setShowAlert(true);
            }
          } else if (res?.data.status === 'error') {
            if (res?.data?.code === 'ERR-BLGD-003') {
              setAlertTitle('Warning');
              setAlertMsg('Email is already in use!!!');
              setAlertFuncIndex(0);
              setShowAlert(true);
            } else if (res?.data?.code === 'ERR-BLGD-005') {
              setAlertTitle('Warning');
              setAlertMsg('Username is already in use!!!');
              setAlertFuncIndex(0);
              setShowAlert(true);
            } else {
              setAlertTitle('Error');
              setAlertMsg(res?.data?.code);
              setAlertFuncIndex(0);
              setShowAlert(true);
            }
          } else {
            setAlertTitle('Error');
            setAlertMsg('SignUp Error');
            setAlertFuncIndex(0);
            setShowAlert(true);
          }
        });
    } catch (error) {
      setAlertTitle('Error');
      setAlertMsg('SignUp Error');
      setAlertFuncIndex(0);
      setShowAlert(true);
    }
  };

  const hideAlert = () => {
    if (alertFuncIndex === 0) {
      setShowAlert(false);
    } else if (alertFuncIndex === 1) {
      navigation.navigate('Home');
    } else if (alertFuncIndex === 2) {
      navigation.navigate('SignIn');
    } else {
      setShowAlert(false);
    }
  };

  const clear_image = () => {
    setDisplayPicture('none');
    ImagePicker.clean();
  };

  const select_image_from_gallery = () => {
    try {
      ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
        multiple: false,
        includeBase64: true,
        enableRotationGesture: true,
      })
        .catch(err => {
          if (err) {
            clear_image();
          }
        })
        .then(image => {
          if (image) {
            const processed_image = `data:${image?.mime};base64,${image?.data}`;
            setDisplayPicture(processed_image);
          } else {
            clear_image();
          }
        });
    } catch (error) {
      clear_image();
    }
  };

  const select_image_from_camera = () => {
    try {
      ImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: true,
        multiple: false,
        includeBase64: true,
        enableRotationGesture: true,
      })
        .catch(err => {
          if (err) {
            clear_image();
          }
        })
        .then(image => {
          if (image) {
            const processed_image = `data:${image?.mime};base64,${image?.data}`;
            setDisplayPicture(processed_image);
          } else {
            clear_image();
          }
        });
    } catch (error) {
      clear_image();
    }
  };

  useEffect(() => {
    Animated
      .timing(animateScale, { toValue: 1, useNativeDriver: true, duration: 170 })
      .start();
  }, [animateScale]);

  useEffect(() => {
    clear_image();
  }, []);

  return (
    <SafeAreaView style={[styles.signup3_main, { backgroundColor: Colors(isDarkMode).BaseBG }]}>
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.su_gb}>
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
          style={styles.su_b_l}
          source={require('../../Images/Blogged_Logo_White.png')}
        />
        :
        <Image
          style={styles.su_b_l}
          source={require('../../Images/Blogged_Logo_Black.png')}
        />
      }
      <Animated.View style={[styles.su_w, { backgroundColor: Colors(isDarkMode).HighLightBG, transform: [{ scale: animateScale }] }]}>
        <Text style={[styles.su_w_bi, { color: Colors(isDarkMode).BaseText }]}>Select Profile Picture</Text>
        <View style={styles.su_w_i_c}>
          {displayPicture === 'none'
            ?
            isDarkMode
              ?
              <Image
                style={styles.su_w_i}
                source={require('../../Images/default_user_dp_dark.jpg')}
              />
              :
              <Image
                style={styles.su_w_i}
                source={require('../../Images/default_user_dp_light.jpg')}
              />
            :
            <Image
              style={styles.su_w_i}
              source={{
                uri: displayPicture,
                width: 120,
                height: 120,
              }}
            />
          }
        </View>
        <View style={styles.su_sp_w}>
          <TouchableOpacity onPress={select_image_from_camera} style={[styles.su_sp_i, { backgroundColor: Colors(isDarkMode).BaseBG }]}>
            <Feather
              name="camera"
              size={28}
              color={Colors(isDarkMode).BaseText}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={select_image_from_gallery} style={[styles.su_sp_i, { backgroundColor: Colors(isDarkMode).BaseBG }]}>
            <Feather
              name="image"
              size={28}
              color={Colors(isDarkMode).BaseText}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={clear_image} style={[styles.su_sp_i, { backgroundColor: Colors(isDarkMode).BaseBG }]}>
            <Feather
              name="x"
              size={28}
              color={Colors(isDarkMode).BaseText}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.65}
          style={[styles.su_w_b, { backgroundColor: Colors().Primary }]}
          onPress={sign_up}
        >
          <Text style={styles.su_w_b_t}>Sign Up</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};


export default SignUpPage3;

const styles = StyleSheet.create({
  signup3_main: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  su_gb: {
    position: 'absolute',
    left: 10,
    top: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  su_b_l: {
    width: 320,
    height: 320,
    transform: [{ scale: 1.35 }],
    position: 'absolute',
    top: 60,
  },
  su_w: {
    width: '90%',
    height: 370,
    marginTop: 'auto',
    marginBottom: 30,
    borderRadius: 20,
    padding: 20,
    zIndex: 2,
  },
  su_w_bi: {
    fontFamily: fonts.Poppins_600,
    fontSize: 27,
    marginBottom: 20,
  },
  su_w_i_c: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 130,
    padding: 2,
    marginBottom: 20,
    borderColor: Colors().Primary,
    borderWidth: 2,
  },
  su_w_i: {
    borderRadius: 120,
    width: 120,
    height: 120,
  },
  su_sp_w: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  su_sp_i: {
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  su_w_b: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 8,
    marginTop: 'auto',
    marginBottom: 2,
  },
  su_w_b_t: {
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
