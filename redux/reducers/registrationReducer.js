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
    SAVEKYCDATA_SUCCESS, SAVEOTHERDATA_SUCCESS,
    SAVENOMINEEDATA_SUCCESS, SAVEREFERRALDATA_SUCCESS,
    CREATECUSTOMER_PROGRESS, CREATECUSTOMER_SUCCESS, CREATECUSTOMER_FAIL,
    SETPIN_PROGRESS, SETPIN_SUCCESS, SETPIN_FAIL
} from "../actions/actionsConstant";

const initialState = {
    isLoading: false,
    number: 0,
    otp: 0,
    isEmailVerified: false,
    isMobileNumberVerified: false,
    isMpinVerified: false,
    isRefferalCode: false,
    refCodeForMobile: "",
    email: '',
    emailOtp: '',
    refCodeForEmail: "",
    idProofList: [],
    stateList: [],
    cityList: [],
    companyList: [],
    nomineeList: [],

    customerOTPResponse: {},
    verifyOtpResponse: {},
    KycData:{},
    OtherData:{},
    NomineeData:{},

    kycvalid: false,
    otherDetailValid: false,
    nomineeDetailsValid: false,

    // custName: "",
    // idTypeNo: "",
    // iCardname: "",
    // idEntitynum: "",
    // birthdate: "",
    // address: "",
    // stateId: "",
    // stateName: "",
    // cityId: "",
    // cityName: "",
    // pincode: "",

   // gender: "",
    emailOTP: "",

    // altetnateMobile: "",
    // mobile: "",
    // mobileOTP: "",
    // isMpgEmployee: "",
    // userUniqueCode: "",
    // companyId: "",
    // companyname: "",

    isEmailVerified: false,

    // nomineeRelation: "",
    // nomineeName: "",
    // nomineeMobileno: "",
    flag: '',

    customerId: '',
    customerUniqueId: '',
};

const registrationReducer = (state = initialState, action) => {
    //  console.log('registrationReducer', action);
    switch (action.type) {
        case CUSTOMEROTP_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };
        case CUSTOMEROTP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                number: action.payload.number,
                customerOTPResponse: action.payload.responseData,
                // refCodeForMobile: action.payload.refCodeForMobile
            };
        case CUSTOMEROTP_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        case VERIFYOTP_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };
        case VERIFYOTP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                verifyOtpResponse: action.payload,
              //  otp: action.payload.otp,
               // customerId: action.payload.customerId,
                isEmailVerified: action.payload.isEmailVerified,
                isMobileNumberVerified: true,
               // isMpinVerified: action.payload.mpin,
            };
        case VERIFYOTP_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        case GETPROOFLIST_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };
        case GETPROOFLIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                idProofList: action.payload,
            };
        case GETPROOFLIST_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        case GETSTATELIST_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };
        case GETSTATELIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                stateList: action.payload,
            };
        case GETSTATELIST_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        case GETCITYLIST_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };
        case GETCITYLIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cityList: action.payload,
            };
        case GETCITYLIST_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        case VERIFYEMAILOTP_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };
        case VERIFYEMAILOTP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isEmailVerified: true,
                emailOtp: action.payload.emailOtp
            };
        case VERIFYEMAILOTP_FAIL:
            return {
                ...state,
                isLoading: false,
            };

        case GETCOMPANYLIST_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };
        case GETCOMPANYLIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                companyList: action.payload,
            };
        case GETCOMPANYLIST_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        case GETOTPFOREMAIL_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };
        case GETOTPFOREMAIL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                email: action.payload.email,
                refCodeForEmail: action.payload.refCodeForEmail,
                flag: action.payload.flag
            };
        case GETOTPFOREMAIL_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        case GETRELEATIONLIST_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };
        case GETRELEATIONLIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                nomineeList: action.payload,
            };
        case GETRELEATIONLIST_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        case VERIFYREF_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };
        case VERIFYREF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isRefferalCode: true,
                referrerUniqueId: action.payload.referrerUniqueId
            };
        case VERIFYREF_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        case SAVEKYCDATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                KycData:action.payload,
                // custName: action.payload.custName,
                // idTypeNo: action.payload.idTypeNo,
                // iCardname: action.payload.iCardname,
                // idEntitynum: action.payload.idEntitynum,
                // birthdate: action.payload.birthdate,
                // address: action.payload.address,
                // stateId: action.payload.stateId,
                // stateName: action.payload.stateName,
                // cityId: action.payload.cityId,
                // cityName: action.payload.cityName,
                // pincode: action.payload.pincode,
                // kycvalid: action.payload.kycvalid,
            }
        case SAVEOTHERDATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                OtherData:action.payload,
                // gender: action.payload.gender,
                // email: action.payload.email,
                // emailOTP: action.payload.emailOTP,
                // isEmailVerified: action.payload.isEmailVerified,
                // altetnateMobile: action.payload.altetnateMobile,
                // mobile: action.payload.mobile,
                // mobileOTP: action.payload.mobileOTP,
                // isMpgEmployee: action.payload.isMpgEmployee,
                // userUniqueCode: action.payload.userUniqueCode,
                // companyId: action.payload.companyId,
                // companyname: action.payload.companyname,
                // otherDetailValid: action.payload.otherDetailValid,
            };
        case SAVENOMINEEDATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                NomineeData:action.payload,
                // nomineeRelation: action.payload.nomineeRelation,
                // nomineeName: action.payload.nomineeName,
                // nomineeMobileno: action.payload.nomineeMobileno,
                // nomineeDetailsValid: action.payload.nomineeDetailsValid,
            };
        case CREATECUSTOMER_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };
        case CREATECUSTOMER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                customerId: action.payload.customerId,
                customerUniqueId: action.payload.customerUniqueId
            };
        case CREATECUSTOMER_FAIL:
            return {
                ...state,
                isLoading: false
            };
        case SETPIN_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case SETPIN_SUCCESS:
            return {
                ...state,
                isLoading: false
            };
        case SETPIN_FAIL:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}
export default registrationReducer