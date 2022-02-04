import {
    LANGUAGELIST_FAIL,
    LANGUAGELIST_PROGRESS, LANGUAGELIST_SUCCESS, LOGIN_FAIL,
    LANGUAGEJSON_PROGRESS, LANGUAGEJSON_SUCCESS, LANGUAGEJSON_FAIL
} from './actionsConstant';
import RestUtil from '../../src/util/restUtils'
import { Platform } from 'react-native';
import Toast from 'react-native-simple-toast';
import { URL } from '../../src/constants/configure';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function getLangaugeList() {
    return (dispatch) => {
        RestUtil(URL.LangauageList, {})
            .then((response) => response.json())
            .then((responseData) => {
                // console.log('Language List***************---------->', responseData);
                dispatch(languageDispatch(responseData.data, LANGUAGELIST_SUCCESS))
            }).catch((error) => {
                console.log(error)
                dispatch(languageDispatch(error, LANGUAGELIST_FAIL))
            });
    }
};

export function getLanguageJson(code) {
    return (dispatch) => {
        const URLLANG = URL.LangauageList + "/" + code;
        console.log("URL-------------", URLLANG);
        dispatch(languageDispatch({}, LANGUAGEJSON_PROGRESS))
    
        RestUtil(URLLANG, {})
            .then((response) => response.json())
            .then(async (responsData) => {
                // console.log("lanaguage JSon===================", responsData)
                dispatch(languageDispatch(responsData, LANGUAGEJSON_SUCCESS))
                await AsyncStorage.setItem(code, JSON.stringify(responsData))
            }).catch((error) => {
                console.log(error)
                dispatch(languageDispatch(error, LANGUAGEJSON_FAIL))
            })
    }

}

export const languageDispatch = (data, actionType) => {
    return {
        payload: data,
        type: actionType
    }
}