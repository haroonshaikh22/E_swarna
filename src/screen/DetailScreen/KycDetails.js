import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Pressable,
  FlatList, Platform, KeyboardAvoidingView,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from "react-native-modal";
import { COLORS, IMAGES, FONTS, GLOBALSTYLES } from '../../constants/theme';
import Validate from '../../util/validate';
import { getIDProofList, getStateList, getCityList, saveData } from '../../../redux/actions/registrationAction';
import { SAVEKYCDATA_SUCCESS } from '../../../redux/actions/actionsConstant';
import { SearchBar } from 'react-native-elements';
import moment from 'moment';
import { useTranslation } from 'react-i18next';


const KycDetails = ({ navigation }) => {
  const [stateId, setStateId] = useState();
  const { t } = useTranslation("common");

  const [maxLengthforId, setMaxLengthforId] = useState();
  const [stateName, setStateName] = useState(t('selectState'));
  const [identityCard, setIdentityCard] = useState(t('selectIDProof'));
  const [identityTypeId, setIdentityTypeId] = useState();
  const [cityName, setCityName] = useState(t('selectCity'))
  const [cityId, setCityId] = useState();
  const [DOB, setDOB] = useState('MM/DD/yyyy');
  const [address, setAddress] = useState();
  const [pincode, setPincode] = useState();
  const [cname, setcname] = useState('')
  const [identitynumber, setIdentityNumber] = useState();
  const [identityHint, setIdentityHint] = useState('')

  const [modalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [stateModal, setStateModal] = useState(false);
  const [cityModal, setCityModal] = useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [btndisble, setBtndisable] = useState(true)
  const [validFlag, setValidFlag] = useState(true)
  const [validPin, setValidPin] = useState(true)
  const [kycvalid, setKYCValid] = useState(false)

  const textInput = useRef(null);
  const [search, setSearch] = useState('');

  const [statelist, setStateList] = useState([]);
  const [statefilterlist, setStateFilterList] = useState([]);

  const [cityList, setCityList] = useState([]);
  const [cityfilterlist, setCityfilterLIst] = useState([]);
  const [citySearch, setCitySearch] = useState('')

  const dispatch = useDispatch();
  const reducerData = useSelector(state => state.registrationReducer);
  // console.log('KycDetailsReducerData', reducerData);

  useEffect(() => {
    getUserCall();
    getStateListCall();
    if ((identityCard !== (t('selectIDProof'))) && (cname !== '') && (identitynumber !== '') && (DOB !== 'MM/DD/yyyy')
      && (address !== '') && (stateName !== (t('selectState'))) && (cityName !== (t('selectCity'))) && (pincode !== '')) {
      setBtndisable(false);
      setKYCValid(true);
    } else {
      setBtndisable(true);
      setKYCValid(false);
    }
  }, [pincode,]);

  const onChange = (event, selectedDate) => {
    console.log("selectedDate----------", selectedDate)

    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(selectedDate);
    let tempDate = new Date(currentDate);
    const NewDate = moment(tempDate).format('MM/DD/yyyy')
    console.log("date----------", NewDate)
    setDOB(NewDate)
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const handleIdentityCard = (name, id) => {
    setIdentityCard(name);
    setIdentityTypeId(id)
    setModalVisible(false)
    setIdentityNumber();
    if (id === 1) {
      setMaxLengthforId(14);
      setIdentityHint(t('aadhar'))
    }
    if (id === 2) {
      setMaxLengthforId(8);
      setIdentityHint(t('passportFormat'))
    }
    if (id === 4) {
      setMaxLengthforId(10);
      setIdentityHint(t('electionIdFormat'))
    }
    if (id === 3) {
      setMaxLengthforId(15);
      setIdentityHint(t('drivingLicenseFormat'))
    }
  }

  const handleState = (statenm, stateid) => {
    setStateName(statenm);
    setStateId(stateid)
    setStateModal(false)
    getCityListCall(stateid)
  }
  const handleCity = (citynm, cid) => {
    setCityName(citynm)
    setCityId(cid)
    setCityModal(false)
  }

  const getUserCall = () => {
    dispatch(getIDProofList());
  }

  const getStateListCall = () => {
    dispatch(getStateList());
  }

  const getCityListCall = (stateid) => {
    dispatch(getCityList(stateid));
  }

  const handlecustomername = (data) => {
    setcname(data)
  }

  const handleAddress = (data) => {
    setAddress(data)
  }

  const handlePin = (data) => {
    setPincode(data)
    if (Validate.validateField(data, "pincode")) {
      setValidPin(true)
    } else {
      setValidPin(false)
    }
  }

  const handleIdentitynumber = (data) => {
    switch (identityTypeId) {
      case 1: //Aadhar Card
        let tempData = data.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
        setIdentityNumber(tempData)

        if (Validate.validateField(tempData, "aadharCard")) {
          setValidFlag(true)
        } else {
          setValidFlag(false)
        }
        break
      case 2: //Passport

        setIdentityNumber(data)
        if (Validate.validateField(data, "passport")) {
          setValidFlag(true)
        } else {
          setValidFlag(false)
        }
        break
      case 3: //Driving License
        setIdentityNumber(data)
        if (Validate.validateField(data, "drivingLicense")) {
          setValidFlag(true)
        } else {
          setValidFlag(false)
        }

        break
      case 4: //Election Card
        setIdentityNumber(data)
        if (Validate.validateField(data, "votingId")) {
          setValidFlag(true)
        } else {
          setValidFlag(false)
        }
        break

    }
  }
  const openstateModal = () => {
    setStateList(reducerData.stateList)
    setStateFilterList(reducerData.stateList)
    setStateModal(true)

  }
  const searchFilterStateFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = statefilterlist.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setStateList(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setStateList(statefilterlist);
      setSearch(text);
    }
  };

  const searchFilterCityFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = cityfilterlist.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setCityList(newData);
      setCitySearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setCityList(cityfilterlist);
      setCitySearch(text);
    }
  };

  const handlenavigation = () => {
    var KYCdata = { 
      custName: cname,
      idTypeNo: identityTypeId,
      iCardname: identityCard,
      idEntitynum: identitynumber,
      birthdate: DOB,
      address: address,
      stateId: stateId,
      stateName: stateName,
      cityId: cityId,
      cityName: cityName,
      pincode: pincode,
      kycvalid:kycvalid,
    }

    dispatch(saveData(KYCdata, SAVEKYCDATA_SUCCESS));
    navigation.navigate(t('otherDetails'));

  }


  return (
    <ScrollView
      contentContainerStyle={{ backgroundColor: '#fff' }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.mainContainer}>
        <View style={styles.textInputView}>
          <Text style={styles.textStyle}>
           {t('nameOfTheCustomer')}
            <Text style={{ color: 'red' }}> *</Text>
          </Text>
          <TextInput style={styles.textinput}
            placeholder={t('enterName')}
            value={cname}
            onChangeText={(data) => handlecustomername(data)} />
        </View>

        <TouchableOpacity
          style={styles.textInputView}
          onPress={() =>
            setModalVisible(true)
          }
        >
          <Text style={styles.textStyle}>
           {t('identityProof')}
            <Text style={{ color: 'red' }}> *</Text>
          </Text>
          <Text style={styles.textview}>{identityCard}</Text>
        </TouchableOpacity>

        <View style={validFlag ? styles.textInputView : styles.textInputAlert}>
          <Text style={styles.textStyle}>
           {t('idNumber')}
            <Text style={{ color: 'red' }}> *</Text>
          </Text>
          <TextInput style={styles.textinput}
            placeholder={t('enterIDNumber')}
            value={identitynumber}
            maxLength={maxLengthforId}
            onChangeText={(data) => handleIdentitynumber(data)}
          />
        </View>
        <View style={{ padding: 5 }}>
          {identityCard !== (t('selectIDProof')) ? (
            <Text style={styles.hinttextStyle}>
              {identityHint}
            </Text>
          ) : null}
        </View>

        {Platform.OS == "android" ? <TouchableOpacity
          style={styles.textInputView}
          onPress={showDatepicker}
          title="Show date picker!">
          <Text style={styles.textStyle}>
            {t('dateofBirth')}
            <Text style={{ color: 'red' }}> *</Text>
          </Text>
          <Text style={styles.textview}>{DOB}</Text>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              maximumDate={new Date()}
              value={date}
              mode={mode}
              is24Hour={true}
              display="spinner"
              onChange={onChange}
            />
          )}
        </TouchableOpacity>
          :
          <TouchableOpacity
            style={styles.textInputView}
            onPress={() => {
              if (DOB == "MM/dd/yyyy") {
                setDate(new Date());
              }
              setDatePickerVisible(true)
            }}
            title="Show date picker!">
            <Text style={styles.textStyle}>
            {t('dateofBirth')}
              <Text style={{ color: 'red' }}> *</Text>
            </Text>
            <Text style={styles.textview}>{DOB}</Text>
          </TouchableOpacity>
        }
        <View style={styles.textInputView}>
          <Text style={[styles.textStyle, { paddingVertical: 10 }]}>{t('address')}</Text>
          <TextInput style={styles.textinput}
            placeholder={t('enterAddress')}
            multiline={true}
            value={address}
            underlineColorAndroid='transparent'
            onChangeText={(data) => handleAddress(data)} />
        </View>

        <TouchableOpacity
          style={styles.textInputView}
          onPress={() => openstateModal()}
        // setStateModal(true)}
        >
          <Text style={styles.textStyle}>
            State
            <Text style={{ color: 'red' }}> *</Text>
          </Text>
          <Text style={styles.textview}>{stateName}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.textInputView}
          onPress={() => {
            setCityList(reducerData.cityList)
            setCityfilterLIst(reducerData.cityList)
            if (stateName !== (t('selectState'))) {
              setCityModal(true);
            } else {
              Toast.show("Please select state first");
            }
          }}>
          <Text style={styles.textStyle}>
            City
            <Text style={{ color: 'red' }}> *</Text>
          </Text>
          <Text style={styles.textview}>{cityName}</Text>
        </TouchableOpacity>

        <View style={validPin ? styles.textInputView : styles.textInputAlert}>
          <Text style={styles.textStyle}>
            {t('pincode')}
            <Text style={{ color: 'red' }}> *</Text>
          </Text>
          <TextInput style={styles.textinput}
            placeholder={t('enterPincode')}
            maxLength={6}
            value={pincode}
            keyboardType="number-pad"
            onChangeText={(data) => handlePin(data)} />
        </View>

        <View style={styles.bottomStyle}>
          <TouchableOpacity
            style={btndisble ? styles.btnDisablestyle : styles.btnstyle}
            onPress={() => handlenavigation()}
            disabled={btndisble}
          >
            <Text style={styles.btnTextStyle}>{t('next')}</Text>
          </TouchableOpacity>
        </View>
      </View>


      {/* iOS Date Picker */}
      <Modal
        isVisible={isDatePickerVisible}
        onBackButtonPress={() => { setDatePickerVisible(false) }}
        swipeDirection="down"
        onSwipeComplete={(t) => { setDatePickerVisible(false); }}
        deviceWidth={1}
        deviceHeight={1}
      >
        <View style={styles.centeredView}>
          <View style={{
            flex: 1,
            width: '100%',
            overflow: 'hidden',
            marginTop: '65%',
            justifyContent: 'flex-end',
          }}>
            <View style={{
              flexDirection: "row",
              backgroundColor: "#f8faf9",
              justifyContent: "space-between",
              paddingVertical: 10,
              paddingHorizontal: 10
            }}>
              <TouchableOpacity
                onPress={() => {
                  setDOB("MM/dd/yyyy");
                  setDatePickerVisible(false)
                }}>
                <Text style={{ color: COLORS.pureblue }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setDatePickerVisible(false)}>
                <Text style={{ color: COLORS.pureblue }}>Done</Text>
              </TouchableOpacity>
            </View>

            <View style={{ width: "100%", backgroundColor: '#d5d8df' }}>
              <DateTimePicker
                style={{ zIndex: 1 }}
                testID="dateTimePicker"
                maximumDate={new Date()}
                value={date}
                mode={mode}
                is24Hour={true}
                display="spinner"
                onChange={onChange}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Id Prof Modal */}
      <Modal
        isVisible={modalVisible}
        onBackButtonPress={() => { setModalVisible(false) }}
        swipeDirection="down"
        onSwipeComplete={(t) => { setModalVisible(false); }}
        deviceWidth={1}
        deviceHeight={1}
      >
        <View style={styles.centeredView}>
          <View style={styles.closeButton}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}>
              <Text style={{ color: '#fff' }}>X</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalView}>
            <Text style={styles.modalText}>{t('selectIDProof')}</Text>
            <FlatList
              data={reducerData.idProofList}
              renderItem={({ item, index }) => (
                <View>
                  <TouchableOpacity
                    style={styles.modalTextView}
                    onPress={() => handleIdentityCard(item.name, item.id)}
                  >
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Select state Modal */}

      <Modal
        isVisible={stateModal}
        onBackButtonPress={() => { setStateModal(false) }}
        swipeDirection="down"
        onSwipeComplete={(t) => { setStateModal(false); }}
        deviceWidth={1}
        deviceHeight={1}
      >
        <View style={styles.centeredView}>
          <View style={styles.closeButton}>

            <TouchableOpacity
              onPress={() => setStateModal(false)}>
              <Text style={{ color: '#fff' }}>X</Text>
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-120}
            style={{ width: '100%', flex: 1 }}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{t('selectState')}</Text>
              <View style={{
                borderWidth: 1,
                borderColor: COLORS.pureblue, padding: 2, margin: 10,
                borderRadius: 10, width: Dimensions.get('screen').width - 80,
              }}>
                <SearchBar
                  round
                  searchIcon={{ size: 20 }}
                  onChangeText={(text) => searchFilterStateFunction(text)}
                  onClear={(text) => searchFilterStateFunction('')}
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
                data={statelist}
                renderItem={({ item, index }) => (
                  <View>
                    <TouchableOpacity
                      style={styles.modalTextView}
                      onPress={() => handleState(item.name, item.id)}
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

      {/* City Modal */}
      <Modal
        isVisible={cityModal}
        onBackButtonPress={() => { setCityModal(false) }}
        swipeDirection="down"
        onSwipeComplete={(t) => { setCityModal(false); }}
        deviceWidth={1}
        deviceHeight={1}
      >
        <View style={styles.centeredView}>
          <View style={styles.closeButton}>
            <TouchableOpacity
              onPress={() => setCityModal(false)}>
              <Text style={{ color: '#fff' }}>X</Text>
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-120}
            style={{ width: '100%', flex: 1 }}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{t('selectCity')}</Text>
              <View style={{
                borderWidth: 1,
                borderColor: COLORS.pureblue, padding: 2, margin: 10,
                borderRadius: 10, width: Dimensions.get('screen').width - 80,
              }}>
                <SearchBar
                  round
                  searchIcon={{ size: 20 }}
                  onChangeText={(text) => searchFilterCityFunction(text)}
                  onClear={(text) => searchFilterCityFunction('')}
                  placeholder="Search Here..."
                  lightTheme
                  value={citySearch}
                  containerStyle={{
                    backgroundColor: COLORS.white,
                  }}
                  inputContainerStyle={{ backgroundColor: COLORS.white, padding: 0, }}
                  inputStyle={{ fontSize: 14 }}
                />
              </View>

              <FlatList
                showsVerticalScrollIndicator={false}
                data={cityList}
                renderItem={({ item, index }) => (
                  <View>
                    <TouchableOpacity
                      style={styles.modalTextView}
                      onPress={() => handleCity(item.name, item.id)}
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
  modalText: {
    padding: 2,
    fontSize: 20,
    color: COLORS.black,
    textAlign: "justify"
  },
  modalView: {
    flex: 1,
    width: '100%',
    height: '70%',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    bottom: 0,
    padding: 0,
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
  textview: {
    margin: 1,
    marginStart: 0,
    padding: 15
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
  },
  hinttextStyle: {
    color: 'gray',
    ...FONTS.appFontRegular,
    alignSelf: 'center'
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

export default KycDetails;
