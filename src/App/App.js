import React, { useEffect } from 'react';
import { useColorScheme, StatusBar, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { set_dark_mode } from '../Redux/Actions/Dark_Mode/Dark_Mode_Actions';
import { set_screen_dimensions } from '../Redux/Actions/Screen_Dimensions/Screen_Dimensions_Actions';
import { NavigationContainer } from '@react-navigation/native';
// import AuthStack from '../Routes/Auth/Auth_Stack';
import HomeStack from '../Routes/Home/Home_Stack';
import Colors from '../Utils/Colors/Colors';
import { api_base_endpoint } from '../Configs/API/API_Base_Endpoint';
import Axios from 'axios';
import { set_blog_tags } from '../Redux/Actions/Blog_Tags/Blog_Tags_Actions';

const App = () => {
  const dispatch = useDispatch();

  const isDarkMode = useColorScheme() === 'dark';
  const s_width = parseInt(Dimensions.get('window')?.width, 10);
  const s_height = parseInt(Dimensions.get('window')?.height, 10);

  useEffect(() => {
    dispatch(set_dark_mode(isDarkMode));
  }, [isDarkMode, dispatch]);

  useEffect(() => {
    dispatch(set_screen_dimensions({ s_width: s_width, s_height: s_height }));
  }, [s_width, s_height, dispatch]);

  useEffect(() => {
    Axios.get(`${api_base_endpoint()}tags/`)
      .then(res => {
        if (res !== null || res !== undefined) {
          if (res?.data?.status === 'success') {
            dispatch(set_blog_tags([...res?.data?.response]));
          }
        }
      });
  }, [dispatch]);

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={Colors(isDarkMode).BaseBG} />
      {/* <AuthStack /> */}
      <HomeStack />
    </NavigationContainer>
  );
};

export default App;
