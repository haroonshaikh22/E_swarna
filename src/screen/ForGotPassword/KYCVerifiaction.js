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
import { FONTS, COLORS, IMAGES, GLOBALSTYLES } from '../../constants/theme';
import { verifyKYC } from '../../../redux/actions/forgotpasswordAction';
import EntypoIcon from 'react-native-vector-icons/dist/Entypo';
import AntDesignIcon from 'react-native-vector-icons/dist/AntDesign';

const KYCVerification = ({ navigation }) => {

  const dispatch = useDispatch();
  const [kycnumber, setKYCNumber] = useState('');

  const reducerData = useSelector(state => state.forgotpasswordReducer);
  console.log('KYCVerification', reducerData);

  const verifyKYCCall = () => {
    dispatch(verifyKYC(reducerData.number, kycnumber, navigation))
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
            <Text style={styles.headerText}>KYC Verification</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.textStyle}>Enter your {reducerData.identityCardName} last 4 character here</Text>
            <View style={styles.textInputView}>
              <TextInput
                placeholder="Enter Kyc ID"
                fontWeight='bold'
                ref={input => (textInput = input)}
                style={styles.textinput}
                returnKeyType="go"
                value={kycnumber}
                maxLength={4}
                secureTextEntry={false}
                onChangeText={(data) => setKYCNumber(data)}
              />
            </View>
          </View>
         

            <TouchableOpacity
              style={styles.btnstyle}
              onPress={verifyKYCCall}
            >
              <Text style={styles.btnTextStyle}>Submit</Text>
            </TouchableOpacity>
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
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 10,
    color: COLORS.pureblue,
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
    margin: 15,
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
  },
  btnstyle: {
    justifyContent: "center",
        borderRadius: 10,
        backgroundColor: COLORS.pureblue,
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

});

export default KYCVerification;