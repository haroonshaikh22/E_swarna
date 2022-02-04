import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { Text, View, Image, TextInput, TouchableOpacity, Dimensions, SafeAreaView, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { COLORS, IMAGES, FONTS, GLOBALSTYLES } from '../constants/theme';

import { loginRequest, checkUser } from '../../redux/actions/loginAction'
import { Loader } from '../common/loader';
import { useTranslation } from 'react-i18next';

const Login = ({ navigation }) => {
    const [enteredCustomerId, setEnteredCustomerId] = useState('8268380946');
    const [enteredMpin, setEnteredMpin] = useState('Shital12');
    const [isPasswordBox, setIsPasswordBox] = useState(false);
    const [validIdLength, setValidIdLength] = useState(0);
    const [isCustomerTouched, setIsCustomerTouched] = useState(false);
    const [isPinTouched, setIsPinTouched] = useState(false);

    const dispatch = useDispatch();
    const reducerData = useSelector(state => state.loginReducer)
    const { t } = useTranslation();

    const postUser = async () => {
        dispatch(loginRequest(enteredCustomerId, enteredMpin, navigation));
    }

    const checkUserId = async () => {
        dispatch(checkUser(enteredCustomerId, enteredMpin));
    }

    const handleCustomerId = (data) => {
        handleCustomerError();
        setEnteredCustomerId(data);
        if (validIdLength !== 0 && data.length !== validIdLength) {
            setIsPasswordBox(false)
            setEnteredMpin('')
        }
    }
    const handleCustomerError = () => {
        if (enteredCustomerId == "" && isCustomerTouched === false) {
            setIsCustomerTouched(true)
        }
    }

    const handleMpin = (data) => {
        handlePinError();
        setEnteredMpin(data)
    }
    const handlePinError = () => {
        if (enteredMpin == "" && isPinTouched === false) {
            setIsPinTouched(true)
        }
    }

    return (
        <SafeAreaView style={styles.safeContainerStyle}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={-120}
                style={{ flex: 1 }}>
                <View style={styles.mainContainer}>
                    <View style={{ paddingVertical: 20 }}>
                        <Image source={IMAGES.eSwarna_Logo} />
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={styles.headerText}>{t("login")}</Text>
                    </View>

                    <View style={{ padding: 5 }}>
                        <View style={styles.textInputView}>
                            <Text style={styles.textStyle}> {t("enterEmailIDOrCustomer")}</Text>
                            <TextInput placeholder="john@abc.com"
                                style={styles.textinput}
                                keyboardType='default'
                                maxLength={40}
                                value={enteredCustomerId}
                                onChangeText={(data) => handleCustomerId(data)}>
                            </TextInput>
                        </View>
                        <View>
                            {reducerData.isPasswordBox && (
                                <View style={styles.textInputView}>
                                    <Text style={styles.textStyle}>{t("enterPIN")}</Text>
                                    <TextInput placeholder="******"
                                        style={styles.textinput}
                                        keyboardType='default'
                                        returnKeyType="done"
                                        secureTextEntry={true}
                                        autoCapitalize='none'
                                        maxLength={15}
                                        value={enteredMpin}
                                        onChangeText={(data) => handleMpin(data)}
                                    >
                                    </TextInput>
                                </View>
                            )}
                        </View>
                    </View>

                    <TouchableOpacity
                        style={enteredCustomerId.length == 0 ? styles.btnDisablestyle : styles.btnstyle}
                        onPress={reducerData.isPasswordBox === false ? checkUserId : postUser}
                        disabled={enteredCustomerId.length == 0}
                    >
                        <Text style={styles.btnTextStyle}>{reducerData.isPasswordBox === false ? t("next") : t("signIn")}</Text>
                    </TouchableOpacity>

                    {(isCustomerTouched && enteredCustomerId === "") && <Text style={styles.errortextStyle}>{t("pleaseEnterValidEmailIDCustIDMobileNo")} </Text>}
                    {(isPinTouched && enteredMpin === "") && <Text style={styles.errortextStyle}> {t("requiredPassword")} </Text>}
                </View>
                <View style={styles.bottomStyleView}>
                    <View style={styles.bottomStyle}>
                        <Text style={styles.forgotStyle}
                            onPress={() => navigation.navigate('ForgotPassword')}
                        > {t('forgotPin')} </Text>
                        <Text style={styles.dontStyle}>{t('donthaveanAccount')}</Text>

                        <TouchableOpacity
                            style={styles.btnstyle}
                            onPress={() => navigation.navigate('RegisterPage')}>
                            <Text style={styles.btnTextStyle}> {t("signUpRegister")} </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Loader loading={reducerData.isLoading} />
            </KeyboardAvoidingView>
        </SafeAreaView>

    );
}
const styles = StyleSheet.create({
    safeContainerStyle: {
        flex: 1,
        backgroundColor: '#fff'
    },
    mainContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        color: COLORS.black,
        fontSize: 24,
    },
    textInputView: {
        borderWidth: 1,
        borderColor: COLORS.pureblue,
        borderRadius: 10,
        margin: 5,
        width: Dimensions.get('screen').width - 40,
    },
    textStyle: {
        paddingTop: 10,
        ...FONTS.appFontMedium,
        marginHorizontal: 5,
        fontWeight: 'bold',
    },
    textinput: {
        paddingVertical: 15,
        marginStart: 15,
    },
    btnstyle: {
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: COLORS.pureblue,
        justifyContent: 'center',
        margin: 5,
        width: Dimensions.get('screen').width - 40
    },
    btnDisablestyle: {
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: COLORS.Lightgray,
        justifyContent: 'center',
        margin: 5,
        width: Dimensions.get('screen').width - 40
    },
    btnTextStyle: {
        color: COLORS.white,
        padding: 15,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    forgotStyle: {
        color: COLORS.pureblue,
        fontWeight: 'bold',
        ...FONTS.appFontMedium,
        paddingBottom: 10,
        textAlign: 'center',
        textAlign: 'center',
    },
    dontStyle: {
        ...FONTS.appFontMedium,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    bottomStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    bottomStyleView: {
        zIndex: 1,
        position: 'absolute',
        bottom: 20,
        left: 0, right: 0,
        justifyContent: "center",
        alignItems: "center"
    },
    errortextStyle: {
        color: COLORS.Red,
        fontWeight: 'bold',
        ...FONTS.appFontRegular,
        marginTop: 10
    },
});

export default Login;