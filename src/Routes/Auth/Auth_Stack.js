import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpPage1 from '../../Screens/Sign_Up_Page_1/Sign_Up_Page_1';
import SignUpPage2 from '../../Screens/Sign_Up_Page_2/Sign_Up_Page_2';
import SignUpPage3 from '../../Screens/Sign_Up_Page_3/Sign_Up_Page_3';
import SignInPage from '../../Screens/Sign_In_Page/Sign_In_Page';

const Auth_Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Auth_Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Auth_Stack.Screen name="SignUp1" component={SignUpPage1} />
            <Auth_Stack.Screen name="SignUp2" component={SignUpPage2} />
            <Auth_Stack.Screen name="SignUp3" component={SignUpPage3} />
            <Auth_Stack.Screen name="SignIn" component={SignInPage} />
        </Auth_Stack.Navigator>
    );
};

export default AuthStack;
