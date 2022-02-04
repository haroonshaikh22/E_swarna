import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView
} from 'react-native';
import { FONTS, COLORS, IMAGES, GLOBALSTYLES } from '../../constants/theme';
import { useSelector, useDispatch } from "react-redux";
import { forgotpinOTP } from '../../../redux/actions/forgotpasswordAction';
import EntypoIcon from 'react-native-vector-icons/dist/Entypo';
import AntDesignIcon from 'react-native-vector-icons/dist/AntDesign';
import { useTranslation } from 'react-i18next';
import Validate from '../../util/validate';

const ForgotPassword = ({ navigation }) => {
  let textInput = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const dispatch = useDispatch();
  const reducerData = useSelector(state => state.forgotpasswordReducer)
  const { t } = useTranslation();

  const onChangePhone = number => {
    setPhoneNumber(number);
  };

  const forgotpinOTPCall = () => {
    dispatch(forgotpinOTP(phoneNumber, navigation));
  }

  return (
    <SafeAreaView style={styles.safeContainerStyle}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-120}
        style={{ flex: 1 }}>
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
          <View style={styles.loginTextStyle}>
            <Text style={styles.headerText}>{t('forgotPin')}</Text>
          </View>
          <View style={styles.container}>
            <View style={phoneNumber?.length == 10 ? styles.textInputView : styles.textInputAlert}>
              <Text style={styles.textStyle}> {t('enterMobileNumber')}</Text>
              <TextInput
                placeholder="9876543210"
                fontWeight='bold'
                ref={input => (textInput = input)}
                style={styles.textinput}
                keyboardType="number-pad"
                returnKeyType="go"
                maxLength={10}
                value={phoneNumber}
                onChangeText={onChangePhone}
                secureTextEntry={false}
              />
            </View>
          </View>
          <TouchableOpacity
            style={phoneNumber.length === 10 ? styles.btnstyle : styles.btnDisablestyle}
            onPress={forgotpinOTPCall}
            disabled={!phoneNumber}>
            <Text style={styles.btnTextStyle}>{t('sendOTP')}</Text>
          </TouchableOpacity>
          <View style={{ margin: 10 }}>
            {phoneNumber?.length < 10 && (
              <Text style={styles.errortextStyle}>
                {t('mobileNumbershouldbein10digitsonly')}
              </Text>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeContainerStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    alignContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 5,
    height: Dimensions.get('screen').height - 40,
  },
  container: {
    alignContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  headercontainer: {
    alignContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
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
  loginTextStyle: {
    margin: 5,
    marginTop: 1,
  },

  textInputView: {
    borderWidth: 1,
    borderColor: COLORS.pureblue,
    borderRadius: 10,
    margin: 3,
    width: Dimensions.get('screen').width - 40,
  },
  textInputAlert: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
    margin: 3,
    width: Dimensions.get('screen').width - 40,
  },

  textStyle: {
    paddingTop: 10,
    ...FONTS.appFontSemiBold,
    marginStart: 5,
    fontWeight: 'bold',
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
  textinput: {
    paddingVertical: 15,
    marginStart: 15,
  },
  btnTextStyle: {
    color: COLORS.white,
    padding: 15,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  errortextStyle: {
    color: 'red',
    fontWeight: 'bold',
    ...FONTS.appFontRegular,
    marginTop: 10
  }
});

export default ForgotPassword;