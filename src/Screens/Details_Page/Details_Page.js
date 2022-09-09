import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, ScrollView, Image, KeyboardAvoidingView, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../Utils/Colors/Colors';
import Axios from 'axios';
import { api_base_endpoint } from '../../Configs/API/API_Base_Endpoint';
import { fonts } from '../../Fonts/Fonts';
import { mongo_date_converter_2 } from '../../Utils/Mongo_Date_Converter/Mongo_Date_Converter';
import Share from 'react-native-share';
import AwesomeAlert from 'react-native-awesome-alerts';
import { user_token } from '../../Configs/Token/User_Token';
import { clear_current_blog, set_current_blog, update_current_blog_liked, update_current_blog_follow_author } from '../../Redux/Actions/Current_Blog/Current_Blog_Actions';
import { update_liked_on_one_blog, update_comment_l_on_one_blog } from '../../Redux/Actions/All_Blogs/All_Blogs_Actions';
import { high_nums_converter } from '../../Utils/High_Nums_Converter/High_Nums_Converter';
import { none_null } from '../../Utils/None_Null/None_Null';
import CommentCard from '../../Components/Comment_Card/Comment_Card';

const DetailsPage = ({ navigation, route }) => {
    const bid = route?.params?.bid;
    const dispatch = useDispatch();

    const isDarkMode = useSelector(state => state.isDarkMode);
    const CurrentBlog = useSelector(state => state.CurrentBlog);

    const [comment, setComment] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const refreshBlog = () => {
        try {
            Axios.get(`${api_base_endpoint()}blogs/${bid}`, {
                headers: {
                    'x-access-token': user_token(),
                },
            })
                .catch(err => {
                    if (err) {
                        console.log(err);
                    }
                })
                .then(res => {
                    if (res === null || res === undefined) {

                    } else {
                        if (res?.data?.status === 'success') {
                            dispatch(set_current_blog({ current_blog: { ...res?.data?.response } }));
                        } else {

                        }
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };

    const shareBlog = async () => {
        const shareOptions = {
            title: CurrentBlog?.title,
            url: `http://localhost:3000/${bid}`,
            message: '',
        };

        try {
            await Share.open(shareOptions);
        } catch (err) {
            console.log(err);
        }
    };

    const postComment = () => {
        if (comment) {
            try {
                Axios.patch(`${api_base_endpoint()}blogs/comment/create`, {
                    bid: bid,
                    comment: comment,
                    headers: {
                        'x-access-token': user_token(),
                    },
                })
                    .catch(err => {
                        if (err) {
                            console.log(err);
                        }
                    })
                    .then(res => {
                        if (res?.data?.status === 'success') {
                            console.log('comment posted');
                            setComment('');
                            dispatch(update_comment_l_on_one_blog({ blog_id: bid, added_comment: true }));
                            refreshBlog();
                        } else {

                        }
                    });
            } catch (error) {

            }
        } else {
            setShowAlert(true);
        }
    };

    const loadFollowers = () => {

    };

    const loadAuthorProfile = () => {

    };

    const hideAlert = () => {
        setShowAlert(false);
    };

    const likeBlog = () => {
        if (user_token) {
            if (CurrentBlog?.liked) {
                try {
                    Axios.patch(`${api_base_endpoint()}blogs/unlike`, {
                        bid: bid,
                        headers: {
                            'x-access-token': user_token(),
                        },
                    })
                        .catch(err => {
                            if (err) {
                                console.log(err);
                            }
                        })
                        .then(res => {
                            if (res?.data?.status === 'success') {
                                console.log('patched unlike');
                                dispatch(update_current_blog_liked({ liked_v: false }));
                                dispatch(update_liked_on_one_blog({ blog_id: bid, liked_v: false }));
                            } else {

                            }
                        });
                } catch (error) {

                }
            } else {
                try {
                    Axios.patch(`${api_base_endpoint()}blogs/like`, {
                        bid: bid,
                        headers: {
                            'x-access-token': user_token(),
                        },
                    })
                        .catch(err => {
                            if (err) {
                                console.log(err);
                            }
                        })
                        .then(res => {
                            if (res?.data?.status === 'success') {
                                console.log('patched like');
                                dispatch(update_current_blog_liked({ liked_v: true }));
                                dispatch(update_liked_on_one_blog({ blog_id: bid, liked_v: true }));
                            } else {

                            }
                        });
                } catch (error) {

                }
            }
        } else {
            console.log('you are not logged in');
        }
    };

    const followAuthor = () => {
        if (user_token) {
            if (CurrentBlog?.author !== 'Not Found' && none_null(CurrentBlog?.author) === false) {
                if (CurrentBlog?.a_followed) {
                    try {
                        Axios.patch(`${api_base_endpoint()}users/unfollow`, {
                            aid: CurrentBlog?.a_id,
                            headers: {
                                'x-access-token': user_token(),
                            },
                        })
                            .catch(err => {
                                if (err) {
                                    console.log(err);
                                }
                            })
                            .then(res => {
                                if (res?.data?.status === 'success') {
                                    console.log('patched unfollow');
                                    dispatch(update_current_blog_follow_author({ a_followed_v: false }));
                                } else {

                                }
                            });
                    } catch (error) {

                    }
                } else {
                    try {
                        Axios.patch(`${api_base_endpoint()}users/follow`, {
                            aid: CurrentBlog?.a_id,
                            headers: {
                                'x-access-token': user_token(),
                            },
                        })
                            .catch(err => {
                                if (err) {
                                    console.log(err);
                                }
                            })
                            .then(res => {
                                if (res?.data?.status === 'success') {
                                    console.log('patched follow');
                                    dispatch(update_current_blog_follow_author({ a_followed_v: true }));
                                } else {

                                }
                            });
                    } catch (error) {

                    }
                }
            } else {
                console.log('Author cannot be verified');
            }
        } else {
            console.log('you are not logged in');
        }
    };

    useEffect(() => {
        dispatch(clear_current_blog());
        try {
            Axios.get(`${api_base_endpoint()}blogs/${bid}`, {
                headers: {
                    'x-access-token': user_token(),
                },
            })
                .catch(err => {
                    if (err) {
                        console.log(err);
                    }
                })
                .then(res => {
                    if (res === null || res === undefined) {

                    } else {
                        if (res?.data?.status === 'success') {
                            dispatch(set_current_blog({ current_blog: { ...res?.data?.response } }));
                        } else {

                        }
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }, [bid, dispatch]);

    return (
        <SafeAreaView style={[styles.details_page_main, { backgroundColor: Colors(isDarkMode).BaseBG }]}>
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Warning"
                message="Comment field cannot be empty"
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
                titleStyle={styles.alert_title_style}
                messageStyle={[styles.alert_message_style, { color: Colors(isDarkMode).AlertText }]}
                confirmButtonTextStyle={styles.alert_confirm_button_text_style}
            />
            <View style={styles.dp_m_h}>
                <Feather
                    name="chevron-left"
                    size={38}
                    color={Colors().Primary}
                    onPress={() => navigation.goBack()}
                    style={styles.dp_m_h_a}
                />
                <Text style={[styles.dp_m_h_det, { color: Colors().Primary }]}>Details</Text>
                <Feather
                    name="refresh-ccw"
                    size={25}
                    color={Colors().Primary}
                    onPress={refreshBlog}
                    style={styles.dp_m_h_r}
                />
                <Feather
                    name="share-2"
                    size={27}
                    color={Colors().Primary}
                    onPress={shareBlog}
                    style={styles.dp_m_h_s}
                />
            </View>
            {CurrentBlog &&
                <ScrollView style={styles.dp_m_sv}>
                    <Text style={[styles.dp_m_sv_t, { color: Colors(isDarkMode).BaseText }]}>{CurrentBlog?.title}</Text>
                    <View style={styles.dp_m_sv_t_a}>
                        <Text style={[styles.dp_m_sv_t_a_t, { color: Colors(isDarkMode).BasePHText }]}>
                            {`${mongo_date_converter_2(CurrentBlog?.createdAt)} by `}
                        </Text>
                        <Text style={[styles.dp_m_sv_t_a_t, { color: Colors(isDarkMode).BaseText }]}>
                            {CurrentBlog?.author}
                        </Text>
                    </View>
                    {CurrentBlog?.author !== 'Not Found' && none_null(CurrentBlog?.author) === false &&
                        <View style={styles.dp_m_sv_ai}>
                            {CurrentBlog?.a_dp_link === 'none'
                                ?
                                <Text style={styles.dp_m_sv_ai_t}>
                                    {CurrentBlog?.author?.[0]?.toUpperCase()}
                                </Text>
                                :
                                <Image
                                    style={styles.dp_m_sv_ai_i}
                                    source={{
                                        uri: CurrentBlog?.a_dp_link,
                                        width: 50,
                                        height: 50,
                                    }}
                                />
                            }
                            <View style={styles.dp_m_sv_ai_uf}>
                                <TouchableOpacity onPress={loadAuthorProfile}>
                                    <Text style={[styles.dp_m_sv_ai_uf_u, { color: Colors(isDarkMode).BaseText }]}>
                                        {CurrentBlog?.author}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={loadFollowers}>
                                    <Text style={[styles.dp_m_sv_ai_uf_f, { color: Colors(isDarkMode).BasePHText }]}>
                                        {`${high_nums_converter(CurrentBlog?.a_followers)} follower${high_nums_converter(CurrentBlog?.a_followers) > 1 ? 's' : ''}`}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {user_token() && CurrentBlog?.isowner === false &&
                                <TouchableOpacity onPress={followAuthor}>
                                    <Text style={[styles.dp_m_sv_ai_ff, { borderColor: Colors(isDarkMode).BasePHText, color: Colors(isDarkMode).BasePHText }]}>
                                        {CurrentBlog?.a_followed ? 'Following' : 'Follow'}
                                    </Text>
                                </TouchableOpacity>
                            }
                        </View>
                    }
                    {CurrentBlog?.b_dp_link !== 'none' &&
                        <Image
                            style={[styles.dp_m_sv_i, { backgroundColor: Colors(isDarkMode).BaseBG }]}
                            source={{
                                uri: CurrentBlog?.b_dp_link,
                                width: '90%',
                                minHeight: 230,
                            }}
                        />
                    }
                    <Text style={[styles.dp_m_sv_mssg, { color: Colors(isDarkMode).BaseText }]}>
                        {CurrentBlog?.message}
                    </Text>
                    <View>
                        {CurrentBlog?.comments?.map((item, index) =>
                            <CommentCard
                                key={index}
                                comment={item}
                                is_blog_owner={CurrentBlog?.isowner}
                                blog_id={bid}
                            />
                        )}
                    </View>
                </ScrollView>
            }
            {CurrentBlog && none_null(user_token()) === false &&
                <KeyboardAvoidingView style={[styles.dp_m_cmnt, {
                    backgroundColor: Colors(isDarkMode).BaseBG,
                    shadowColor: Colors(isDarkMode).BaseText,
                }]}>
                    <TouchableWithoutFeedback onPress={likeBlog}>
                        <View style={styles.dp_m_cmnt_l_s}>
                            {CurrentBlog?.liked
                                ?
                                <MaterialIcons
                                    name="thumb-up"
                                    size={25}
                                    color={Colors().Primary}
                                />
                                :
                                <Feather
                                    name="thumbs-up"
                                    size={25}
                                    color={Colors().Primary}
                                />
                            }
                        </View>
                    </TouchableWithoutFeedback>
                    <TextInput
                        placeholder="Write a comment..."
                        placeholderTextColor={Colors(isDarkMode).BasePHText}
                        style={[styles.dp_m_cmnt_ti, { color: Colors(isDarkMode)?.BaseText }]}
                        value={comment}
                        onChangeText={text => setComment(text)}
                    // editable={none_null(user_token()) === true}
                    />
                    <TouchableOpacity onPress={postComment}>
                        <View style={styles.dp_m_cmnt_l_s}>
                            <Feather
                                name="send"
                                size={24}
                                color={Colors().Primary}
                            />
                        </View>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            }
        </SafeAreaView>
    );
};

export default DetailsPage;

const styles = StyleSheet.create({
    details_page_main: {
        flex: 1,
        flexDirection: 'column',
    },
    dp_m_h: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginTop: 27,
    },
    dp_m_h_a: {
        position: 'absolute',
        left: 8,
    },
    dp_m_h_r: {
        position: 'absolute',
        right: 60,
    },
    dp_m_h_s: {
        position: 'absolute',
        right: 20,
    },
    dp_m_h_det: {
        fontFamily: fonts.Poppins_600,
        fontSize: 22,
    },
    dp_m_sv: {
        marginTop: 20,
        marginBottom: none_null(user_token()) === false ? 55 : 5,
    },
    dp_m_sv_t: {
        fontFamily: fonts.Poppins_600,
        fontSize: 22,
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 20,
    },
    dp_m_sv_t_a: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 5,
    },
    dp_m_sv_t_a_t: {
        fontFamily: fonts.Poppins_600,
        fontSize: 17,
    },
    dp_m_sv_ai: {
        marginHorizontal: 20,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dp_m_sv_ai_t: {
        width: 50,
        minWidth: 50,
        height: 50,
        minHeight: 50,
        borderRadius: 50,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: fonts.Poppins_600,
        fontSize: 35,
        backgroundColor: Colors().Primary,
        color: 'white',
        marginRight: 7,
        paddingTop: 2,
    },
    dp_m_sv_ai_i: {
        width: 50,
        minWidth: 50,
        height: 50,
        minHeight: 50,
        borderRadius: 50,
        marginRight: 7,
    },
    dp_m_sv_ai_uf: {
        flex: 1,
        marginRight: 10,
    },
    dp_m_sv_ai_uf_u: {
        fontFamily: fonts.Poppins_600,
        fontSize: 16,
        marginBottom: 2,
    },
    dp_m_sv_ai_uf_f: {
        fontFamily: fonts.Poppins_400,
        fontSize: 15,
    },
    dp_m_sv_ai_ff: {
        width: 90,
        height: 35,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: fonts.Poppins_400,
        borderRadius: 4,
        borderWidth: 1,
        fontSize: 14,
    },
    dp_m_sv_i: {
        resizeMode: 'contain',
        maxWidth: '90%',
        minHeight: 230,
        alignSelf: 'center',
        borderRadius: 7,
        marginTop: 10,
        marginBottom: 5,
    },
    dp_m_sv_mssg: {
        marginHorizontal: 20,
        fontFamily: fonts.Poppins_400,
        fontSize: 16,
    },
    dp_m_cmnt: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        minWidth: '100%',
        maxWidth: '100%',
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        zIndex: 3,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.9,
        shadowRadius: 3,
        elevation: 10,
    },
    dp_m_cmnt_l_s: {
        width: 55,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dp_m_cmnt_ti: {
        fontFamily: fonts.Poppins_400,
        height: '100%',
        flex: 1,
        fontSize: 16,
        letterSpacing: 0.15,
    },
    alert_title_style: {
        color: '#e6760d',
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
