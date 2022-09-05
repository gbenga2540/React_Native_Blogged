import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, Image, FlatList } from 'react-native';
import Colors from '../../Utils/Colors/Colors';
import { fonts } from '../../Fonts/Fonts';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import { api_base_endpoint } from '../../Configs/API/API_Base_Endpoint';
import { user_token } from '../../Configs/Token/User_Token';
import { current_date } from '../../Utils/Current_Date/Current_Date';
import SearchBar from '../../Components/Search_Bar/Search_Bar';
import Spinner from 'react-native-spinkit';
import Feather from 'react-native-vector-icons/Feather';
import { spinkit_types } from '../../Data/Spinkit_Types/SpinKit_Types';
import BlogCard from '../../Components/Blog_Card/Blog_Card';
import { clear_all_blogs, set_all_blogs } from '../../Redux/Actions/All_Blogs/All_Blogs_Actions';

const HomePage = ({ navigation }) => {
    const dispatch = useDispatch();

    const isDarkMode = useSelector(state => state.isDarkMode);
    const AllBlogs = useSelector(state => state.AllBlogs);

    const [isError, setIsError] = useState(false);
    const [ErrorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [paginationIndex, setPaginationIndex] = useState(0);
    // const [tags, setTags] = useState([0, 2]);

    useEffect(() => {
        setPaginationIndex(0);


        setIsLoading(true);
        setIsError(false);
        setErrorMsg('');

        try {
            Axios.get(`${api_base_endpoint()}blogs/?pagination_index=${paginationIndex}&search=${search}&tags=[]`, {
                headers: {
                    'x-access-token': user_token(),
                },
            })
                .catch(err => {
                    setIsError(true);
                    setIsLoading(false);
                    if (err) {
                        setErrorMsg('Network Error');
                    }
                })
                .then(res => {
                    if (res === null || res === undefined) {
                        setIsError(true);
                        setIsLoading(false);
                        setErrorMsg('Network Error');
                    } else {
                        if (res?.data?.status === 'success') {
                            if (res?.data?.response?.length > 0) {
                                setIsError(false);
                                setErrorMsg('');
                                setIsLoading(false);
                                dispatch(set_all_blogs([...res?.data?.response]));
                            } else {
                                setIsError(false);
                                setErrorMsg('');
                                setIsLoading(true);
                                dispatch(clear_all_blogs());
                            }
                        } else {
                            setIsError(true);
                            setIsLoading(false);
                            setErrorMsg(res?.data?.code);
                        }
                    }
                });
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
            setErrorMsg('Network Error');
        }
    }, [dispatch, search, paginationIndex]);

    return (
        <SafeAreaView style={[styles.homepage_main, { backgroundColor: Colors(isDarkMode).BaseBG }]}>
            <View style={styles.hp_date_profile}>
                <View style={styles.hp_d_p_t_w}>
                    <Text style={[styles.hp_d_p_t1, { color: Colors().Primary }]}>Welcome Back!</Text>
                    <Text style={[styles.hp_d_p_t2, { color: Colors(isDarkMode).BasePHText }]}>{current_date()?.merged_date}</Text>
                </View>
                <Image
                    style={styles.hp_d_p_image}
                    source={require('../../Images/test_agma.jpg')}
                />
            </View>
            <View style={styles.hp_searchbar}>
                <SearchBar search={search} setSearch={setSearch} />
            </View>
            {isLoading && !isError &&
                <View style={styles.hp_spinner}>
                    <Spinner isVisible={true} size={80} type={spinkit_types[6]} color={Colors().Primary} />
                </View>
            }
            {isError &&
                <View style={styles.hp_spinner}>
                    <Feather name="alert-triangle" size={50} color="red" />
                    <Text style={styles.text_error}>{ErrorMsg}</Text>
                </View>
            }
            {!isLoading && !isError && AllBlogs?.length > 0 &&
                <View style={styles.hp_blog_post_w}>
                    <FlatList
                        keyExtractor={item => item?.bid}
                        data={AllBlogs}
                        renderItem={itemData => <BlogCard b_post={itemData?.item} navigation={navigation} />}
                    />
                </View>
            }
        </SafeAreaView>
    );
};


export default HomePage;

const styles = StyleSheet.create({
    homepage_main: {
        flex: 1,
    },
    hp_date_profile: {
        flexDirection: 'row',
        maxWidth: '89%',
        width: '89%',
        alignSelf: 'center',
        marginVertical: 20,
    },
    hp_d_p_t_w: {
        flexDirection: 'column',
    },
    hp_d_p_t1: {
        fontFamily: fonts.Poppins_600,
        fontSize: 23,
    },
    hp_d_p_t2: {
        fontFamily: fonts.Poppins_400,
        fontSize: 17,
    },
    hp_d_p_image: {
        marginLeft: 'auto',
        width: 52,
        height: 52,
        borderRadius: 52,
    },
    hp_searchbar: {
        alignItems: 'center',
    },
    hp_spinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_error: {
        color: 'red',
        fontFamily: fonts.Poppins_400,
        fontSize: 17,
        marginTop: 5,
    },
    hp_blog_post_w: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 30,
    },
});
