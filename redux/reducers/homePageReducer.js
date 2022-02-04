
import { Platform } from 'react-native';
import {
    DASHBOARD_INFO_PROGRESS, DASHBOARD_INFO_SUCCESS, DASHBOARD_INFO_FAIL,
    APP_VERSION_PROGRESS, APP_VERSION_SUCCESS, APP_VERSION_FAIL
} from '../actions/actionsConstant'

const initialState = {
    isLoading: false,
    dashboardInfo: {},
    purchaseTax: 0.0,
    salesTax: 0.0, 
    versionInfo:{},
    // currentVersion: "1.0",
    // forceUpdate: false,
    // osType: Platform.OS,
}

const homePageReducer = (state = initialState, action) => {

    switch (action.type) {
        case DASHBOARD_INFO_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case DASHBOARD_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                dashboardInfo: action.payload,
                purchaseTax: (action.payload.purchaseTaxes[0].stateTax.taxPercentage) + (action.payload.purchaseTaxes[1].stateTax.taxPercentage) + (action.payload.purchaseTaxes[2].stateTax.taxPercentage),
                salesTax: (action.payload.saleTaxes[0].stateTax.taxPercentage) + (action.payload.saleTaxes[1].stateTax.taxPercentage) + (action.payload.saleTaxes[2].stateTax.taxPercentage),
            };
        case DASHBOARD_INFO_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case APP_VERSION_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case APP_VERSION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                versionInfo:action.payload,
                // currentVersion: action.payload.currentVersion,
                // forceUpdate: action.payload.forceUpdate,
                // osType: action.payload.osType,
            };
        case APP_VERSION_FAIL:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }

}

export default homePageReducer;