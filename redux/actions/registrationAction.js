
import {
    CUSTOMEROTP_PROGRESS, CUSTOMEROTP_SUCCESS, CUSTOMEROTP_FAIL,
    VERIFYOTP_PROGRESS, VERIFYOTP_SUCCESS, VERIFYOTP_FAIL,
    GETPROOFLIST_PROGRESS, GETPROOFLIST_SUCCESS, GETPROOFLIST_FAIL,
    GETSTATELIST_PROGRESS, GETSTATELIST_SUCCESS, GETSTATELIST_FAIL,
    GETCITYLIST_PROGRESS, GETCITYLIST_SUCCESS, GETCITYLIST_FAIL,
    VERIFYEMAILOTP_PROGRESS, VERIFYEMAILOTP_SUCCESS, VERIFYEMAILOTP_FAIL,
    GETCOMPANYLIST_PROGRESS, GETCOMPANYLIST_SUCCESS, GETCOMPANYLIST_FAIL,
    GETOTPFOREMAIL_PROGRESS, GETOTPFOREMAIL_SUCCESS, GETOTPFOREMAIL_FAIL,
    GETRELEATIONLIST_PROGRESS, GETRELEATIONLIST_SUCCESS, GETRELEATIONLIST_FAIL,
    VERIFYREF_PROGRESS, VERIFYREF_SUCCESS, VERIFYREF_FAIL,
    CREATECUSTOMER_PROGRESS, CREATECUSTOMER_SUCCESS, CREATECUSTOMER_FAIL,
    SETPIN_PROGRESS, SETPIN_SUCCESS, SETPIN_FAIL
} from "../actions/actionsConstant";

import { URL } from '../../src/constants/configure';
import Toast from 'react-native-simple-toast';
import RestUtil from "../../src/util/restUtils";

export function customerOtp(number, navigation) {
    return (dispatch) => {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                mobileNumber: number
            }),
        };

        dispatch(registerDispatch({}, CUSTOMEROTP_PROGRESS))

        RestUtil(URL.SEND_OTP, requestOptions)
            .then((response) => response.json())
            .then((responseData) => {
                // console.log('Fetch API Response', responseData);
                if (responseData.msgKey === 'otpSentSuccess') {
                    Toast.show(responseData.message);
                    dispatch(registerDispatch({
                        number,
                       responseData
                    }, CUSTOMEROTP_SUCCESS)) 
                    navigation.navigate("InputOtp")
                } else {
                    Toast.show(responseData.message);
                    dispatch(registerDispatch(responseData, CUSTOMEROTP_FAIL))
                }
            })
            .catch((error) => {
                console.log('loginRequestError  ', error);
                dispatch(registerDispatch(error, CUSTOMEROTP_FAIL))
            });
    }
};

export function verifyOTP(number, refCodeForMobile, otp, navigation) {
    return async (dispatch) => {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                mobileNumber: number,
                otp: otp,
                referenceCode: refCodeForMobile,
            }),
        };


        dispatch(registerDispatch({}, VERIFYOTP_PROGRESS))

        RestUtil(URL.VERIFY_OTP, requestOptions)
            .then((response) => response.json())
            .then(async (responseData) => {
                console.log('FetchAPIResponse', responseData);

                if (responseData.msgKey === 'success') {
                    Toast.show(responseData.message);
                    responseData.otp = otp;
                    dispatch(registerDispatch(responseData, VERIFYOTP_SUCCESS))
                    if (responseData.customerId != false) {
                        navigation.navigate('ExistingCustomer')
                    } else {
                        navigation.navigate('SliderDetails');
                    }
                } else {
                    Toast.show(responseData.message);
                    dispatch(registerDispatch(responseData, VERIFYOTP_FAIL))
                }
            }).catch((error) => {
                console.log("error", error);
                dispatch(registerDispatch(error, VERIFYOTP_FAIL))
            });
    }
};

export function getIDProofList() {
    return (dispatch) => {
        RestUtil(URL.IDENTITY_TYPE, {})
            .then((response) => response.json())
            .then(async (responseData) => {
                // console.log('getIDProofList', responseData);
                dispatch(registerDispatch(responseData.data, GETPROOFLIST_SUCCESS))
            }).catch((error) => {
                console.log("error", error);
                dispatch(registerDispatch(error, GETPROOFLIST_FAIL))
            });
    }
}

export function getStateList() {
    return (dispatch) => {
        RestUtil(URL.STATE, {})
            .then((response) => response.json())
            .then(async (responseData) => {
                // console.log('getStateList', responseData);
                dispatch(registerDispatch(responseData.data, GETSTATELIST_SUCCESS))
            }).catch((error) => {
                console.log("error", error);
                dispatch(registerDispatch(error, GETSTATELIST_FAIL))
            });
    }
}

export function getCityList(stateId) {
    return (dispatch) => {
        let url = URL.CITY + "?stateId=" + stateId;
        RestUtil(url, {})
            .then((response) => response.json())
            .then(async (responseData) => {
                // console.log('getCityList', responseData);
                dispatch(registerDispatch(responseData.data, GETCITYLIST_SUCCESS))
            }).catch((error) => {
                console.log("error", error);
                dispatch(registerDispatch(error, GETCITYLIST_FAIL))
            });
    }
}

