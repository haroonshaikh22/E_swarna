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
  KeyboardAvoidingView
} from 'react-native';
import { FONTS, COLORS, IMAGES, GLOBALSTYLES } from '../constants/theme';
import { Loader } from '../common/loader';
import { getOTPForEmail } from '../../redux/actions/registrationAction';
import EntypoIcon from 'react-native-vector-icons/dist/Entypo';
import AntDesignIcon from 'react-native-vector-icons/dist/AntDesign';
import { useTranslation } from 'react-i18next';


const Emailverification = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const reducerData = useSelector(state => state.registrationReducer)

  let textInput = useRef(null);

  const [email, setEmail] = useState();
  const flag = 1;

  const customerOtpCall = async () => {
    dispatch(getOTPForEmail(email, navigation, flag,t))
  };

  const onChangePhone = mail => {
    setEmail(mail);
  };

  return (
    <SafeAreaView style={styles.safeContainerStyle}>
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
      <View style={styles.mainContainer}>
        <View style={styles.headercontainer}>
          <Image source={IMAGES.eSwarna_Logo} />
        </View>
        <View style={{margin:5}}>
          <Text style={styles.headerText}>{t('verifyEmailID')}</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.textInputView}>
            <Text style={styles.textStyle}>{t('enterEmailID')}</Text>
            <TextInput
              placeholder="john@abc.com"
              fontWeight='bold'
              ref={input => (textInput = input)}
              style={styles.textinput}
              returnKeyType="go"
              value={email}
              onChangeText={onChangePhone}
              secureTextEntry={false}
            />
          </View>
        </View>
          <TouchableOpacity
            style={email ? styles.btnstyle : styles.btnDisablestyle}
            onPress={customerOtpCall}
            disabled={!email}>
            <Text style={styles.btnTextStyle}>{t('verify')}</Text>
          </TouchableOpacity>
      </View>
      <Loader loading={reducerData.isLoading} />
    </SafeAreaView>
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
    marginTop: 10,
  },
});

export default Emailverification;
