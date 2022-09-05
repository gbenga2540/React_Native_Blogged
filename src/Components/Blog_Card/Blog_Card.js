import React from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { useSelector } from 'react-redux';
import { mongo_date_converter } from '../../Utils/Mongo_Date_Converter/Mongo_Date_Converter';
import { fonts } from '../../Fonts/Fonts';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../Utils/Colors/Colors';
import { high_nums_converter } from '../../Utils/High_Nums_Converter/High_Nums_Converter';

const BlogCard = ({ b_post, navigation }) => {
    const ScreenDimensions = useSelector(state => state.ScreenDimensions);
    const isDarkMode = useSelector(state => state.isDarkMode);
    const BlogTags = useSelector(state => state.BlogTags);

    const nav_to_det = () => {
        navigation.navigate('Details', { bid: b_post?.bid });
    };

    return (
        <View style={[styles.blogcard_main, { width: 0.89 * ScreenDimensions?.width || '89%' }]}>
            <TouchableWithoutFeedback onPress={() => nav_to_det()} style={styles.bc_m_b_i_w}>
                <Image
                    style={styles.bc_m_b_i}
                    source={b_post?.b_dp_link === 'none'
                        ?
                        isDarkMode
                            ?
                            require('../../Images/Blogged_White.png')
                            :
                            require('../../Images/Blogged_Black.png')
                        :
                        {
                            uri: b_post?.b_dp_link,
                            width: '100%',
                            height: 230,
                        }
                    }
                />
            </TouchableWithoutFeedback>
            <View style={styles.bc_m_b_d_w}>
                <TouchableWithoutFeedback onPress={() => nav_to_det()}>
                    <View style={styles.bc_m_b_d_1}>
                        <Text style={[styles.bc_m_b_d_1_t, { color: Colors(isDarkMode).BasePHText }]}>{b_post?.author}</Text>
                        <View style={[styles.bc_m_b_d_1_dot, { backgroundColor: Colors(isDarkMode).BasePHText }]}>{''}</View>
                        <Text style={[styles.bc_m_b_d_1_t, { color: Colors(isDarkMode).BasePHText }]}>{mongo_date_converter(b_post?.createdAt)}</Text>
                        {b_post?.createdAt === b_post?.updatedAt &&
                            <View style={[styles.bc_m_b_d_1_dot, { backgroundColor: Colors(isDarkMode).BasePHText }]}>{''}</View>
                        }
                        <Text style={[styles.bc_m_b_d_1_t, { color: Colors(isDarkMode).BasePHText }]}>
                            {b_post?.createdAt === b_post?.updatedAt ? 'Edited' : ''}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.bc_m_b_d_2}>
                    <View style={styles.bc_m_b_d_2_1}>
                        <Text style={[styles.bc_m_b_d_2_1_t, { color: Colors(isDarkMode).BaseText }]}>{b_post?.title}</Text>
                    </View>
                    <View style={styles.bc_m_b_d_2_2}>
                        <TouchableWithoutFeedback>
                            <View style={styles.bc_m_b_d_2_2_l}>
                                {b_post?.liked
                                    ?
                                    <MaterialIcons
                                        name="thumb-up"
                                        size={28}
                                        color={Colors(isDarkMode).BasePHText}
                                    />
                                    :
                                    <Feather
                                        name="thumbs-up"
                                        size={28}
                                        color={Colors(isDarkMode).BasePHText}
                                    />
                                }
                                <Text style={{ color: Colors(isDarkMode).BaseText }}>
                                    {high_nums_converter(b_post?.likes_l)}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.bc_m_b_d_2_2_c}>
                            <Octicons
                                name="comment"
                                size={28}
                                color={Colors(isDarkMode).BasePHText}
                            />
                            <Text style={{ color: Colors(isDarkMode).BaseText }}>
                                {high_nums_converter(b_post?.comments_l)}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.bc_m_b_d_3}>
                    {b_post?.tags?.map(tag_i =>
                        <Text key={tag_i}>
                            {BlogTags?.filter(item => item?.tag_index === tag_i)?.[0]?.tag_name}
                        </Text>
                    )}
                </View>
            </View>
        </View>
    );
};

export default BlogCard;

const styles = StyleSheet.create({
    blogcard_main: {
        backgroundColor: '#d6d6d6',
        minHeight: 300,
        marginBottom: 20,
        borderRadius: 4,
    },
    bc_m_b_i_w: {

    },
    bc_m_b_i: {
        width: '100%',
        height: 230,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        resizeMode: 'cover',
    },
    bc_m_b_d_w: {
        flexDirection: 'column',
    },
    bc_m_b_d_1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingLeft: 5,
    },
    bc_m_b_d_1_t: {
        fontFamily: fonts.Poppins_600,
        fontSize: 14,
    },
    bc_m_b_d_1_dot: {
        marginHorizontal: 4,
        minWidth: 5,
        width: 5,
        minHeight: 5,
        height: 5,
        borderRadius: 5,
    },
    bc_m_b_d_2: {
        flexDirection: 'row',
        marginHorizontal: 5,
        marginTop: 10,
    },
    bc_m_b_d_2_1: {
        flexBasis: '88%',
    },
    bc_m_b_d_2_1_t: {
        fontFamily: fonts.Poppins_600,
        fontSize: 24,
    },
    bc_m_b_d_2_1_st: {
        fontFamily: fonts.Poppins_400,
        fontSize: 16,
    },
    bc_m_b_d_2_2: {
        flexBasis: '12%',
        alignItems: 'center',
    },
    bc_m_b_d_2_2_l: {
        alignItems: 'center',
    },
    bc_m_b_d_2_2_c: {
        marginTop: 5,
        alignItems: 'center',
    },
    bc_m_b_d_3: {

    },
});
