import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInPage from '../../Screens/Sign_In_Page/Sign_In_Page';
import SignUpPage from '../../Screens/Sign_Up_Page/Sign_Up_Page';


const Auth_Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Auth_Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Auth_Stack.Screen name="SignUp" component={SignUpPage} />
            <Auth_Stack.Screen name="SignIn" component={SignInPage} />
        </Auth_Stack.Navigator>
    );
};

export default AuthStack;
