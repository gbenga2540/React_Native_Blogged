import React from 'react';
import { StyleSheet, View } from 'react-native';
import Spinner from 'react-native-spinkit';
import { spinkit_types } from '../../Data/Spinkit_Types/SpinKit_Types';
import Colors from '../../Utils/Colors/Colors';

const OverlaySpinner = ({ showSpinner }) => {
    if (showSpinner) {
        return (
            <View style={styles.overlay_spinner_main}>
                <Spinner
                    isVisible={true}
                    size={80}
                    type={spinkit_types[6]}
                    color={Colors().Primary}
                />
            </View>
        );
    } else {
        return null;
    }
};

export default OverlaySpinner;

const styles = StyleSheet.create({
    overlay_spinner_main: {
        width: '100%',
        minWidth: '100%',
        maxWidth: '100%',
        height: '100%',
        minHeight: '100%',
        maxHeight: '100%',
        position: 'absolute',
        zIndex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
