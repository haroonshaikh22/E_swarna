import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import { COLORS, IMAGES, FONTS, GLOBALSTYLES } from '../constants/theme';
import { verifyOTP, customerOtp } from '../../redux/actions/registrationAction'
import { Loader } from '../common/loader';
import EntypoIcon from 'react-native-vector-icons/dist/Entypo';
import AntDesignIcon from 'react-native-vector-icons/dist/AntDesign';
import { useTranslation } from 'react-i18next';
import OtpInputs from 'react-native-otp-inputs'


const InputOtp = ({ navigation, route }) => {

  const dispatch = useDispatch();
  const reducerData = useSelector(state => state.registrationReducer);
  // console.log('InputOTPReducerData', reducerData);

  //let textInput = useRef(null);
  let clockCall = null;
  const lengthInput = 4;
  const defaultCountDown = 45;
  const [OTP, setOTP] = useState('');
  const [countDown, setCountDown] = useState(defaultCountDown);
  const [enableResend, setEnableResend] = useState(false);
  const { t } = useTranslation("common");

  useEffect(() => {
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearInterval(clockCall);
    };
  });

  const VerifyOTPCall = () => {
    dispatch(verifyOTP(reducerData.number, reducerData.customerOTPResponse.referenceCode, OTP, navigation));
  };

  const decrementClock = () => {
    if (countDown === 0) {
      setEnableResend(true);
      setCountDown(0);
      clearInterval(clockCall);
    } else {
      setCountDown(countDown - 1);
    }
  };

  const onChangeText = val => {
    setOTP(val);
  };

  const onResendOTP = () => {
    setOTP('')
    dispatch(customerOtp(reducerData.number, navigation));
    setCountDown(defaultCountDown);
    setEnableResend(false);
    clearInterval(clockCall);
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
  };

  // useEffect(() => {
  //   textInput.focus();
  //  //  Platform.OS === "ios" ?textInput.focus() : setTimeout(() => textInput.focus(), 1000)
  // }, []);

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

          <View style={styles.loginTextStyle}>
            <Text style={styles.headerText}>{t("enterOtp")}</Text>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.textInputView}>
            <View style={{ flexDirection: 'row', }}>
              <Text style={styles.titleStyle}>
                {t('otpSendTo')} +91 {reducerData.number}
              </Text>
              {/* <TextInput
                ref={input => (textInput = input)}
                onChangeText={onChangeText}
                style={{ width: 0, height: 0 }}
                value={OTP}
                maxLength={lengthInput}
                autoFocus={true}
                keyboardType="number-pad"
              /> */}

            </View>
            <View style={styles.containerInput}>
            <OtpInputs handleChange={code => onChangeText(code)} numberOfInputs={4}
                                containerStyles={styles.cellViewContainer}
                                inputContainerStyles={styles.cellView}
                                keyboardType="number-pad"
                            />
              {/* {Array(lengthInput)
                .fill()
                .map((data, index) => (
                  <View key={index} style={styles.cellViewContainer}>
                    <View style={styles.cellView}>
                      <Text
                        style={styles.cellText}
                        autoFocus={true}
                        onPress={() => textInput.focus()}>
                        {OTP && OTP.length > 0
                          ? OTP[index]
                          : ''}
                      </Text>
                    </View>
                  </View>
                ))} */}
            </View>
          </View>
          <View style={styles.bottomView}>
            <Text>{t('requestAnotherOTP')}</Text>
            <TouchableOpacity onPres={onResendOTP}>
            <View style={styles.btnResend}>
                                <Text>
                                    {enableResend ?
                                        <Text onPress={onResendOTP} style={{color:COLORS.pureblue}}>
                                            Resend OTP
                                        </Text>
                                        :
                                        <Text>
                                            {countDown}
                                        </Text>
                                    }
                                </Text>
                            </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={OTP.length == 4 ? styles.btnstyle : styles.btnDisablestyle}
            disabled={OTP.length == 0}
            onPress={VerifyOTPCall}>
            <Text style={{ color: COLORS.white }}>{t('verify')} </Text>
          </TouchableOpacity>
        </View >
  <Loader loading={reducerData.isLoading} />
      </View >
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  safeContainerStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    alignContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height - 40,
  },
  container: {
    alignContent: 'center',
    alignItems: 'center',
  },
  headercontainer: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 28,
    color: COLORS.black,
    marginBottom: 10,
  },
  titleStyle: {
    fontSize: 13,
    marginTop: 15,
    marginBottom: 10,
    marginStart: 15
  },
  textInputView: {
    borderWidth: 1,
    borderColor: COLORS.pureblue,
    borderRadius: 10,
    width: Dimensions.get('screen').width - 40,
    textAlignVertical: 'top',
  },
  textStyle: {
    ...FONTS.appFontSemiBold,
    marginStart: 2,
    marginVertical: 2
  },
  textinput: {
    margin: 2,
    marginStart: 2,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 10
  },
  cellViewContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    marginBottom: 20,
    justifyContent: 'space-around',
  },
  cellView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.pureblue,
    borderRadius: 10,
  },
  cellText: {
    textAlign: 'center',
    fontSize: 20,
    padding: 8,
    margin: 5
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: "2%",
  },
  textChange: {
    color: '#234DB7',
    alignItems: 'center',
  },
  btnResend: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  textResnd: {
    alignItems: 'center',
  },
  btnstyle: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: COLORS.pureblue,
    justifyContent: 'center',
    width: Dimensions.get('screen').width - 40,
    padding: 18,
  },
  btnDisablestyle: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: COLORS.Lightgray,
    justifyContent: 'center',
    width: Dimensions.get('screen').width - 40,
    padding: 18,
  },
  btnTextStyle: {
    color: COLORS.white,
    ...FONTS.appFontMedium,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default InputOtp;
