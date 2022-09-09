import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, TextInput, Animated, Image } from 'react-native';
import Colors from '../../Utils/Colors/Colors';
import { fonts } from '../../Fonts/Fonts';
import { useSelector } from 'react-redux';
import { none_null } from '../../Utils/None_Null/None_Null';
import AwesomeAlert from 'react-native-awesome-alerts';
import Feather from 'react-native-vector-icons/Feather';

const SignUpPage1 = ({ navigation }) => {
  const isDarkMode = useSelector(state => state.isDarkMode);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const animateScale = useRef(new Animated.Value(1.1)).current;

  const username_checker = () => {
    return none_null(username) ? false : true;
  };

  const email_checker = () => {
    if (email?.length >= 5 && email?.includes('@') && email?.includes('.')) {
      return true;
    } else {
      return false;
    }
  };

  const nav_to_signup_2 = () => {
    if (email_checker() && username_checker()) {
      navigation.navigate('SignUp2', { username: username, email: email });
    } else {
      setShowAlert(true);
    }
  };

  const hideAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    Animated
      .timing(animateScale, { toValue: 1, useNativeDriver: true, duration: 170 })
      .start();
  }, [animateScale]);

  return (
    <SafeAreaView style={[styles.signup1_main, { backgroundColor: Colors(isDarkMode).BaseBG }]}>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Invalid Input"
        message="Please, input a correct Information"
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
        <Text style={[styles.su_w_bi, { color: Colors(isDarkMode).BaseText }]}>Basic Information</Text>
        <Text style={[styles.su_w_t, { color: Colors(isDarkMode).BasePHText }]}>Email</Text>
        <TextInput
          placeholder="Enter your Email Address"
          placeholderTextColor={Colors(isDarkMode).BasePHText}
          style={[styles.su_w_ti, { color: Colors(isDarkMode)?.BaseText, backgroundColor: Colors(isDarkMode).SearchBarBG }]}
          value={email}
          onChangeText={text => setEmail(text?.trim())}
        />
        <Text style={[styles.su_w_t, { color: Colors(isDarkMode).BasePHText }]}>Username</Text>
        <TextInput
          placeholder="Enter your Username"
          placeholderTextColor={Colors(isDarkMode).BasePHText}
          style={[styles.su_w_ti, { color: Colors(isDarkMode)?.BaseText, backgroundColor: Colors(isDarkMode).SearchBarBG }]}
          value={username}
          onChangeText={text => setUsername(text?.trim())}
        />
        <TouchableOpacity
          activeOpacity={0.65}
          style={[styles.su_w_b, { backgroundColor: Colors().Primary }]}
          onPress={nav_to_signup_2}
        >
          <Text style={styles.su_w_b_t}>Next</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};


export default SignUpPage1;

const styles = StyleSheet.create({
  signup1_main: {
    flex: 1,
    alignItems: 'center',
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
    height: 340,
    marginTop: 'auto',
    marginBottom: 30,
    borderRadius: 20,
    padding: 20,
    zIndex: 2,
  },
  su_w_bi: {
    fontFamily: fonts.Poppins_600,
    fontSize: 27,
    marginBottom: 23,
  },
  su_w_t: {
    fontFamily: fonts.Poppins_400,
    marginBottom: 2,
    fontSize: 15,
    marginLeft: 4,
  },
  su_w_ti: {
    height: 45,
    maxHeight: 45,
    borderRadius: 8,
    marginBottom: 20,
    fontFamily: fonts.Poppins_400,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  su_w_b: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 8,
    marginTop: 'auto',
    marginBottom: 5,
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
