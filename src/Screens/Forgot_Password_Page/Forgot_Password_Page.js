import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, TextInput, Animated, Image } from 'react-native';
import Colors from '../../Utils/Colors/Colors';
import { fonts } from '../../Fonts/Fonts';
import { useSelector } from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';
import Feather from 'react-native-vector-icons/Feather';
import Axios from 'axios';
import { none_null } from '../../Utils/None_Null/None_Null';
import { api_base_endpoint } from '../../Configs/API/API_Base_Endpoint';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';

const ForgotPasswordPage = ({ navigation }) => {
  const isDarkMode = useSelector(state => state.isDarkMode);
  const [email, setEmail] = useState('');
  const [disableRetrieve, setDisableRetrieve] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState({
    title: 'Sending New Password',
    message: 'Just a minute...',
    showProgress: false,
  });

  const animateScale = useRef(new Animated.Value(1.1)).current;

  const email_checker = () => {
    if (email?.length >= 5 && email?.includes('@') && email?.includes('.')) {
      return true;
    } else {
      return false;
    }
  };

  const send_new_password = async () => {
    if (none_null(email) === false) {
      if (email_checker()) {
        setShowSpinner(true);
        setDisableRetrieve(true);
        try {
          Axios.patch(`${api_base_endpoint()}users/forgotpassword`, {
            email: email,
          })
            .catch(err => {
              if (err) {
                setShowSpinner(false);
                setDisableRetrieve(false);
                setShowAlert(false);
                setAlertProps({
                  title: 'Error',
                  message: 'An error occured while trying to send new password, please try again.',
                  showProgress: false,
                });
                setTimeout(() => {
                  setShowAlert(true);
                }, 80);
              }
            })
            .then(async res => {
              if (res?.data?.status === 'success') {
                setShowSpinner(false);
                setDisableRetrieve(false);
                setShowAlert(false);
                setEmail('');
                setAlertProps({
                  title: 'Success',
                  message: 'Your new password has been sent. Please check your mail and login into your account.',
                  showProgress: false,
                });
                setTimeout(() => {
                  setShowAlert(true);
                }, 80);
              } else if (res?.data.status === 'error' && res?.data?.code === 'ERR-BLGD-072') {
                setShowSpinner(false);
                setDisableRetrieve(false);
                setShowAlert(false);
                setAlertProps({
                  title: 'Error',
                  message: 'Error sending new password to your Email Address.',
                  showProgress: false,
                });
                setTimeout(() => {
                  setShowAlert(true);
                }, 80);
              } else if (res?.data.status === 'error' && res?.data?.code === 'ERR-BLGD-073') {
                setShowSpinner(false);
                setDisableRetrieve(false);
                setShowAlert(false);
                setAlertProps({
                  title: 'Error',
                  message: 'Error updating new password on the server.',
                  showProgress: false,
                });
                setTimeout(() => {
                  setShowAlert(true);
                }, 80);
              } else {
                setShowSpinner(false);
                setDisableRetrieve(false);
                setShowAlert(false);
                setAlertProps({
                  title: 'Error',
                  message: 'An error occured while trying to send new password, please try again.',
                  showProgress: false,
                });
                setTimeout(() => {
                  setShowAlert(true);
                }, 80);
              }
            });
        } catch (error) {
          setShowSpinner(false);
          setDisableRetrieve(false);
          setShowAlert(false);
          setAlertProps({
            title: 'Error',
            message: 'An error occured while trying to send new password, please try again.',
            showProgress: false,
          });
          setTimeout(() => {
            setShowAlert(true);
          }, 80);
        }
      } else {
        setShowSpinner(false);
        setDisableRetrieve(false);
        setShowAlert(false);
        setAlertProps({
          title: 'Warning',
          message: 'Please, input your correct credentials.',
          showProgress: false,
        });
        setTimeout(() => {
          setShowAlert(true);
        }, 80);
      }
    } else {
      setShowSpinner(false);
      setDisableRetrieve(false);
      setShowAlert(false);
      setAlertProps({
        title: 'Warning',
        message: 'Email field cannot be empty.',
        showProgress: false,
      });
      setTimeout(() => {
        setShowAlert(true);
      }, 80);
    }
  };

  const hideAlert = () => {
    setShowSpinner(false);
    setShowAlert(false);
  };

  useEffect(() => {
    Animated
      .timing(animateScale, { toValue: 1, useNativeDriver: true, duration: 170 })
      .start();
  }, [animateScale]);

  return (
    <SafeAreaView style={[styles.forgotpassword_main, { backgroundColor: Colors(isDarkMode).BaseBG }]}>
      <OverlaySpinner showSpinner={showSpinner} />
      <AwesomeAlert
        show={showAlert}
        title={alertProps?.title}
        message={alertProps?.message}
        showProgress={alertProps?.showProgress}
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.fp_gb}>
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
          style={styles.fp_b_l}
          source={require('../../Images/Blogged_Logo_White.png')}
        />
        :
        <Image
          style={styles.fp_b_l}
          source={require('../../Images/Blogged_Logo_Black.png')}
        />
      }
      <Animated.View style={[styles.fp_w, { backgroundColor: Colors(isDarkMode).HighLightBG, transform: [{ scale: animateScale }] }]}>
        <Text style={[styles.fp_w_bi, { color: Colors(isDarkMode).BaseText }]}>Retrieve your Password</Text>
        <Text style={[styles.fp_info, { color: Colors(isDarkMode).BaseText }]}>
          Forgot your password? No worries, just input your email address in the section below and a new password would be sent to your email address.
        </Text>
        <Text style={[styles.fp_w_t, { color: Colors(isDarkMode).BasePHText }]}>Email</Text>
        <TextInput
          placeholder="Enter your email address"
          placeholderTextColor={Colors(isDarkMode).BasePHText}
          style={[styles.fp_w_ti, { color: Colors(isDarkMode)?.BaseText, backgroundColor: Colors(isDarkMode).SearchBarBG }]}
          value={email}
          onChangeText={text => setEmail(text?.trim())}
        />
        <TouchableOpacity
          activeOpacity={0.65}
          style={[styles.fp_w_b, { backgroundColor: Colors().Primary }]}
          onPress={send_new_password}
          disabled={disableRetrieve}
        >
          <Text style={styles.fp_w_b_t}>Retrieve Password</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};


