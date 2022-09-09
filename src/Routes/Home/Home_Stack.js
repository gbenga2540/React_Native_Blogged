import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../../Screens/Home_Page/Home_Page';
import DetailsPage from '../../Screens/Details_Page/Details_Page';

import SignUpPage1 from '../../Screens/Sign_Up_Page_1/Sign_Up_Page_1';
import SignUpPage2 from '../../Screens/Sign_Up_Page_2/Sign_Up_Page_2';
import SignUpPage3 from '../../Screens/Sign_Up_Page_3/Sign_Up_Page_3';
import SignInPage from '../../Screens/Sign_In_Page/Sign_In_Page';

import ConfirmMailPage from '../../Screens/Confirm_Mail_Page/Confirm_Mail_Page';
import ForgotPasswordPage from '../../Screens/Forgot_Password_Page/Forgot_Password_Page';
import ChangePasswordPage from '../../Screens/Change_Password_Page/Change_Password_Page';

const Home_Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Home_Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Home_Stack.Screen name="ChangePassword" component={ChangePasswordPage} />
            <Home_Stack.Screen name="SignIn" component={SignInPage} />
            <Home_Stack.Screen name="ConfirmMail" component={ConfirmMailPage} />
            <Home_Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} />
            <Home_Stack.Screen name="SignUp1" component={SignUpPage1} />
            <Home_Stack.Screen name="SignUp2" component={SignUpPage2} />
            <Home_Stack.Screen name="SignUp3" component={SignUpPage3} />
            <Home_Stack.Screen name="Home" component={HomePage} />
            <Home_Stack.Screen name="Details" component={DetailsPage} />
        </Home_Stack.Navigator>
    );
};

export default HomeStack;
