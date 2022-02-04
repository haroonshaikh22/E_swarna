import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

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
  KeyboardAvoidingView, Platform
} from 'react-native';

import { FONTS, COLORS, IMAGES, GLOBALSTYLES } from '../constants/theme';
import { Loader } from '../common/loader';
import { customerOtp } from '../../redux/actions/registrationAction';
import EntypoIcon from 'react-native-vector-icons/dist/Entypo';
import AntDesignIcon from 'react-native-vector-icons/dist/AntDesign';
import { useTranslation } from 'react-i18next';


const RegisterPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const reducerData = useSelector(state => state.registrationReducer)

  let textInput = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState();
  const { t } = useTranslation("common");


  const customerOtpCall = async () => {
    dispatch(customerOtp(phoneNumber, navigation));
  };

  const onChangePhone = number => {
    setPhoneNumber(number);
  };

  return (
    <SafeAreaView style={styles.safeContainerStyle}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-120}
        style={{ flex: 1 }}>
        <View
          style={GLOBALSTYLES.backButtonView}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}>
            {Platform.OS == "ios" ?
              <EntypoIcon name="chevron-thin-left" size={30} />
              :
              <AntDesignIcon name="arrowleft" size={30} />
            }
          </TouchableOpacity>
        </View>


        <View style={styles.mainContainer}>
          <View style={{ alignItems: 'center' }}>
            <Image source={IMAGES.eSwarna_Logo} />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.headerText}>{t('register')}</Text>
          </View>
          <View style={styles.container}>
            <View style={phoneNumber?.length == 10 ? styles.textInputView : styles.textInputAlert}>
              <Text style={styles.textStyle}>{t('enterMobileNumber')}</Text>
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
            style={phoneNumber ? styles.btnstyle : styles.btnDisablestyle}
            onPress={customerOtpCall}
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

        <View style={styles.bottomStyleView}>

          <Text style={styles.dontStyle}>{t('alreadyHaveAnAccount')}</Text>
          <TouchableOpacity
            style={styles.btnstyle}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.btnTextStyle}>{t('signIn')} </Text>
          </TouchableOpacity>
        </View>
        <Loader loading={reducerData.isLoading} />
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  safeContainerStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: 'center',
  },
  container: {
    alignContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    color: COLORS.black,
    marginBottom: 10,
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
  dontStyle: {
    ...FONTS.appFontMedium,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    width: Dimensions.get('screen').width - 40,
  },
  bottomStyleView: {
    position: 'absolute',
    bottom: 20,
    left: 0, right: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  errortextStyle: {
    color: 'red',
    fontWeight: 'bold',
    ...FONTS.appFontRegular,
    marginTop: 10
  }
});

export default RegisterPage;
