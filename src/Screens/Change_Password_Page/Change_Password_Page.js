import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, TextInput, Animated, Image, View } from 'react-native';
import Colors from '../../Utils/Colors/Colors';
import { fonts } from '../../Fonts/Fonts';
import { useSelector } from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';
import Feather from 'react-native-vector-icons/Feather';
import Axios from 'axios';
import { none_null } from '../../Utils/None_Null/None_Null';
import { api_base_endpoint } from '../../Configs/API/API_Base_Endpoint';
import OverlaySpinner from '../../Components/Overlay_Spinner/Overlay_Spinner';

const ChangePasswordPage = ({ navigation }) => {
  const isDarkMode = useSelector(state => state.isDarkMode);
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [disableRetrieve, setDisableRetrieve] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState({
    title: 'Setting New Password',
    message: 'Just a minute...',
    showProgress: false,
  });

  const animateScale = useRef(new Animated.Value(1.1)).current;

  const change_password = async () => {
    if (none_null(email) === false) {
      setShowSpinner(true);
      setDisableRetrieve(true);
      try {
        Axios.patch(`${api_base_endpoint()}users/resetpassword`, {
          password: oldPassword,
          newpassword: newPassword,
          headers: {
            'x-access-token': '',
          },
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
    <SafeAreaView style={[styles.changepassword_main, { backgroundColor: Colors(isDarkMode).BaseBG }]}>
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cp_gb}>
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
          style={styles.cp_b_l}
          source={require('../../Images/Blogged_Logo_White.png')}
        />
        :
        <Image
          style={styles.cp_b_l}
          source={require('../../Images/Blogged_Logo_Black.png')}
        />
      }
      <Animated.View style={[styles.cp_w, { backgroundColor: Colors(isDarkMode).HighLightBG, transform: [{ scale: animateScale }] }]}>
        <View style={styles.cp_w_h}>
          <Text style={[styles.cp_w_bi, { color: Colors(isDarkMode).BaseText }]}>Change your Password</Text>
          {hidePassword
            ?
            <TouchableOpacity activeOpacity={0.65} onPress={() => setHidePassword(!hidePassword)} style={{ marginRight: 7 }}>
              <Feather
                name="eye"
                size={25}
                color={Colors(isDarkMode).BaseText}
              />
            </TouchableOpacity>
            :
            <TouchableOpacity activeOpacity={0.65} onPress={() => setHidePassword(!hidePassword)} style={{ marginRight: 7 }}>
              <Feather
                name="eye-off"
                size={25}
                color={Colors(isDarkMode).BaseText}
              />
            </TouchableOpacity>
          }
        </View>
        <Text style={[styles.cp_w_t, { color: Colors(isDarkMode).BasePHText }]}>Old Password</Text>
        <TextInput
          placeholder="Enter your old password"
          placeholderTextColor={Colors(isDarkMode).BasePHText}
          style={[styles.cp_w_ti, { color: Colors(isDarkMode)?.BaseText, backgroundColor: Colors(isDarkMode).SearchBarBG }]}
          value={oldPassword}
          onChangeText={text => setOldPassword(text?.trim())}
          secureTextEntry={hidePassword}
        />
        <Text style={[styles.cp_w_t, { color: Colors(isDarkMode).BasePHText }]}>New Password</Text>
        <TextInput
          placeholder="Enter a new password"
          placeholderTextColor={Colors(isDarkMode).BasePHText}
          style={[styles.cp_w_ti, { color: Colors(isDarkMode)?.BaseText, backgroundColor: Colors(isDarkMode).SearchBarBG }]}
          value={newPassword}
          onChangeText={text => setNewPassword(text?.trim())}
          secureTextEntry={hidePassword}
        />
        <TouchableOpacity
          activeOpacity={0.65}
          style={[styles.cp_w_b, { backgroundColor: Colors().Primary }]}
          onPress={change_password}
          disabled={disableRetrieve}
        >
          <Text style={styles.cp_w_b_t}>Change Password</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};


export default ChangePasswordPage;

const styles = StyleSheet.create({
  changepassword_main: {
    flex: 1,
    alignItems: 'center',
  },
  cp_gb: {
    position: 'absolute',
    left: 10,
    top: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  cp_b_l: {
    width: 320,
    height: 320,
    transform: [{ scale: 1.35 }],
    position: 'absolute',
    top: 60,
  },
  cp_w: {
    width: '90%',
    height: 350,
    marginTop: 'auto',
    marginBottom: 30,
    borderRadius: 20,
    padding: 20,
    zIndex: 2,
  },
  cp_w_h: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  cp_w_bi: {
    fontFamily: fonts.Poppins_600,
    fontSize: 27,
    marginRight: 'auto',
  },
  cp_w_t: {
    fontFamily: fonts.Poppins_400,
    marginBottom: 2,
    fontSize: 15,
    marginLeft: 4,
    marginTop: 19,
  },
  cp_w_ti: {
    paddingHorizontal: 10,
    borderRadius: 8,
    height: 45,
    maxHeight: 45,
    fontFamily: fonts.Poppins_400,
    fontSize: 16,
    flex: 1,
  },
  cp_w_b: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 8,
    marginTop: 'auto',
    marginBottom: 5,
  },
  cp_w_b_t: {
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
