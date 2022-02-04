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
import { FONTS, COLORS, IMAGES, GLOBALSTYLES } from '../../constants/theme';
import { resetMpin } from "../../../redux/actions/forgotpasswordAction";
import Validate from "../../util/validate";
import EntypoIcon from 'react-native-vector-icons/dist/Entypo';
import AntDesignIcon from 'react-native-vector-icons/dist/AntDesign';
import { t } from "i18next";


const ResetPassword = ({ navigation }) => {
    const dispatch = useDispatch();

    const reducerData = useSelector(state => state.forgotpasswordReducer);
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');

    const [disable, setDisable] = useState(true)
    const [validFlag, setValidFlag] = useState(true)
    const [confirmPassFlag, setConfrmPassFlag] = useState(true)

    const handlePassword = (data) => {
        setPassword(data)
        if (data.length < 6 || data.length > 24) {
            setValidFlag(false)
        } else {
            if (Validate.validateField(data, "password")) {
                setValidFlag(true)
            } else {
                setValidFlag(false)
            }
        }
    }

    const handleConfirmPassword = (data) => {
        setCPassword(data)
        if (password !== cPassword) {
            setConfrmPassFlag(false)
        } else {
            setConfrmPassFlag(true)
            setDisable(false)
        }

    }

    const setMpinCalll = () => {
        dispatch(resetMpin(cPassword, password, reducerData.customerId, reducerData.number, reducerData.otp, reducerData.refCodeForMobile, navigation))
    }

    return (
        <SafeAreaView style={styles.safeContainerStyle}>
            <View style={GLOBALSTYLES.backButtonView}>
                <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={() => navigation.navigate('Login')}>
                    {Platform.OS == "ios" ?
                        <EntypoIcon name="chevron-thin-left" size={30} />
                        :
                        <AntDesignIcon name="arrowleft" size={30} />
                    }
                </TouchableOpacity>
            </View>
            <View style={{
                padding: 20,
               // margin: 5,
               // marginTop: 5,
                justifyContent: "center",
                alignItems: 'center',
                alignContent: 'center',
            }}>
                <Image source={IMAGES.eSwarna_Logo} />
                
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.mainContainer}>
                <Text style={styles.headerText}>
                    {t('forgotPin')}
                </Text>
                    <View style={validFlag ? styles.textInputView : styles.textInputAlert}>
                        <Text style={styles.textStyle}>{t('enterNewPIN')}</Text>
                        <TextInput placeholder="******"
                            style={styles.textinput}
                            keyboardType='default'
                            returnKeyType="done"
                            secureTextEntry={true}
                            autoCapitalize='none'
                            value={password}
                            maxLength={24}
                            onChangeText={(data) => handlePassword(data)}
                        />
                    </View>
                    <View>
                        {validFlag === false ? (
                            <Text style={styles.errortextStyle}>
                                {t('invalidPattern')}
                            </Text>
                        ) : null}
                    </View>
                    <View style={confirmPassFlag ? styles.textInputView : styles.textInputAlert}>
                        <Text style={styles.textStyle}>{t('confirmNewPIN')}</Text>
                        <TextInput placeholder="******"
                            style={styles.textinput}
                            keyboardType='default'
                            returnKeyType="done"
                            secureTextEntry={true}
                            autoCapitalize='none'
                            value={cPassword}
                            maxLength={24}
                            onChangeText={(data) => handleConfirmPassword(data)}
                        />
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
                        onPress={setMpinCalll}
                    >
                        <Text style={styles.btnTextStyle}> {t('setPIN')}</Text>
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
        justifyContent: "center",
        alignItems: 'center',
        alignContent: 'center',
        margin: 5,
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
        margin: 20,
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
        marginTop: 5
    },
    textInputAlert: {
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 10,
        margin: 20,
        width: Dimensions.get('screen').width - 40,
    },
});

export default ResetPassword;