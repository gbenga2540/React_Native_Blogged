import { StyleSheet, View, TextInput } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import Colors from '../../Utils/Colors/Colors';
import { fonts } from '../../Fonts/Fonts';
import Feather from 'react-native-vector-icons/Feather';

const SearchBar = ({ search, setSearch }) => {
    const ScreenDimensions = useSelector(state => state.ScreenDimensions);
    const isDarkMode = useSelector(state => state.isDarkMode);

    return (
        <View style={[styles.searchbar_main, {
            width: 0.89 * ScreenDimensions?.width || '89%',
            backgroundColor: Colors(isDarkMode).SearchBarBG,
        }]}>
            <View style={[styles.sb_m_search_button]}>
                <Feather
                    name="search"
                    size={26}
                    color={Colors(isDarkMode)?.BasePHText}
                />
            </View>
            <TextInput
                placeholder="Search blogs..."
                style={[styles.sb_m_placeholder, { color: Colors(isDarkMode)?.BaseText }]}
                placeholderTextColor={Colors(isDarkMode).BasePHText}
                value={search}
                onChangeText={text => setSearch(text)}
            />
        </View>
    );
};


export default SearchBar;

const styles = StyleSheet.create({
    searchbar_main: {
        borderRadius: 14,
        height: 59,
        position: 'relative',
        justifyContent: 'center',
    },
    sb_m_placeholder: {
        fontFamily: fonts.Poppins_400,
        width: '100%',
        height: '100%',
        fontSize: 16,
        letterSpacing: 0.3,
        paddingLeft: 15,
    },
    sb_m_search_button: {
        position: 'absolute',
        width: 54,
        height: 54,
        borderRadius: 6,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
    },
});
