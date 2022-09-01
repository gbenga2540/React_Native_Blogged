import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../../Screens/Home_Page/Home_Page';
import DetailsPage from '../../Screens/Details_Page/Details_Page';

const Home_Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Home_Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Home_Stack.Screen name="Home" component={HomePage} />
            <Home_Stack.Screen name="Details" component={DetailsPage} />
        </Home_Stack.Navigator>
    );
};

export default HomeStack;
