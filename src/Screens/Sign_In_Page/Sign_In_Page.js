import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../Utils/Colors/Colors';
import { fonts } from '../../Fonts/Fonts';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';

const SignInPage = ({ navigation }) => {
  const isDarkMode = useSelector(state => state.isDarkMode);

  return (
    <SafeAreaView style={[styles.signin_main, { backgroundColor: Colors(isDarkMode).BaseBG }]}>
      <Icon name="heart" color={'orange'} size={32} />
      <Text style={[styles.text, { color: Colors(isDarkMode).BaseText }]}>SignIn</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={[styles.text, { color: Colors(isDarkMode).BaseText }]}>{'<-  Back to SignUp'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};


export default SignInPage;

const styles = StyleSheet.create({
  signin_main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts.Poppins_400,
    fontSize: 15,
    marginBottom: 20,
  },
});
