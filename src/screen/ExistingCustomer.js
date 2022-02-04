import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Image } from 'react-native';
import { FONTS, COLORS, IMAGES, GLOBALSTYLES } from '../constants/theme';
import EntypoIcon from 'react-native-vector-icons/dist/Entypo';
import AntDesignIcon from 'react-native-vector-icons/dist/AntDesign';
import { useTranslation } from 'react-i18next';

const ExistingCustomer = ({ navigation }) => {
    const { t } = useTranslation();
    const reducerData = useSelector(state => state.registrationReducer)
    console.log("Existing customer page---------->", reducerData)
    return (
        <SafeAreaView style={styles.safeContainerStyle}>
            <View style={GLOBALSTYLES.backButtonView}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}>
                    {Platform.OS == "ios" ?
                        <EntypoIcon name="chevron-thin-left" size={30} />
                        :
                        <AntDesignIcon name="arrowleft" size={30} />
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.headercontainer}>
                    <Image source={IMAGES.eSwarna_Logo} />
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <TouchableOpacity
                        style={reducerData.isEmailVerified ? styles.greenbtnstyle : styles.btnstyle}
                        disabled={reducerData.isEmailVerified}
                        onPress={() => navigation.navigate('Emailverification')}>
                        <Text
                            style={styles.btnTextStyle}>{reducerData.isEmailVerified ? (t('verified')) : (t('verifyEmailID'))}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={reducerData.isMpinVerified ? styles.greenbtnstyle : styles.btnstyle}
                        disabled={reducerData.isMpinVerified}
                        onPress={() => navigation.navigate('SetPassword')}>
                        <Text style={styles.btnTextStyle}>{t('setPIN')}</Text>
                    </TouchableOpacity>
                    <View style={{
                        alignItems: 'center',
                        marginTop: 15
                    }}>
                        <Text style={styles.errortextStyle}>Set Password is mandantory for login to eSwarna</Text>
                    </View>
                </View>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeContainerStyle: {
        flex: 1,
        backgroundColor: 'white',
    },
    mainContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent: "space-between",
        margin: 5,
        padding: 5,
    },
    container: {
        alignContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    headercontainer: {
        alignContent: 'center',
        alignItems: 'center',
        padding: 5,
       marginTop: 15,
    },
    btnstyle: {
        borderRadius: 10,
        backgroundColor: COLORS.pureblue,
        justifyContent: 'center',
        paddingVertical: 5,
        marginVertical: 10,
    },
    greenbtnstyle: {
        borderRadius: 10,
        backgroundColor: COLORS.Green,
        justifyContent: 'center',
        paddingVertical: 5,
        marginVertical: 10,
    },
    btnTextStyle: {
        color: COLORS.white,
        padding: 15,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    errortextStyle: {
        color: 'red',
        // fontWeight: 'bold',
        fontSize: 15,
        ...FONTS.appFontRegular,
    }

});

export default ExistingCustomer;