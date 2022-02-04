import {
    CUSTOMEROTP_PROGRESS,
    FORGOTPIN_FAIL, FORGOTPIN_PROGRESS, FORGOTPIN_SUCCESS,
    VERIFYOTPFORGOTPASS_PROGRESS, VERIFYOTPFORGOTPASS_SUCCESS, VERIFYOTPFORGOTPASS_FAIL,
    KYCTYPE_PROGRESS, KYCTYPE_SUCCESS, KYCTYPE_FAIL,
    VERIFYKYC_PROGRESS, VERIFYKYC_SUCCESS, VERIFYKYC_FAIL,
    RESETPIN_PROGRESS, RESETPIN_SUCESS, RESETPIN_FAIL,

} from "./actionsConstant";

import RestUtil from '../../src/util/restUtils'
import { Platform } from 'react-native';
import Toast from 'react-native-simple-toast';
import { URL } from '../../src/constants/configure';
import forgotpasswordReducer from "../reducers/forgotpasswordReducer";

export function forgotpinOTP(number, navigation) {
    return (dispatch) => {
        const requestOptions = {

            method: 'POST',
            body: JSON.stringify({
                mobileNumber: number
            }),
        };
        dispatch(forgotPasswordDispatch({}, FORGOTPIN_PROGRESS))
        RestUtil(URL.FORGOT_PIN, requestOptions)
            .then((response) => response.json())
            .then((responseData) => {
               // console.log('Fetch API Response Forgot pin OTP---------->', responseData);
                if (responseData.msgKey === 'otpSentSuccess') {
                    Toast.show(responseData.message);
                    dispatch(forgotPasswordDispatch({
                        number,
                        refrencecode: responseData.referenceCode,
                        customerId: responseData.customerId
                    }, FORGOTPIN_SUCCESS))
                    navigation.navigate('ForgotPasswordOTP')
                } else {
                    Toast.show(responseData.message)
                    dispatch(forgotPasswordDispatch(responseData, FORGOTPIN_FAIL))
                }
            })
            .catch((error) => {
                console, log("forgotpinRequest-", error);
                dispatch(forgotPasswordDispatch(error, FORGOTPIN_FAIL))
            });
    }
};
export function verifyOTPForgotPassword(number, refCodeForMobile, otp, navigation) {
    console.log(number, refCodeForMobile, otp)
    return async (dispatch) => {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                mobileNumber: number,
                otp: otp,
                referenceCode: refCodeForMobile,
            }),
        };

        dispatch(forgotPasswordDispatch({}, VERIFYOTPFORGOTPASS_PROGRESS))

        RestUtil(URL.VERIFY_OTP, requestOptions)
            .then((response) => response.json())
            .then(async (responseData) => {
               // console.log('FetchAPIResponse Verify OTP---------->', responseData);

                if (responseData.msgKey === 'success') {
                    Toast.show(responseData.message);
                    responseData.otp = otp;
                    dispatch(forgotPasswordDispatch(responseData, VERIFYOTPFORGOTPASS_SUCCESS))
                    navigation.navigate('KYCVerification');
                } else {
                    Toast.show(responseData.message);
                    dispatch(forgotPasswordDispatch(responseData, VERIFYOTPFORGOTPASS_FAIL))
                }
            })
            .catch((error) => {

                console.log("error", error);
                dispatch(forgotPasswordDispatch(error, VERIFYOTPFORGOTPASS_FAIL))
            });
    }
};
export function kycType(number, navigation) {
    return async (dispatch) => {
        const URLKYC = URL.KYC_TYPE + number
      //  console.log("=====", URLKYC)
        RestUtil(URLKYC, {})
            .then((response) => response.json())
            .then(async (responseData) => {
                dispatch(forgotPasswordDispatch({
                    identityType: responseData.data,
                }, KYCTYPE_SUCCESS))
            }).catch((error) => {
                console.log("error", error);
                dispatch(forgotPasswordDispatch(error, KYCTYPE_FAIL))
            });


    }
};

export function verifyKYC(number, kycnum, navigation) {
    return async (dispatch) => {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                kycNumber: kycnum,
                mobileNumber: number,
            }),
        };
        dispatch(forgotPasswordDispatch({}, VERIFYKYC_PROGRESS))
        RestUtil(URL.VERIFY_KYC, requestOptions)
            .then((response) => response.json())
            .then((responseData) => {
               // console.log("FETCHAPI REsponse VerifyKYC------->", responseData)
                if (responseData.msgKey === 'success') {
                    dispatch(forgotPasswordDispatch(responseData, VERIFYKYC_SUCCESS))
                    navigation.navigate('ResetPassword')
                } else {
                    Toast.show(responseData.message)
                    dispatch(forgotPasswordDispatch(responseData, VERIFYKYC_FAIL))
                }

            }).catch((error) => {
                console.log("error", error);
                dispatch(forgotPasswordDispatch(error, VERIFYKYC_FAIL))
            });

    }
};

export function resetMpin(confirmpin, mpin, custId, number, otp, refrence, navigation) {
    return async (dispatch) => {
        const requestOptions = {
            method: 'PUT',
            body: JSON.stringify({
                confirmNewMpin: confirmpin,
                customerId:custId,
                emailId: "",
                mobileNumber: number,
                mobileOtp: otp,
                mobileReferenceCode: refrence,
                newMpin: mpin,
                oldMpin: "",
                otp: ""
            }),
        };
       // console.log("parameters for reset pass---------->",confirmpin,custId,number,otp,refrence,mpin)
        dispatch(forgotPasswordDispatch({},RESETPIN_PROGRESS))
        RestUtil(URL.RESET_PASS,requestOptions)
        .then((response)=>response.json())
        .then((responseData)=>{

            //console.log("FETCH API RESET PIN RESPONSE---------->",responseData)
            if(responseData.msgKey==='passwordUpdateSuccess')
            {
                Toast.show(responseData.message)
                dispatch(forgotPasswordDispatch(responseData, RESETPIN_SUCESS))
                navigation.navigate('Successfullupdate')
            }else{
                Toast.show(responseData.message)
                dispatch(forgotPasswordDispatch(responseData,RESETPIN_FAIL))
            }
        }).catch((error) => {
            console.log("error", error);
            dispatch(forgotPasswordDispatch(error, RESETPIN_FAIL))
        });
    }
};

export const forgotPasswordDispatch = (data, actionType) => {
    return {
        payload: data,
        type: actionType
    }
}