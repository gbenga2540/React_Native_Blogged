import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Animated } from 'react-native';
import { getCustomTimeAgo } from '../../Utils/Time_Converter/Time_Converter';
import Colors from '../../Utils/Colors/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { fonts } from '../../Fonts/Fonts';
import Feather from 'react-native-vector-icons/Feather';
import Axios from 'axios';
import { api_base_endpoint } from '../../Configs/API/API_Base_Endpoint';
import { user_token } from '../../Configs/Token/User_Token';
import { update_current_blog_edit_comment } from '../../Redux/Actions/Current_Blog/Current_Blog_Actions';
import AwesomeAlert from 'react-native-awesome-alerts';
import { update_comment_l_on_one_blog } from '../../Redux/Actions/All_Blogs/All_Blogs_Actions';
import { update_current_blog_delete_comment } from '../../Redux/Actions/Current_Blog/Current_Blog_Actions';

const CommentCard = (props) => {
    const isBlogOwner = props?.is_blog_owner === undefined || props?.is_blog_owner === null ? false : props.is_blog_owner;
    const comment = props.comment;
    const comment_id = props.comment?._id?.toString();
    const blog_id = props.blog_id;
    const isDarkMode = useSelector(state => state.isDarkMode);
    const [editCommentText, setEditCommentText] = useState('');
    const [openEditBar, setOpenEditBar] = useState(false);
    const [showDeleteCommentAlert, setShowDeleteCommentAlert] = useState(false);
    const dispatch = useDispatch();

    const animateTranslation = useRef(new Animated.Value(-1)).current;
    const [animatefakeMarginBottom, setAnimatefakeMarginBottom] = useState(5);

    useEffect(() => {
        if (openEditBar) {
            setAnimatefakeMarginBottom(55);
            Animated
                .timing(animateTranslation, { toValue: 50, useNativeDriver: true, duration: 170 })
                .start();
        } else {
            Animated
                .timing(animateTranslation, { toValue: -1, useNativeDriver: true, duration: 170 })
                .start(({ finished }) => {
                    if (finished) {
                        setAnimatefakeMarginBottom(5);
                    }
                });
        }
    }, [openEditBar, animateTranslation]);

    const edit_comment = () => {
        if (editCommentText?.length > 0) {
            try {
                Axios.patch(`${api_base_endpoint()}blogs/comment/edit`, {
                    bid: blog_id,
                    cid: comment_id,
                    comment: editCommentText,
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
                            console.log('comment edited');
                            dispatch(update_current_blog_edit_comment({ comment_id: comment_id, edit_comment: editCommentText }));
                            setEditCommentText('');
                            setOpenEditBar(false);
                        } else {

                        }
                    });
            } catch (error) {

            }
        } else {

        }
    };

    const delete_comment = () => {
        try {
            Axios.delete(`${api_base_endpoint()}blogs/comment/delete`, {
                headers: {
                    bid: blog_id,
                    cid: comment_id,
                    'x-access-token': user_token(),
                },
            })
                .catch(err => {
                    if (err) {
                        console.log(err);
                    }
                    setShowDeleteCommentAlert(false);
                })
                .then(res => {
                    if (res?.data?.status === 'success') {
                        console.log('comment deleted');
                        dispatch(update_current_blog_delete_comment({ comment_id: comment_id }));
                        dispatch(update_comment_l_on_one_blog({ blog_id: blog_id, added_comment: false }));
                        setShowDeleteCommentAlert(false);
                    } else {
                        console.log(res);
                        setShowDeleteCommentAlert(false);
                    }
                });
        } catch (error) {
            setShowDeleteCommentAlert(false);
        }
    };

    const nav_to_user_profile = () => {

    };

    const hide_delete_comment_alert = () => {
        setShowDeleteCommentAlert(false);
    };

    return (
        <View style={[styles.comment_card_main, { marginBottom: animatefakeMarginBottom }]}>
            <AwesomeAlert
                show={showDeleteCommentAlert}
                showProgress={false}
                title="Delete Comment"
                message="Are you sure you want to delete this comment?"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={true}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="No"
                confirmText="Yes"
                confirmButtonColor={Colors().Primary}
                cancelButtonColor={Colors().Primary}
                onConfirmPressed={delete_comment}
                onCancelPressed={hide_delete_comment_alert}
                onDismiss={hide_delete_comment_alert}
                contentContainerStyle={{ backgroundColor: Colors(isDarkMode).AlertBG }}
                titleStyle={styles.dc_alert_title_style}
                messageStyle={[styles.dc_alert_message_style, { color: Colors(isDarkMode).AlertText }]}
                confirmButtonTextStyle={styles.dc_alert_confirm_button_text_style}
                cancelButtonTextStyle={styles.dc_alert_confirm_button_text_style}
            />
            <View style={[styles.ccm_w, { backgroundColor: Colors(isDarkMode).SearchBarBG }]}>
                <View style={styles.ccm_1}>
                    <TouchableOpacity onPress={nav_to_user_profile}>
                        <Text style={[styles.ccm_1_u, { color: Colors(isDarkMode).BasePHText }]}>{comment?.username}</Text>
                    </TouchableOpacity>
                    <Text style={[styles.ccm_1_t, { color: Colors(isDarkMode).BaseText }]}>{getCustomTimeAgo(comment?.createdAt)}</Text>
                </View>
                <Text style={[styles.ccm_2, { color: Colors(isDarkMode).BasePHText }]}>
                    {comment?.comment}
                </Text>
                <View style={styles.ccm_3}>
                    {comment?.is_c_owner &&
                        <TouchableOpacity onPress={() => setOpenEditBar(!openEditBar)}>
                            <Text style={[styles.ccm_3_d, styles.ccm_3_e, { color: Colors().Primary }]}>Edit</Text>
                        </TouchableOpacity>
                    }
                    {(isBlogOwner || comment?.is_c_owner) &&
                        <TouchableOpacity onPress={() => setShowDeleteCommentAlert(true)}>
                            <Text style={[styles.ccm_3_d, { color: isDarkMode ? '#e6760d' : 'red' }]}>Delete</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
            {/* <KeyboardAvoidingView style={[styles.ccm_4, { transform: [{ translateY: openEditBar ? 50 : -1 }] }]}> */}
            <Animated.View style={[styles.ccm_4, { transform: [{ translateY: animateTranslation }] }]}>
                <TextInput
                    placeholder="Write a comment..."
                    placeholderTextColor={Colors(true).BasePHText}
                    style={[styles.ccm_4_ti, { color: Colors(true)?.BaseText }]}
                    value={editCommentText}
                    onChangeText={text => setEditCommentText(text)}
                />
                <TouchableOpacity style={styles.ccm_4_up_b} onPress={edit_comment}>
                    <Feather
                        name="send"
                        size={24}
                        color={Colors(isDarkMode).BaseBG}
                    />
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

export default CommentCard;

const styles = StyleSheet.create({
    comment_card_main: {
        marginHorizontal: 20,
        marginTop: 5,
    },
    ccm_w: {
        borderRadius: 8,
        paddingHorizontal: 7,
        zIndex: 2,
        minHeight: 70,
    },
    ccm_1: {
        flexDirection: 'row',
        marginTop: 5,
    },
    ccm_1_u: {
        fontFamily: fonts.Poppins_600,
        fontSize: 16,
    },
    ccm_1_t: {
        marginLeft: 'auto',
        fontFamily: fonts.Poppins_400,
        marginRight: 3,
        fontSize: 15,
    },
    ccm_2: {
        marginTop: 4,
        fontFamily: fonts.Poppins_400,
        fontSize: 15,
    },
    ccm_3: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 3,
    },
    ccm_3_d: {
        fontSize: 16,
        fontFamily: fonts.Poppins_400,
        color: 'red',
    },
    ccm_3_e: {
        marginRight: 12,
    },
    ccm_4: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors().Primary,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        position: 'absolute',
        bottom: 0,
        zIndex: 1,
    },
    ccm_4_ti: {
        fontFamily: fonts.Poppins_400,
        flex: 1,
        marginTop: 10,
        marginLeft: 5,
    },
    ccm_4_up_b: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginRight: 13,
    },
    dc_alert_title_style: {
        color: '#e6760d',
        fontFamily: fonts.Poppins_400,
        fontSize: 21,
    },
    dc_alert_message_style: {
        fontFamily: fonts.Poppins_400,
        fontSize: 16,
        marginBottom: -5,
    },
    dc_alert_confirm_button_text_style: {
        fontFamily: fonts.Poppins_400,
        fontSize: 15,
        margin: -2.5,
        paddingHorizontal: 7,
    },
});
