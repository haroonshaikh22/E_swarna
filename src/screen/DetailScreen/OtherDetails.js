import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
  FlatList, KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import Modal from "react-native-modal";
import { COLORS, IMAGES, FONTS, GLOBALSTYLES } from '../../constants/theme';
import { getCompanyList, getOTPForEmail, saveData } from '../../../redux/actions/registrationAction';
import { SAVEOTHERDATA_SUCCESS } from '../../../redux/actions/actionsConstant';
import Validate from '../../util/validate';
import { SearchBar } from 'react-native-elements';
import { useTranslation } from 'react-i18next';

const OtherDetails = ({ navigation, route }) => { 
  const dispatch = useDispatch();
  const reducerData = useSelector(state => state.registrationReducer);
  // console.log('OtherDetails', reducerData);
  const { t } = useTranslation("common");

  const [genderModal, setGenderModal] = useState(false);
  const [gender, setGender] = useState(t('selectGender'));
  const [mpegEmp, setMpegEmp] = useState(t('no'));
  const [comapny, setCompany] = useState(t('selectcompany'));
  const [compantId, setCompanyId] = useState();
  const [empcode, setEmpcode] = useState();
  const [MpgModal, setMpgModal] = useState(false);
  const [companyModal, setCompanyModal] = useState(false);

  const [email, setEmail] = useState();
  const [validFlag, setValidFlag] = useState(true)
  const [altetnateMobile, setAlternateMobile] = useState();

  const [mobileflag, setMobileFlag] = useState(true);
  const [otherDetailValid, setOtherDetailValid] = useState(false);

  const [btndisble, setBtndisable] = useState(true)
  const [search, setSearch] = useState('');
  const flag = 2;
  const [comapnyList, setComapnyList] = useState([]);
  const [companyFilterList, setCompanyFilterList] = useState([]);


  useEffect(() => {
    getCompanyCall();

    if ((gender !== 'Select Gender') && (email !== '' && validFlag) && (altetnateMobile !== '') && (mpegEmp !== '')
      && (comapny !== '') && (empcode !== '')) {
      setBtndisable(false)
      setOtherDetailValid(true)
    } else {
      setBtndisable(true)
      setOtherDetailValid(false)
    }
  }, [mpegEmp, altetnateMobile]);

  async function getCompanyCall() {
    dispatch(getCompanyList())
  }

  const handleGender = (gendernnm) => {
    setGender(gendernnm)
    setGenderModal(false)
  }

  const handleMpeg = (mpegnm) => {
    setMpegEmp(mpegnm)
    setMpgModal(false)
  }

  const handleCompany = (companynm, companyid) => {
    setCompany(companynm)
    setCompanyId(companyid)
    setCompanyModal(false)
  }

  const handlemail = (data) => {
    setEmail(data)
    if (Validate.validateField(data, "email")) {
     // console.log(" validate", data);
      setValidFlag(true);
    } else {
      setValidFlag(false);

    }
  }

  const handlealtMobile = (data) => {
    setAlternateMobile(data)
    if (Validate.validateField(data, "mobile")) {
      if (reducerData.number === data) {
        setMobileFlag(false)
      } else {
        setMobileFlag(true)
      }
    } else {
      setMobileFlag(false);
    }
  }

  const handleEmpcode = (data) => {
    setEmpcode(data)
  }

  const handlenavigation = () => {
    var ismpgemp = false
    if (mpegEmp === (t('yes'))) {
      ismpgemp = true
    }
    var Otherdata = {
      gender: gender,
      email: email,
      emailOTP: reducerData.emailOtp,
      isEmailVerified: reducerData.isEmailVerified,
      altetnateMobile: altetnateMobile,
      mobile: reducerData.number,
      mobileOTP: reducerData.verifyOtpResponse.otp,
      isMpgEmployee: ismpgemp,
      userUniqueCode: empcode,
      companyId: compantId,
      companyname: comapny,
      otherDetailValid:otherDetailValid
    }

    dispatch(saveData(Otherdata, SAVEOTHERDATA_SUCCESS));
    navigation.navigate(t('nomineeDetails'))
  }

  const navigateEmailOtp = () => {
    dispatch(getOTPForEmail(email, navigation, flag,t))
  }


  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = companyFilterList.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setComapnyList(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setComapnyList(companyFilterList);
      setSearch(text);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ backgroundColor: "#fff" }}
      showsVerticalScrollIndicator={false}>
      <TouchableOpacity
        style={styles.textInputView}
        onPress={() => setGenderModal(true)}>
        <Text style={styles.textStyle}>
          {t('gender')}
          <Text style={{ color: 'red' }}> *</Text>
        </Text>
        <Text style={styles.textview}>{gender}</Text>
      </TouchableOpacity>

      <View style={validFlag ? styles.textInputView : styles.textInputAlert}>
        <Text style={styles.textStyle}>
         {t('emailID')}
          <Text style={{ color: 'red' }}> *</Text>
        </Text>

        <TextInput style={styles.textinput}
          value={email}
          placeholder={t('enterEmailID')}
          onChangeText={(data) => handlemail(data)}
        />
      </View>


      <View style={styles.bottomStyle}>
        {
          <TouchableOpacity
            style={reducerData.isEmailVerified ? styles.greenbtnstyle : styles.btnstyle}
            disabled={reducerData.isEmailVerified}
            onPress={() => navigateEmailOtp()}
          >
            <Text style={styles.btnTextStyle}>{reducerData.isEmailVerified ? (t('verified')) : (t('verify'))}</Text>
          </TouchableOpacity>
        }
      </View>


      <View style={mobileflag ? styles.textInputView : styles.textInputAlert}>
        <Text style={styles.textStyle}>{t('alternatemobNumber')}</Text>
        <TextInput style={styles.textinput}
          placeholder="9988776655"
          keyboardType="number-pad"
          value={altetnateMobile}
          maxLength={10}
          onChangeText={(data) => handlealtMobile(data)}
        />
      </View>

      <View style={styles.textInputView}>
        <Text style={styles.textStyle}>
           {t('mobileNumber')}
          <Text style={{ color: 'red' }}> *</Text>
        </Text>
        <Text style={styles.textview}>{reducerData.number}</Text>
      </View>

      <View style={styles.bottomStyle}>
        {
          <TouchableOpacity
            style={styles.greenbtnstyle}
            disabled={true}
          >
            <Text style={styles.btnTextStyle}>{t('verified')}</Text>
          </TouchableOpacity>
        }
      </View>

      <TouchableOpacity
        style={styles.textInputView}
        onPress={() => setMpgModal(true)}>
        <Text style={styles.textStyle}>
          {t('areyouampgemployee')}<Text style={{ color: 'red' }}> *</Text>
        </Text>
        <Text style={styles.textview}>{mpegEmp}</Text>

      </TouchableOpacity>

      {
        mpegEmp === (t('yes')) ?
          <View style={styles.textInputView}>
            <Text style={styles.textStyle}>
             {t('empcode')}
              <Text style={{ color: 'red' }}> *</Text>
            </Text>
            <TextInput style={styles.textinput}
              placeholder={t('enterempcode')}
              value={empcode}
              onChangeText={(data) => handleEmpcode(data)}
            />
          </View>
          : null
      }

      {
        mpegEmp === (t('yes')) ?
          <TouchableOpacity
            style={styles.textInputView}
            onPress={() => {
              setComapnyList(reducerData.companyList)
              setCompanyFilterList(reducerData.companyList)
              setCompanyModal(true)
            }}>
            <Text style={styles.textStyle}>
              {t('companyname')}<Text style={{ color: 'red' }}> *</Text>
            </Text>
            <Text style={styles.textview}>{comapny}</Text>
          </TouchableOpacity>
          : null

      }
      <View style={styles.bottomStyle}>
        <TouchableOpacity
          style={btndisble ? styles.btnDisablestyle : styles.btnstyle}
          onPress={() => handlenavigation()}
          disabled={btndisble}
        >
          <Text style={styles.btnTextStyle}>{t('next')}</Text>
        </TouchableOpacity>
      </View>

      {/* Gender Modal Bottom sheet */}

      <Modal
        isVisible={genderModal}
        onBackButtonPress={() => { setGenderModal(false) }}
        swipeDirection="down"
        onSwipeComplete={(t) => { setGenderModal(false); }}

        deviceWidth={1}
        deviceHeight={1}
      >
        <View style={styles.centeredView}>
          <View style={styles.closeButton}>
            <TouchableOpacity
              onPress={() => setGenderModal(false)}>
              <Text style={{ color: '#fff' }}>X</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalView1}>
            <Text style={[styles.modalText, { paddingBottom: 10 }]}>{t('selectGender')}</Text>
            <TouchableOpacity
              style={[styles.modalTextView, { marginVertical: 10 }]}
              onPress={() => handleGender('Male')}>
              <Text>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalTextView, { marginVertical: 10 }]}
              onPress={() => handleGender('Female')}>
              <Text>Female</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalTextView, { marginVertical: 10 }]}
              onPress={() => handleGender('Other')}>
              <Text>Other</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* MPG Employee BottomSheet */}

      <Modal
        isVisible={MpgModal}
        onBackButtonPress={() => { setMpgModal(false) }}
        swipeDirection="down"
        onSwipeComplete={(t) => { setMpgModal(false); }}

        deviceWidth={1}
        deviceHeight={1}
      >
        <View style={styles.centeredView}>
          <View style={styles.closeButton}>
            <TouchableOpacity
              onPress={() => setMpgModal(false)}>
              <Text style={{ color: '#fff' }}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalView1}>
            <Text style={styles.modalText}> {t('areyouampgemployee')}</Text>
            <View style={{ paddingVertical: 5 }}>
              <TouchableOpacity
                style={styles.modalTextView}
                onPress={() => handleMpeg('Yes')}>
                <Text>{t('yes')}</Text>
              </TouchableOpacity>
            </View> 
            <TouchableOpacity
              style={styles.modalTextView}
              onPress={() => handleMpeg('No')}>
              <Text>{t('no')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Comapny Modal */}
      <Modal
        isVisible={companyModal}
        onBackButtonPress={() => { setCompanyModal(false) }}
        swipeDirection="down"
        onSwipeComplete={(t) => { setCompanyModal(false); }}

        deviceWidth={1}
        deviceHeight={1}
      >
        <View style={styles.centeredView}>
          <View style={styles.closeButton}>
            <TouchableOpacity
              onPress={() => setCompanyModal(false)}>
              <Text style={{ color: '#fff' }}>X</Text>
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-120}
            style={{ width: '100%', flex: 1 }}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{t('selectcompany')}</Text>
              <View style={{
                borderWidth: 1,
                borderColor: COLORS.pureblue, padding: 2, margin: 10,
                borderRadius: 10, width: Dimensions.get('screen').width - 80,
              }}>
                <SearchBar
                  round
                  searchIcon={{ size: 20 }}
                  onChangeText={(text) => searchFilterFunction(text)}
                  onClear={(text) => searchFilterFunction('')}
                  placeholder="Search Here..."
                  lightTheme
                  value={search}
                  containerStyle={{
                    backgroundColor: COLORS.white,
                  }}
                  inputContainerStyle={{ backgroundColor: COLORS.white, padding: 0, }}
                  inputStyle={{ fontSize: 14 }}
                />
              </View>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={comapnyList}
                renderItem={({ item, index }) => (
                  <View>
                    <TouchableOpacity
                      style={styles.modalTextView}
                      onPress={() => handleCompany(item.name, item.id)}
                    >
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>


    </ScrollView >
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'flex-start',
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
  modalView1: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    overflow: 'hidden',
    marginTop: '5%',
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
  modalText: {
    margin: 2,
    fontSize: 16,
    color: COLORS.black,
    textAlign: "justify"
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    bottom: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  textInputView: {
    borderWidth: 1,
    borderColor: COLORS.pureblue,
    borderRadius: 10,
    marginVertical: 12,
    marginHorizontal: 20,
    padding: 7,
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
    width: Dimensions.get('screen').width - 80,
  },
  textview: {
    margin: 1,
    marginStart: 0,
    padding: 15
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
    padding: 15,
  },
  greenbtnstyle: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: COLORS.Green,
    justifyContent: 'center',
    width: Dimensions.get('screen').width - 40,
    padding: 15,
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
  textInputAlert: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
    margin: 20,
    padding: 7,
    width: Dimensions.get('screen').width - 40,
  },
});

export default OtherDetails;
