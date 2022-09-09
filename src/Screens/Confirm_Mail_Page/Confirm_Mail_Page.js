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

const ConfirmMailPage = ({ navigation }) => {
  const isDarkMode = useSelector(state => state.isDarkMode);
  const [OTP, setOTP] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState({
    title: 'Sending Verification Code',
    message: 'Just a minute...',
    verMessage: 'Sending Verification Code.',
    showProgress: false,
  });

  const animateScale = useRef(new Animated.Value(1.1)).current;

  const send_ver_code = async () => {
    setAlertProps({
      title: 'Sending Verification Code',
      message: 'Just a minute...',
      verMessage: 'Sending Verification Code...',
      showProgress: true,
    });
    setShowAlert(false);
    try {
      await EncryptedStorage.getItem(es_user_session())
        .catch(err => {
          if (err) {
            setShowAlert(false);
            setAlertProps({
              title: 'Error',
              message: 'An error occured, please click Resend Code.',
              verMessage: 'Failed to send verification code, please click on Resend Code.',
              showProgress: false,
            });
            setTimeout(() => {
              setShowAlert(true);
            }, 80);
          }
        })
        .then(data => {
          const info = JSON.parse(data);
          if (info?.token) {
            try {
              Axios.patch(`${api_base_endpoint()}users/verifymail/send`, {
                headers: {
                  'x-access-token': info?.token,
                },
              })
                .catch(err => {
                  if (err) {
                    setShowAlert(false);
                    setAlertProps({
                      title: 'Error',
                      message: 'Unable to send verification code, please retry.',
                      verMessage: 'Failed to send verification code, please click on Resend Code.',
                      showProgress: false,
                    });
                    setTimeout(() => {
                      setShowAlert(true);
                    }, 80);
                  }
                })
                .then(res => {
                  if (res?.data?.status === 'success') {
                    setShowAlert(false);
                    setAlertProps({
                      title: 'Done',
                      message: 'Verification Code sent.',
                      verMessage: 'A verification code has been sent to your email address. Please, input the code in the OTP Session to verify your mail.',
                      showProgress: false,
                    });
                    setTimeout(() => {
                      setShowAlert(true);
                    }, 80);
                  } else if (res?.data?.code === 'ERR-BLGD-068') {
                    setShowAlert(false);
                    setAlertProps({
                      title: 'Warning',
                      message: 'Email is already verified!!!',
                      verMessage: 'Your email has already been verified.',
                      showProgress: false,
                    });
                    setTimeout(() => {
                      setShowAlert(true);
                    }, 80);
                  } else if (res?.data?.status === 'error') {
                    setShowAlert(false);
                    setAlertProps({
                      title: 'Error',
                      message: res?.data?.code,
                      verMessage: 'Failed to send verification code, please click on Resend Code.',
                      showProgress: false,
                    });
                    setTimeout(() => {
                      setShowAlert(true);
                    }, 80);
                  } else {
                    setShowAlert(false);
                    setAlertProps({
                      title: 'Error',
                      message: 'Unable to send verification code, please retry.',
                      verMessage: 'Failed to send verification code, please click on Resend Code.',
                      showProgress: false,
                    });
                    setTimeout(() => {
                      setShowAlert(true);
                    }, 80);
                  }
                });
            } catch (error) {
              setShowAlert(false);
              setAlertProps({
                title: 'Error',
                message: 'Unable to send verification code, please retry.',
                verMessage: 'Failed to send verification code, please click on Resend Code.',
                showProgress: false,
              });
              setTimeout(() => {
                setShowAlert(true);
              }, 80);
            }
          } else {
            setShowAlert(false);
            setAlertProps({
              title: 'Error',
              message: 'You are not logged in.',
              verMessage: 'Please, login into your account inorder for you to send the verification code.',
              showProgress: false,
            });
            setTimeout(() => {
              setShowAlert(true);
            }, 80);
          }
        });
    } catch (error) {
      setShowAlert(false);
      setAlertProps({
        title: 'Error',
        message: 'An error occured, please click Resend Code.',
        verMessage: 'Failed to send verification code, please click on Resend Code.',
        showProgress: false,
      });
      setTimeout(() => {
        setShowAlert(true);
      }, 80);
    }
  };

  const verify_mail = async () => {
    if (none_null(OTP) === false) {
      if (OTP?.length > 5) {
        setShowAlert(false);
        setAlertProps({
          title: 'Verifying Mail',
          message: 'Just a minute...',
          verMessage: 'Verifying Email Address...',
          showProgress: true,
        });
        try {
          await EncryptedStorage.getItem(es_user_session())
            .catch(err => {
              if (err) {
                setShowAlert(false);
                setAlertProps({
                  title: 'Error',
                  message: 'An error occured, please try again.',
                  verMessage: 'Please click on the verify Button to retry.',
                  showProgress: false,
                });
                setTimeout(() => {
                  setShowAlert(true);
                }, 80);
              }
            })
            .then(data => {
              const info = JSON.parse(data);
              if (info?.token) {
                try {
                  Axios.patch(`${api_base_endpoint()}users/verifymail/confirm`, {
                    otp: OTP,
                    headers: {
                      'x-access-token': info?.token,
                    },
                  })
                    .catch(err => {
                      if (err) {
                        setShowAlert(false);
                        setAlertProps({
                          title: 'Error',
                          message: 'An error occured, please try again.',
                          verMessage: 'Please click on the verify Button to retry.',
                          showProgress: false,
                        });
                        setTimeout(() => {
                          setShowAlert(true);
                        }, 80);
                      }
                    })
                    .then(async res => {
                      if (res?.data?.status === 'success') {
                        navigation.navigate('Home');
                      } else if (res?.data.status === 'error' && res?.data?.code === 'ERR-BLGD-070') {
                        setShowAlert(false);
                        setAlertProps({
                          title: 'Error',
                          message: 'Incorrect OTP.',
                          verMessage: 'The One Time Password you inputed is incorrect, please try again or click Resend Code.',
                          showProgress: false,
                        });
                        setTimeout(() => {
                          setShowAlert(true);
                        }, 80);
                      } else {
                        setShowAlert(false);
                        setAlertProps({
                          title: 'Error',
                          message: 'An error occured, please try again.',
                          verMessage: 'Please click on the verify Button to retry.',
                          showProgress: false,
                        });
                        setTimeout(() => {
                          setShowAlert(true);
                        }, 80);
                      }
                    });
                } catch (error) {
                  setShowAlert(false);
                  setAlertProps({
                    title: 'Error',
                    message: 'An error occured, please try again.',
                    verMessage: 'Please click on the verify Button to retry.',
                    showProgress: false,
                  });
                  setTimeout(() => {
                    setShowAlert(true);
                  }, 80);
                }
              } else {
                setShowAlert(false);
                setAlertProps({
                  title: 'Error',
                  message: 'You are not logged in.',
                  verMessage: 'Please, login into your account inorder for you to verify your mail.',
                  showProgress: false,
                });
                setTimeout(() => {
                  setShowAlert(true);
                }, 80);
              }
            });
        } catch (error) {
          setShowAlert(false);
          setAlertProps({
            title: 'Error',
            message: 'An error occured, please try again.',
            verMessage: 'Please click on the verify Button to retry.',
            showProgress: false,
          });
          setTimeout(() => {
            setShowAlert(true);
          }, 80);
        }
      } else {
        setShowAlert(false);
        setAlertProps({
          title: 'Warning',
          message: 'OTP field cannot be less than 6',
          verMessage: 'OTP field cannot be less than 6, please input the code you received.',
          showProgress: false,
        });
        setTimeout(() => {
          setShowAlert(true);
        }, 80);
      }
    } else {
      setShowAlert(false);
      setAlertProps({
        title: 'Warning',
        message: 'OTP field cannot be empty!!!',
        verMessage: 'OTP field cannot be empty, please input the code you received.',
        showProgress: false,
      });
      setTimeout(() => {
        setShowAlert(true);
      }, 80);
    }
  };

  useEffect(() => {
    send_ver_code();
  }, []);

  useEffect(() => {
    Animated
      .timing(animateScale, { toValue: 1, useNativeDriver: true, duration: 170 })
      .start();
  }, [animateScale]);

  return (
    <SafeAreaView style={[styles.confirm_mail_main, { backgroundColor: Colors(isDarkMode).BaseBG }]}>
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
        onConfirmPressed={() => setShowAlert(false)}
        onCancelPressed={() => setShowAlert(false)}
        onDismiss={() => setShowAlert(false)}
        contentContainerStyle={{ backgroundColor: Colors(isDarkMode).AlertBG }}
        titleStyle={[styles.alert_title_style, { color: Colors(isDarkMode).RedBG }]}
        messageStyle={[styles.alert_message_style, { color: Colors(isDarkMode).AlertText }]}
        confirmButtonTextStyle={styles.alert_confirm_button_text_style}
      />
      {navigation?.canGoBack() &&
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cm_gb}>
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
          style={styles.cm_b_l}
          source={require('../../Images/Blogged_Logo_White.png')}
        />
        :
        <Image
          style={styles.cm_b_l}
          source={require('../../Images/Blogged_Logo_Black.png')}
        />
      }
      <Animated.View style={[styles.cm_w, { backgroundColor: Colors(isDarkMode).HighLightBG, transform: [{ scale: animateScale }] }]}>
        <Text style={[styles.cm_w_bi, { color: Colors(isDarkMode).BaseText }]}>Confirm your Email Address</Text>
        <View style={[styles.cm_svc_w, { backgroundColor: Colors(isDarkMode).SearchBarBG }]}>
          <Text style={[styles.cm_svc_t, { color: Colors(isDarkMode).BaseText }]}>
            {alertProps?.verMessage}
          </Text>
          <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={send_ver_code}>
            <Text style={[styles.cm_svc_b_t, { color: Colors(isDarkMode).RedBG }]}>Resend Code</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.cm_w_t, { color: Colors(isDarkMode).BasePHText }]}>OTP</Text>
        <TextInput
          placeholder="Enter the code you received..."
          placeholderTextColor={Colors(isDarkMode).BasePHText}
          style={[styles.cm_w_ti, { color: Colors(isDarkMode)?.BaseText, backgroundColor: Colors(isDarkMode).SearchBarBG }]}
          value={OTP}
          onChangeText={text => setOTP(text?.trim())}
        />
        <TouchableOpacity
          activeOpacity={0.65}
          style={[styles.cm_w_b, { backgroundColor: Colors().Primary }]}
          onPress={verify_mail}
        >
          <Text style={styles.cm_w_b_t}>Verify</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

