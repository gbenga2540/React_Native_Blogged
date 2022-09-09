import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, TextInput, Animated, Image, View } from 'react-native';
import Colors from '../../Utils/Colors/Colors';
import { fonts } from '../../Fonts/Fonts';
import { useSelector } from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';
import Feather from 'react-native-vector-icons/Feather';

const SignUpPage2 = ({ navigation, route }) => {
  const isDarkMode = useSelector(state => state.isDarkMode);
  const [password, setPassword] = useState('');
  const [c_password, setCPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [alertMsg, setAlertMsg] = useState('Please, input a correct Information');
  const [showAlert, setShowAlert] = useState(false);
  const animateScale = useRef(new Animated.Value(1.1)).current;

  const email = route.params?.email;
  const username = route.params?.username;

  const nav_to_signup_3 = () => {
    if (password?.length >= 6) {
      if (password === c_password) {
        if (email && username) {
          navigation.navigate('SignUp3', { email: email, username: username, password: password });
        } else {
          setAlertMsg('Email and Username cannot be empty!!!');
          setShowAlert(true);
        }
      } else {
        setAlertMsg('Passwords do not match!!!');
        setShowAlert(true);
      }
    } else {
      setAlertMsg('Password cannot be less than six.');
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
    <SafeAreaView style={[styles.signup2_main, { backgroundColor: Colors(isDarkMode).BaseBG }]}>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Warning"
        message={alertMsg}
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
        <View style={styles.su_w_h}>
          <Text style={[styles.su_w_bi, { color: Colors(isDarkMode).BaseText }]}>Setup Password</Text>
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
        <Text style={[styles.su_w_t, { color: Colors(isDarkMode).BasePHText }]}>Password</Text>
        <TextInput
          placeholder="Enter a Password"
          placeholderTextColor={Colors(isDarkMode).BasePHText}
          style={[styles.su_w_ti, { color: Colors(isDarkMode)?.BaseText, backgroundColor: Colors(isDarkMode).SearchBarBG }]}
          value={password}
          onChangeText={text => setPassword(text?.trim())}
          secureTextEntry={hidePassword}
        />
        <Text style={[styles.su_w_t, { color: Colors(isDarkMode).BasePHText }]}>Confirm Password</Text>
        <TextInput
          placeholder="Confirm your Password"
          placeholderTextColor={Colors(isDarkMode).BasePHText}
          style={[styles.su_w_ti, { color: Colors(isDarkMode)?.BaseText, backgroundColor: Colors(isDarkMode).SearchBarBG }]}
          value={c_password}
          onChangeText={text => setCPassword(text?.trim())}
          secureTextEntry={hidePassword}
        />
        <TouchableOpacity
          activeOpacity={0.65}
          style={[styles.su_w_b, { backgroundColor: Colors().Primary }]}
          onPress={nav_to_signup_3}
        >
          <Text style={styles.su_w_b_t}>Next</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};


export default SignUpPage2;

const styles = StyleSheet.create({
  signup2_main: {
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
    height: 340,
    marginTop: 'auto',
    marginBottom: 30,
    borderRadius: 20,
    padding: 20,
    zIndex: 2,
  },
  su_w_h: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 23,
  },
  su_w_bi: {
    fontFamily: fonts.Poppins_600,
    fontSize: 27,
    marginRight: 'auto',
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
