import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    View,
    Text, TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Image, ScrollView,
    TextInput, Dimensions
} from 'react-native';
import { COLORS, IMAGES, FONTS, GLOBALSTYLES } from '../constants/theme';
import CustomNavigationBar from '../common/CustomNavigationBar';
import RestUtil from "../util/restUtils";
import { URL } from "../constants/configure";
import Validate from "../util/validate";
import { setPin } from "../../redux/actions/registrationAction";
import EntypoIcon from 'react-native-vector-icons/dist/Entypo';
import AntDesignIcon from 'react-native-vector-icons/dist/AntDesign';
import { useTranslation } from 'react-i18next';


const SetPassword = ({ navigation }) => {
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const { t } = useTranslation();
    const [disable, setDisable] = useState(true)
    const [validFlag, setValidFlag] = useState(true)
    const [confirmPassFlag, setConfrmPassFlag] = useState(true)
    const dispatch = useDispatch();
    const reducerData = useSelector(state => state.registrationReducer);
    console.log('SetPassword -----------?>?>?>?', reducerData);
    useEffect(() => {

    }, [cPassword, password]);

    const handlePassword = (data) => {
        setPassword(data)
        if (password.length < 6 || password.length > 24) {
            setValidFlag(false)
        } else {
            if (Validate.validateField(data, "password")) {
                setValidFlag(true);
            } else {
                console.log(" validateElse", data);
                setValidFlag(false)
            }
        }
    }

    const handleConfirmPassword = (data) => {
        setCPassword(data)
        if (data === password) {
            if (Validate.validateField(data, "password")) {
                setConfrmPassFlag(true);
                setDisable(false)
            } else {
                setConfrmPassFlag(false)
            }
        } else {
            setConfrmPassFlag(false)
        }
    }


    const setMpinCall = () => {
        let bodyData = {
            confirmNewMpin: cPassword,
            customerId: reducerData.customerId,
            mobileNumber: reducerData.number,
            mobileOtp: reducerData.otp,
            mobileReferenceCode: reducerData.refCodeForMobile,
            newMpin: password,
        }
        console.log("bodyData", bodyData);
        console.log("bodyDatareducerData", reducerData);

        dispatch(setPin(bodyData, navigation));
    }

    return (
        <SafeAreaView style={styles.safeContainerStyle}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
            >
                <View style={GLOBALSTYLES.backButtonView}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}>
                        {Platform.OS == "ios" ?
                            <EntypoIcon name="chevron-thin-left" size={30} />
                            :
                            <AntDesignIcon name="arrowleft" size={30} />
                        }
                    </TouchableOpacity>
                </View>
                <View style={{
                    paddingHorizontal: 20,
                    alignItems: 'center',
                }}>
                    <Image source={IMAGES.eSwarna_Logo} />
                    <Text style={styles.headerText}>
                        {t('setPIN')}
                    </Text>
                </View>
                <View style={styles.mainContainer}>
                    <View style={validFlag ? styles.textInputView : styles.textInputAlert}>
                        <Text style={styles.textStyle}>{t('enterPIN')}</Text>
                        <TextInput placeholder="******"
                            style={styles.textinput}
                            keyboardType='default'
                            returnKeyType="done"
                            secureTextEntry={true}
                            autoCapitalize='none'
                            value={password}
                            maxLength={24}
                            onChangeText={(data) => handlePassword(data)}
                        // onBlur={onblurchange}
                        >
                        </TextInput>
                    </View>
                    <View style={{ alignSelf: 'flex-start', paddingLeft: 25 }}>
                        {validFlag === false ? (
                            <Text style={styles.errortextStyle}>
                                {t('invalidPattern')}
                            </Text>
                        ) : null}
                    </View>
                    <View style={confirmPassFlag ? styles.textInputView : styles.textInputAlert}>
                        <Text style={styles.textStyle}>{t('confirmPIN')}</Text>
                        <TextInput placeholder="******"
                            style={styles.textinput}
                            keyboardType='default'
                            returnKeyType="done"
                            secureTextEntry={true}
                            autoCapitalize='none'
                            value={cPassword}
                            maxLength={24}
                            onChangeText={(data) => handleConfirmPassword(data)}
                        >
                        </TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Text style={styles.bullet}>{'\u2022'}</Text>
                        <Text style={styles.text}>{t('passwordMustContain1UpperCase')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.bullet}>{'\u2022'}</Text>
                        <Text style={styles.text}>{t('specialCharacter')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.bullet}>{'\u2022'}</Text>
                        <Text style={styles.text}>{t('passwordShouldnotContainConecNumbers')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.bullet}>{'\u2022'}</Text>
                        <Text style={styles.text}>{t('passwordLengthShouldbeFrom')}</Text>
                    </View>

                    <TouchableOpacity
                        style={disable ? styles.btnDisablestyle : styles.btnstyle}
                        disabled={disable}
                        onPress={() => setMpinCall()}>
                        <Text style={styles.btnTextStyle}>{t('setPIN')}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeContainerStyle: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        color: COLORS.black,
        fontSize: 26,
        padding: 20,
        margin: 10
    },
    textInputView: {
        borderWidth: 1,
        borderColor: COLORS.pureblue,
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 20,
        marginVertical: 15,
        width: Dimensions.get('screen').width - 40,
    },
    textStyle: {
        paddingTop: 5,
        ...FONTS.appFontMedium,
        marginStart: 10,
        fontWeight: 'bold',
    },
    textinput: {
        paddingVertical: 15,
        marginStart: 15,
    },
    bullet: {
        color: 'gray',
        fontSize: 30,
        padding: 5,
        margin: 5
    },
    text: {
        color: 'gray',
        fontSize: 14,
        padding: 5,
        margin: 5,
        flex: 1,
        ...FONTS.appFontRegularsmall
    },
    btnstyle: {
        margin: 5,
        borderRadius: 10,
        backgroundColor: COLORS.pureblue,
        justifyContent: 'center',
        width: Dimensions.get('screen').width - 40,
        padding: 20,
    },
    btnDisablestyle: {
        margin: 5,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: COLORS.Lightgray,
        width: Dimensions.get('screen').width - 40,
        padding: 20,
    },
    btnTextStyle: {
        color: COLORS.white,
        ...FONTS.appFontMedium,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    errortextStyle: {
        color: 'red',
        fontWeight: 'bold',
        ...FONTS.appFontRegular,
        marginTop: 5,
    },
    textInputAlert: {
        borderWidth: 1,
        borderColor: 'red',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 20,
        marginVertical: 15,
        width: Dimensions.get('screen').width - 40,
    },
});

export default SetPassword;