export default ConfirmMailPage;

const styles = StyleSheet.create({
  confirm_mail_main: {
    flex: 1,
    alignItems: 'center',
  },
  cm_gb: {
    position: 'absolute',
    left: 10,
    top: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  cm_b_l: {
    width: 320,
    height: 320,
    transform: [{ scale: 1.35 }],
    position: 'absolute',
    top: 60,
  },
  cm_w: {
    width: '90%',
    height: 350,
    marginTop: 'auto',
    marginBottom: 30,
    borderRadius: 20,
    padding: 20,
    zIndex: 2,
  },
  cm_w_bi: {
    fontFamily: fonts.Poppins_600,
    fontSize: 27,
  },
  cm_svc_w: {
    marginTop: 20,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  cm_svc_t: {
    fontFamily: fonts.Poppins_400,
    marginBottom: 5,
    minHeight: 50,
  },
  cm_svc_b_t: {
    fontFamily: fonts.Poppins_400,
    fontSize: 15,
  },
  cm_w_t: {
    fontFamily: fonts.Poppins_400,
    marginBottom: 2,
    fontSize: 15,
    marginLeft: 4,
    marginTop: 19,
  },
  cm_w_ti: {
    paddingHorizontal: 10,
    borderRadius: 8,
    height: 45,
    maxHeight: 45,
    fontFamily: fonts.Poppins_400,
    fontSize: 16,
    flex: 1,
  },
  cm_w_b: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 8,
    marginTop: 'auto',
    marginBottom: 5,
  },
  cm_w_b_t: {
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
