import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, ScrollView, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import Colors from '../../Utils/Colors/Colors';
import Axios from 'axios';
import { api_base_endpoint } from '../../Configs/API/API_Base_Endpoint';
import { fonts } from '../../Fonts/Fonts';
import { mongo_date_converter_2 } from '../../Utils/Mongo_Date_Converter/Mongo_Date_Converter';

const DetailsPage = ({ navigation, route }) => {
    const bid = route?.params?.bid;
    const isDarkMode = useSelector(state => state.isDarkMode);
    const [blogInfo, setBlogInfo] = useState({});

    useEffect(() => {
        Axios.get(`${api_base_endpoint()}blogs/${bid}`)
            .catch(err => {
                if (err) {
                    console.log(err);
                }
            })
            .then(res => {
                if (res === null || res === undefined) {

                } else {
                    if (res?.data?.status === 'success') {
                        setBlogInfo({ ...res?.data?.response });
                    } else {

                    }
                }
            });
    }, [bid]);

    return (
        <SafeAreaView style={[styles.details_page_main, { backgroundColor: Colors(isDarkMode).BaseBG }]}>
            <View style={styles.dp_m_h}>
                <Feather
                    name="chevron-left"
                    size={40}
                    color={Colors().Primary}
                    onPress={() => navigation.goBack()}
                    style={styles.dp_m_h_a}
                />
                <Text style={[styles.dp_m_h_det, { color: Colors().Primary }]}>Details</Text>
            </View>
            {blogInfo &&
                <ScrollView>
                    <Text style={[styles.dp_m_sv_t, { color: Colors(isDarkMode).BasePHText }]}>{blogInfo?.title}</Text>
                    <View style={styles.dp_m_sv_t_a}>
                        <Text style={[styles.dp_m_sv_t_a_t, { color: Colors(isDarkMode).BasePHText }]}>{`${mongo_date_converter_2(blogInfo?.createdAt)} by `}</Text>
                        <Text style={[styles.dp_m_sv_t_a_t, { color: Colors(isDarkMode).BaseText }]}>{blogInfo?.author}</Text>
                    </View>
                    {blogInfo?.b_dp_link !== 'none' &&
                        <Image
                            style={styles.dp_m_sv_i}
                            source={{
                                uri: blogInfo?.b_dp_link,
                                width: '90%',
                                minHeight: 230,
                            }}
                        />
                    }
                    <Text style={styles.dp_m_sv_mssg}>
                        {blogInfo?.message}
                    </Text>
                </ScrollView>
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
    dp_m_h_det: {
        fontFamily: fonts.PoppinsBold,
        fontSize: 22,
    },
    dp_m_sv_t: {
        fontFamily: fonts.PoppinsBold,
        fontSize: 22,
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 20,
    },
    dp_m_sv_t_a: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 15,
    },
    dp_m_sv_t_a_t: {
        fontFamily: fonts.PoppinsBold,
        fontSize: 17,
    },
    dp_m_sv_i: {
        resizeMode: 'contain',
        maxWidth: '90%',
        minHeight: 230,
        alignSelf: 'center',
        borderRadius: 7,
    },
    dp_m_sv_mssg: {
        marginHorizontal: 20,
        fontFamily: fonts.PoppinsRegular,
    },
});
