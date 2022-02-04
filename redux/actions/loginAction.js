import {
    LOGIN_PROGRESS, LOGIN_SUCCESS, LOGIN_FAIL,
    USERCHECK_PROGRESS, USERCHECK_SUCCESS, USERCHECK_FAIL
} from '../actions/actionsConstant'
import RestUtil from '../../src/util/restUtils'
import { Platform } from 'react-native';
import Toast from 'react-native-simple-toast';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../../src/constants/configure';


export function loginRequest(enteredCustomerId, enteredMpin, navigation) {
   // console.log('loginRequest', enteredCustomerId + enteredMpin)
    return async (dispatch) => {

        dispatch(loginDispatch({ isLoading: true }, LOGIN_PROGRESS))

        var bodyData = JSON.stringify({
            customerId: enteredCustomerId,
            mpin: enteredMpin,
            osType: Platform.OS,
        });

        RestUtil(URL.LOGIN, { method: "POST", body: bodyData, useAuthorization: false })
            .then((response) => response.json())
            .then(async (responseData) => {
               // console.log("loginRequestResponse", responseData)
                Toast.show(responseData.message);

                if (responseData.msgKey === "loginSuccess") {
                    await AsyncStorage.setItem('token', responseData.token);
                    dispatch(loginDispatch(responseData, LOGIN_SUCCESS))
                    navigation.navigate("Buy")
                } else {
                    dispatch(loginDispatch(responseData, LOGIN_FAIL))
                }
            })
            .catch((error) => {
                console.log('loginRequestError  ', error);
                dispatch(loginDispatch(error, LOGIN_FAIL))
            });
    }
}

export function checkUser(enteredCustomerId, enteredMpin) {
    return (dispatch) => {
        var response = {
            isPasswordBox: true,
            validIdLength: enteredCustomerId.length,
        }

        dispatch(loginDispatch({}, USERCHECK_PROGRESS))

        var bodyData = JSON.stringify({
            customerId: enteredCustomerId,
            mpin: enteredMpin,
            osType: Platform.OS
        })

        RestUtil(URL.CHECKUSER, { method: "POST", body: bodyData, useAuthorization: false })
            .then((response) => response.json())
            .then((responseData) => {
                //console.log("checkUserResponse", responseData)

                if (responseData.msgKey === "success") {
                    dispatch(loginDispatch(response, USERCHECK_SUCCESS))
                } else {
                    Toast.show(responseData.message);
                    dispatch(loginDispatch(responseData, USERCHECK_FAIL))
                }
            })
            .catch((error) => {
                console.log('checkUserError  ', error);
                dispatch(loginDispatch(error, USERCHECK_FAIL))
            });
    }
}

loginDispatch = (data, actionType) => {
    return {
        payload: data,
        type: actionType
    }
}