export function verifyEmailOTP(otp, refCodeForEmail, navigation, flag) {
    return (dispatch) => {
        dispatch(registerDispatch({}, VERIFYEMAILOTP_PROGRESS))
        let requestOptions = {
            method: "POST",
            body: JSON.stringify({
                otp: otp,
                referenceCode: refCodeForEmail
            })
        }

        RestUtil(URL.VERIFY_EMAIL_OTP, requestOptions)
            .then((response) => response.json())
            .then((responseData) => {
                console.log('VerifyOTPCall', responseData);
                Toast.show(responseData.message);
                if (responseData.msgKey === 'success') {
                    dispatch(registerDispatch({ emailOtp: otp }, VERIFYEMAILOTP_SUCCESS))
                } else {
                    dispatch(registerDispatch(error, VERIFYEMAILOTP_FAIL))
                }
                if (flag === 1) {
                    navigation.navigate("Login");
                } else {
                    navigation.goBack();
                }
            }).catch((error) => {
                console.log("error", error);
                dispatch(registerDispatch(error, VERIFYEMAILOTP_FAIL))

            });
    }
};

export function getCompanyList() {
    return (dispatch) => {
        RestUtil(URL.COMPANY, {})
            .then((response) => response.json())
            .then((responseData) => {
                // console.log('getCompanyeList', responseData);
                dispatch(registerDispatch(responseData.data, GETCOMPANYLIST_SUCCESS))
            }).catch((error) => {
                console.log("error", error);
                dispatch(registerDispatch(error, GETCOMPANYLIST_FAIL))
            });
    }
}

export function getOTPForEmail(email, navigation, flag, t) {
    return (dispatch) => {
        dispatch(registerDispatch({}, GETOTPFOREMAIL_PROGRESS))

        let requestOptions = {
            method: "POST",
            body: JSON.stringify({ "email": email })
        }

        RestUtil(URL.SEND_EMAIL_OTP, requestOptions)
            .then((response) => response.json())
            .then((responseData) => {
                console.log("responseDataEmailOtp :", responseData);
                if (responseData.msgKey === "otpSentSuccessEmail") {
                    let passData = {
                        email: email,
                        refCodeForEmail: responseData.referenceCode,
                        flag: flag
                    }
                    var tempEmail = email;
                    let emailLength = tempEmail.indexOf("@")
                    for (let i = 0; i < emailLength; i++) {
                        tempEmail = tempEmail.replace(tempEmail[i], "*");
                    }

                    Toast.show(t("optHasbeenSentOnYourRegisteresEmailID", { 0: tempEmail }))
                    dispatch(registerDispatch(passData, GETOTPFOREMAIL_SUCCESS))
                    navigation.navigate('EmailOtp', passData);
                } else {
                    Toast.show(responseData.message);
                    dispatch(registerDispatch(responseData, GETOTPFOREMAIL_FAIL))

                }
            }).catch((error) => {
                console.log("Error", error);
                dispatch(registerDispatch(error, GETOTPFOREMAIL_FAIL))

            })
    }
}

export function getRelationList() {
    return (dispatch) => {
        RestUtil(URL.NOMINEE_RELATION, {})
            .then((response) => response.json())
            .then((responseData) => {
                // console.log('getRelationList', responseData);
                dispatch(registerDispatch(responseData.data, GETRELEATIONLIST_SUCCESS))
            }).catch((error) => {
                console.log("error", error);
                dispatch(registerDispatch(error, GETRELEATIONLIST_FAIL))
            });
    }
}

export function verifyRefe(refral, refralCode) {
    return (dispatch) => {
        dispatch(registerDispatch({}, VERIFYREF_PROGRESS))

        let requestOption = {
            method: 'POST',
            body: JSON.stringify({
                referralCodeReceivedFrom: refral,
                customerReferralCode: refralCode,
                //For Testing
                // customerReferralCode: "rLZ6Qy"
            }),
        };

        RestUtil(URL.VERIFY_REFERRAL, requestOption)
            .then((response) => response.json())
            .then((responseData) => {
                // console.log("verifyRefe", responseData)
                Toast.show(responseData.message);
                dispatch(registerDispatch(responseData.data, VERIFYREF_SUCCESS))
            }).catch((error) => {
                console.log("error", error)
                dispatch(registerDispatch(error, VERIFYREF_FAIL))
            });
    }
}

export function createCustomer(bodyData, navigation) {
    return (dispatch) => {

        dispatch(registerDispatch({}, CREATECUSTOMER_PROGRESS))
        let requestOption = {
            method: 'POST',
            body: JSON.stringify(bodyData)
        }
        RestUtil(URL.CREATE_CUSTOMER, requestOption)
            .then((response) => response.json())
            .then((responseData) => {
                console.log("responseData for create user", responseData)
                Toast.show(responseData.message);
                dispatch(registerDispatch(responseData, CREATECUSTOMER_SUCCESS))
                navigation.navigate("SetPassword")

            }).catch((error) => {
                console.log("error", error)
                dispatch(registerDispatch(error, CREATECUSTOMER_FAIL))

            });
    }
}
export function setPin(bodyData, navigation) {
    return (dispatch) => {
        dispatch(registerDispatch({}, SETPIN_PROGRESS))
        let requestOption = {
            method: 'PUT',
            body: JSON.stringify(bodyData)
        }
        console.log("Body data============================>>>", bodyData)
        RestUtil(URL.SET_MPIN, requestOption)
            .then((response) => response.json())
            .then((responseData) => {
                console.log("responseSendMpin :", responseData);
                if (responseData.msgKey === "passwordUpdateSuccess") {
                    Toast.show(responseData.message);
                    dispatch(registerDispatch(responseData, SETPIN_SUCCESS))
                    navigation.navigate('Login')
                } else {
                    Toast.show(responseData.message);
                    dispatch(registerDispatch(responseData, SETPIN_FAIL))

                }
            }).catch((error) => {
                console.log("Error", error);
                dispatch(registerDispatch(error, SETPIN_FAIL))
            });

    } 
}

export function saveData(data, action) {
    return (dispatch) => { dispatch(registerDispatch(data, action)) }
}

registerDispatch = (data, actionType) => {
    return {
        payload: data,
        type: actionType
    }
}
