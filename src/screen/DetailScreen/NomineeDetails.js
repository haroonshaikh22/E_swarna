import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
  FlatList,
  TouchableOpacity, KeyboardAvoidingView,
} from 'react-native';
import { COLORS, IMAGES, FONTS, GLOBALSTYLES } from '../../constants/theme';
import Modal from "react-native-modal";
import { getRelationList, saveData } from '../../../redux/actions/registrationAction';
import { SAVENOMINEEDATA_SUCCESS } from '../../../redux/actions/actionsConstant';
import { SearchBar } from 'react-native-elements';
import Validate from '../../util/validate';
import { useTranslation } from 'react-i18next';


const NomineeDetails = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const reducerData = useSelector(state => state.registrationReducer);
  const { t } = useTranslation("common");
 // console.log("Mobile Number----------------?>", reducerData.number)

  const [nomineeModal, setNomineeModal] = useState(false);
  const [relation, setRelation] = useState(t('selectRelation'));
  const [nominee, setNominee] = useState([])

  const [nomineeName, setNomineeName] = useState();
  const [contactno, setContactNo] = useState();

  const [btndisble, setBtndisable] = useState(true)
  const [mobileflag, setMobileFlag] = useState(true);
  const [nomineeDetailsValid, setNomineeDetailsValid] = useState(false);

  const [search, setSearch] = useState('');
  const [relationList, setRelatonList] = useState([]);
  const [relationFilterList, setRelationFilterList] = useState([]);

  useEffect(() => {
    getRelationCall()
    if ((relation !==( t('selectRelation'))) && (nomineeName !== "") & (contactno !== '')) {
      setBtndisable(false)
      setNomineeDetailsValid(true)
    } else {
      setBtndisable(true)
      setNomineeDetailsValid(false)
    }
  }, [contactno]);

  async function getRelationCall() {
    dispatch(getRelationList())
  }

  const handleRelation = (relationnm) => {
    setRelation(relationnm);
    setNomineeModal(false)
  }

  const handlename = (data) => {
    setNomineeName(data)
  }

  const handlecontact = (data) => {
    setContactNo(data)

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

  const handleNavigation = () => {
    var Nonineedata = {
      nomineeRelation: relation,
      nomineeName: nomineeName,
      nomineeMobileno: contactno,
      nomineeDetailsValid:nomineeDetailsValid
    }

    dispatch(saveData(Nonineedata, SAVENOMINEEDATA_SUCCESS));
    navigation.navigate(t('referral'))
  }

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = relationFilterList.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setRelatonList(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setRelatonList(relationFilterList);
      setSearch(text);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ backgroundColor: "#fff" }}
    >
      <View style={styles.textInputView}>
        <Text style={styles.textStyle}>
          {t('nomineeName')}
          <Text style={{ color: 'red' }}> *</Text>
        </Text>
        <TextInput style={styles.textinput}
          value={nomineeName}
          placeholder={t('nomineeName')}
          onChangeText={(data) => handlename(data)}
        />
      </View>

      <TouchableOpacity
        style={styles.textInputView}
        onPress={() => {
          setRelatonList(reducerData.nomineeList)
          setRelationFilterList(reducerData.nomineeList)
          setNomineeModal(true)
        }}>
        <Text style={styles.textStyle}>
        {t('nomineeRelationToCcustomer')}
          <Text style={{ color: 'red' }}> *</Text>
        </Text>
        <Text style={styles.textview}>{relation}</Text>
      </TouchableOpacity>

      <View style={mobileflag ? styles.textInputView : styles.textInputAlert}>
        <Text style={styles.textStyle}>{t('nomineecontactNumber')}</Text>
        <TextInput style={styles.textinput}
          placeholder={t('enterMobileNumber')}
          value={contactno}
          keyboardType="number-pad"
          maxLength={10}
          onChangeText={(data) => handlecontact(data)}
        />
      </View>

      <View style={styles.bottomStyle}>
        <TouchableOpacity
          style={btndisble ? styles.btnDisablestyle : styles.btnstyle}
          onPress={() => handleNavigation()}
          disabled={btndisble}
        >
          <Text style={styles.btnTextStyle}>{t('next')}</Text>
        </TouchableOpacity>
      </View>


      {/* Nominee BottomSheet */}
      <Modal
        isVisible={nomineeModal}
        onBackButtonPress={() => { setNomineeModal(false) }}
        swipeDirection="down"
        onSwipeComplete={(t) => { setNomineeModal(false); }}
        deviceWidth={1}
        deviceHeight={1}
      >
        <View style={styles.centeredView}>
          <View style={styles.closeButton}>
            <TouchableOpacity
              onPress={() => setNomineeModal(false)}>
              <Text style={{ color: '#fff' }}>X</Text>
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-120}
            style={{ width: '100%', flex: 1 }}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{t('selectNominee')}</Text>
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
                data={relationList}
                renderItem={({ item, index }) => (
                  <View>
                    <TouchableOpacity
                      style={styles.modalTextView}
                      onPress={() => handleRelation(item.name)}
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
    </ScrollView>
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
    fontSize: 20,
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
  textInputAlert: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
    margin: 20,
    padding: 7,
    width: Dimensions.get('screen').width - 40,
  },
});
export default NomineeDetails;
