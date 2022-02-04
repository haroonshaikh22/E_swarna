import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Modal from "react-native-modal";
import { COLORS, IMAGES, FONTS, GLOBALSTYLES } from '../../constants/theme';
import { Checkbox } from 'react-native-paper';
import { Loader } from '../../common/loader';
import { useTranslation } from 'react-i18next';

import { verifyRefe, createCustomer } from '../../../redux/actions/registrationAction';
import { URL } from '../../constants/configure';

const Referral = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const reducerData = useSelector(state => state.registrationReducer);
  const { t } = useTranslation("common");

  //console.log('ReferralReducerData===============>>>>>>', reducerData.NomineeData);

  const [referralModal, setReferralModal] = useState(false);
  const [refral, setRefral] = useState('No Referrals');
  const [refralCode, setRefralCode] = useState(0);
  const [checked, setChecked] = useState(false);
  const [editable, setEditable] = useState(false);

  const handleRefral = (refername) => {
    setRefral(refername)
    setReferralModal(false)

    if (refername === "No Referrals") {
      setEditable(false)
    } else {
      setEditable(true)
    }
  }

  const verifyRefeCall = () => {
    dispatch(verifyRefe(refral, refralCode));
  }

  const submitCall = () => {
    let bodyData = {
      address: reducerData.KycData.address,
      alternatMobileNo: reducerData.OtherData.altetnateMobile,
      cityId: reducerData.KycData.cityId,
      companyId: reducerData.OtherData.companyId,
      dob: reducerData.KycData.birthdate,
      email: reducerData.OtherData.email,
      gender: reducerData.OtherData.gender,
      gstCheck: false,
      gstNumber: null,
      idNumber: reducerData.KycData.idEntitynum,
      identityTypeId: reducerData.KycData.idTypeNo,
      isEmailVerified: reducerData.OtherData.isEmailVerified,
      isMpgEmployee: reducerData.OtherData.isMpgEmployee,
      isRefferalCode: reducerData.isRefferalCode,
      languageId: 1,
      mobileNumber: reducerData.OtherData.mobile,
      mobileOtpNo: reducerData.OtherData.mobileOTP,
      otpNo: reducerData.OtherData.emailOTP,
      name: reducerData.KycData.custName,
      nomineeContactNumber: reducerData.NomineeData.nomineeMobileno,
      stateId: reducerData.KycData.stateId,
      userUniqueId: reducerData.OtherData.userUniqueCode,
      nomineeName: reducerData.NomineeData.nomineeName,
      nomineeRelation: reducerData.NomineeData.nomineeRelation,
      pincode: reducerData.KycData.pincode,
      referralCodeReceivedFrom: refral,
      referrerID: refralCode,
      panNumber: "",
      customerReferralCode: "",
    };

    //validation
    if (reducerData.KycData.kycvalid) {
      if (reducerData.OtherData.otherDetailValid) {
        if (reducerData.NomineeData.nomineeDetailsValid) {
          console.log("submitCall", bodyData);
          dispatch(createCustomer(bodyData, navigation));
        } else {
          navigation.navigate(t('nomineeDetails'))
        }
      } else {
        navigation.navigate(t('otherDetails'));
      }
    } else {
      navigation.navigate(t('kycDetails'));

    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ backgroundColor: "#fff" }}
    >
      <TouchableOpacity
        style={styles.textInputView}
        onPress={() => setReferralModal(true)}>
        <Text style={styles.textStyle}>Referral Code Received from</Text>
        <Text style={styles.textview}>{refral}</Text>
      </TouchableOpacity>

      <View style={styles.textInputView}>
        <Text style={styles.textStyle}>{t('referralCode')}</Text>
        <TextInput
          style={styles.textinput}
          placeholder={t('referralCode')}
          onChangeText={(value) => { setRefralCode(value) }}
          editable={editable}
        />
      </View>

      <View style={styles.bottomStyle}>
        <TouchableOpacity
          style={reducerData.isRefferalCode ? [styles.btnstyle, { backgroundColor: COLORS.Green }] : styles.btnstyle}
          onPress={() => verifyRefeCall()}
          disabled={reducerData.isRefferalCode}
        >
          <Text style={styles.btnTextStyle}>{reducerData.isRefferalCode ? (t('verified')) : (t('verify'))}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.textInputView}>
        <Text style={styles.textStyle}> {t('referrerEmployeeId')}</Text>
        <TextInput
          style={styles.textinput}
          value={reducerData.referrerUniqueId}
          placeholder= {t('referrerEmployeeId')}
          editable={false}
        />
      </View>

      <Modal
        isVisible={referralModal}
        onBackButtonPress={() => { setReferralModal(false) }}
        swipeDirection="down"
        onSwipeComplete={(t) => { setReferralModal(false); }}
        deviceWidth={1}
        deviceHeight={1}
      >
        <View style={styles.centeredView}>
          <View style={styles.closeButton}>
            <TouchableOpacity
              onPress={() => setReferralModal(false)}>
              <Text style={{ color: '#fff' }}>X</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalView}>
            <Text style={styles.modalText}>Code Received From</Text>

            <TouchableOpacity
              style={styles.modalTextView}
              onPress={() => handleRefral('Existing Customer')}>
              <Text>Existing Customer</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalTextView}
              onPress={() => handleRefral('MPG Employee')}>
              <Text>MPG Employee</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalTextView}
              onPress={() => handleRefral('Branch')}>
              <Text>Branch</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalTextView}
              onPress={() => handleRefral('No Referrals')}>
              <Text>No Referrals</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      <View style={{ padding: 10, margin: 2, flexDirection: 'row' }}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => setChecked(!checked)}
          color={COLORS.pureblue} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ padding: 2, color: COLORS.black, marginTop: "1%" }}>I have read and understood the</Text>
          <Text style={{ padding: 2, color: COLORS.pureblue, marginTop: "1%" }}
            onPress={() => navigation.navigate('TermsCondition', { title: (t('termsNConditions')), url: URL.TERMSANDCONDITION })}> T&C</Text>
        </View>
      </View>

      <View style={styles.bottomStyle}>
        <TouchableOpacity
          style={styles.btnstyle}
          onPress={() => submitCall()}>
          <Text style={styles.btnTextStyle}>{t('submit')}</Text>
        </TouchableOpacity>
      </View>
      <Loader loading={reducerData.isLoading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'flex-start',
    borderWidth: 1,
    borderColor: 'red',
  },
  modalText: {
    margin: 2,
    fontSize: 16,
    color: COLORS.black,
    textAlign: "justify"
  },
  modalView: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
    height: '70%',
    backgroundColor: 'white',
    overflow: 'hidden',
    marginTop: '5%',
    marginBottom: 0,
    backgroundColor: 'white',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    padding: 35,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: '65%',
    paddingRight: 25,
    alignSelf: "flex-end"
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    bottom: 0,
    alignItems: 'center',
    //   marginTop:22,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  textInputView: {
    // flex:1,
    borderWidth: 1,
    borderColor: COLORS.pureblue,
    borderRadius: 10,
    marginVertical: 12,
    marginHorizontal: 20,
    padding: 7,
    // width: Dimensions.get('screen').width - 40,
  },
  modalTextView: {
    borderWidth: 1,
    borderColor: COLORS.pureblue,
    borderRadius: 10,
    marginVertical: 8,
    marginTop: 2,
    padding: 18,
    textAlign: 'center',
    textDecorationColor: 'black',
    width: Dimensions.get('screen').width - 40,
  },
  textStyle: {
    paddingTop: 4,
    ...FONTS.appFontSemiBold,
    marginStart: 5,
    fontWeight: 'bold',
  },
  textinput: {
    paddingVertical: 15,
    marginStart: 15,
  },
  bottomStyle: {
    marginBottom: 10,
    marginHorizontal: 20,
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
    textTransform: 'uppercase'
  },
  textview: {
    margin: 1,
    marginStart: 0,
    padding: 15
  },
});

export default Referral;