export default ForgotPasswordPage;

const styles = StyleSheet.create({
  forgotpassword_main: {
    flex: 1,
    alignItems: 'center',
  },
  fp_gb: {
    position: 'absolute',
    left: 10,
    top: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  fp_b_l: {
    width: 320,
    height: 320,
    transform: [{ scale: 1.35 }],
    position: 'absolute',
    top: 60,
  },
  fp_w: {
    width: '90%',
    height: 350,
    marginTop: 'auto',
    marginBottom: 30,
    borderRadius: 20,
    padding: 20,
    zIndex: 2,
  },
  fp_w_bi: {
    fontFamily: fonts.Poppins_600,
    fontSize: 27,
  },
  fp_info: {
    fontFamily: fonts.Poppins_400,
    marginTop: 40,
    marginBottom: 5,
    minHeight: 50,
    fontSize: 15,
  },
  fp_w_t: {
    fontFamily: fonts.Poppins_400,
    marginBottom: 2,
    fontSize: 15,
    marginLeft: 4,
    marginTop: 19,
  },
  fp_w_ti: {
    paddingHorizontal: 10,
    borderRadius: 8,
    height: 45,
    maxHeight: 45,
    fontFamily: fonts.Poppins_400,
    fontSize: 16,
    flex: 1,
  },
  fp_w_b: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 8,
    marginTop: 'auto',
    marginBottom: 5,
  },
  fp_w_b_t: {
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
