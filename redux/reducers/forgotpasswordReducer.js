import {
    FORGOTPIN_FAIL, FORGOTPIN_PROGRESS, FORGOTPIN_SUCCESS,
    VERIFYOTPFORGOTPASS_PROGRESS, VERIFYOTPFORGOTPASS_SUCCESS, VERIFYOTPFORGOTPASS_FAIL,
    KYCTYPE_PROGRESS, KYCTYPE_SUCCESS, KYCTYPE_FAIL,
    VERIFYKYC_PROGRESS, VERIFYKYC_SUCCESS, VERIFYKYC_FAIL,
    RESETPIN_PROGRESS, RESETPIN_SUCESS, RESETPIN_FAIL,
} from "../actions/actionsConstant";
import { verifyKYC } from "../actions/forgotpasswordAction";

const initialState = {
    isLoading: false,
    number: 0,
    refCodeForMobile: "",
    identityCardName: "",
    customerId: '',
}

const forgotpasswordReducer = (state = initialState, action) => {

    //console.log("forgotpasswordReducer-----", action);

    switch (action.type) {
        case FORGOTPIN_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case FORGOTPIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                number: action.payload.number,
                refCodeForMobile: action.payload.refrencecode,
                customerId: action.payload.customerId
            };
        case FORGOTPIN_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case VERIFYOTPFORGOTPASS_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };
        case VERIFYOTPFORGOTPASS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                otp: action.payload.otp,
                refCodeForMobile: action.payload.referenceCode
            };
        case VERIFYOTPFORGOTPASS_FAIL:
            return {
                ...state,
                isLoading: false,
            };
        case KYCTYPE_SUCCESS:
            return {
                ...state,
                identityCardName: action.payload.identityType
            };
        case KYCTYPE_FAIL:
            return {
                ...state
            };
        case VERIFYKYC_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case VERIFYKYC_SUCCESS:
            return {
                ...state,
                isLoading: false
            };
        case VERIFYKYC_FAIL:
            return {
                ...state,
                isLoading: false
            };
        case RESETPIN_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case RESETPIN_SUCESS:
            return {
                ...state,
                isLoading: false
            };
        case RESETPIN_FAIL:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }

}
export default forgotpasswordReducer