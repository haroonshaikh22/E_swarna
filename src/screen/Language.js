import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    FlatList
} from 'react-native';
import Modal from "react-native-modal";

import { useTranslation } from 'react-i18next';
import CustomNavigationBar from '../common/CustomNavigationBar';

import { COLORS, FONTS, } from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLangaugeList, getLanguageJson } from '../../redux/actions/languageAction';

import { Loader } from '../common/loader';


const Language = () => {
    const { t, i18n } = useTranslation();

    const [langModal, setLangModel] = useState(false);
    const [currentLang, setCurrentLang] = useState(t("selectLanguage"));
    const [currentIndex, setCurrentIndex] = useState(0);

    const dispatch = useDispatch();
    const reducerData = useSelector(state => state.languageReducer)

  //  console.log("LanguageT :", reducerData.languageList.length)

    useEffect(() => {
        getLangaugeListCall();
    }, [reducerData.languageList.length])

    const getLangaugeListCall = () => {
        dispatch(getLangaugeList())
        if (reducerData.languageList.length > 0) {
            var tempName;
            var tempIndex;
            for (let i = 0; i < reducerData.languageList.length; i++) {
                if (reducerData.languageList[i].code == i18n.language) {
                    tempName = reducerData.languageList[i].name
                    tempIndex = i
                }
            }
            setCurrentLang(tempName);
            setCurrentIndex(tempIndex);
            console.log("name ", tempName)
        }
    }

    const handleLanguage = async (name, langKey, id, index) => {
        // dispatch(getLanguageJson(langKey))
        setCurrentLang(name);
        setCurrentIndex(index)
        try {
            i18n.changeLanguage(langKey)
            await AsyncStorage.setItem('currentLangName', name);
            await AsyncStorage.setItem('currentLangId', id.toString());
        } catch (error) {
            console.log(` Errorrrr : ${error}`);
        }
        setLangModel(false);
        console.log("CurrentLange", name + ' , ' + id)
    }


    renderView = (item, index) => {
        return (
            <View key={index}>
                <TouchableOpacity
                    style={index == currentIndex ? [styles.modalTextView, { backgroundColor: COLORS.pureblue }] : styles.modalTextView}
                    onPress={() => handleLanguage(item.name, item.code, item.id, index)}>
                    <Text style={index == currentIndex ? { color: "#fff" } : { color: '#000' }}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.safeContainerStyle}>
            <CustomNavigationBar back />
            <View style={{ paddingVertical: 15, alignItems: "center" }}>
                <Text style={{ fontSize: 28, fontWeight: "bold" }}>{t("language")}</Text>
            </View>
            <TouchableOpacity
                style={styles.textInputView}
                onPress={() =>
                    setLangModel(true)
                }
            >
                <Text style={styles.textStyle}>
                    {t("selectLanguage")}
                    <Text style={{ color: 'red' }}> *</Text>
                </Text>
                <Text style={styles.textview}>{currentLang}</Text>
            </TouchableOpacity>

            <Modal
                isVisible={langModal}
                onBackButtonPress={() => { setLangModel(false) }}
                // swipeDirection="down"
                // onSwipeComplete={(t) => { setLangModel(false); }}
                deviceWidth={1}
            >
                <View style={styles.centeredView}>
                    <View style={styles.closeButton}>
                        <TouchableOpacity
                            onPress={() => setLangModel(false)}>
                            <Text style={{ color: '#fff' }}>X</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{t("selectLanguage")}</Text>
                        <FlatList
                            contentContainerStyle={{ paddingBottom: 25 }}
                            showsVerticalScrollIndicator={false}
                            data={reducerData.languageList}
                            renderItem={({ item, index }) => renderView(item, index)}
                        />

                    </View>
                </View>
            </Modal>

            <Loader loading={false} />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainerStyle: {
        flex: 1,
        backgroundColor: 'white',
    },
    textInputView: {
        borderWidth: 1,
        borderColor: COLORS.pureblue,
        borderRadius: 10,
        marginVertical: 12,
        marginHorizontal: 20,
        padding: 7,
    },
    textStyle: {
        ...FONTS.appFontSemiBold,
        marginStart: 2,
        marginVertical: 2
    },
    textview: {
        margin: 1,
        marginStart: 0,
        padding: 15
    },
    modalText: {
        paddingVertical: 25,
        fontSize: 20,
        color: COLORS.black,
        textAlign: "center"
    },
    modalView: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        alignItems: "center",
    },
    closeButton: {
        marginTop: '65%',
        paddingRight: 25,
        marginBottom: 15,
        alignSelf: "flex-end"
    },
    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
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

});

export default Language;
