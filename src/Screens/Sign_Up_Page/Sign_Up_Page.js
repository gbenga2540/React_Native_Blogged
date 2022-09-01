import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../Utils/Colors/Colors';
import { fonts } from '../../Fonts/Fonts';
import { useSelector } from 'react-redux';

const SignUpPage = ({ navigation }) => {
  const isDarkMode = useSelector(state => state.isDarkMode);

  return (
    <SafeAreaView style={[styles.signup_main, { backgroundColor: Colors(isDarkMode).BaseBG }]}>
      <Text style={[styles.text, { color: Colors(isDarkMode).BaseText }]}>SignUp</Text>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={[styles.text, { color: Colors(isDarkMode).BaseText }]}>{'Move to SignIn  ->'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};


export default SignUpPage;

const styles = StyleSheet.create({
  signup_main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: 15,
    marginBottom: 20,
  },
});
