import {
    DASHBOARD_INFO_PROGRESS, DASHBOARD_INFO_SUCCESS, DASHBOARD_INFO_FAIL,
    APP_VERSION_PROGRESS, APP_VERSION_SUCCESS, APP_VERSION_FAIL
} from '../actions/actionsConstant'
import RestUtil from '../../src/util/restUtils'

import { URL } from '../../src/constants/configure';
import { Platform } from 'react-native';


export function getDashboardInfo() {
    return async (dispatch) => {
        dispatch(homeDispatch({ isLoading: true }, DASHBOARD_INFO_PROGRESS))
        RestUtil(URL.DASHBOARD_URL, {})
            .then((response) => response.json())
            .then((responseData) => {
              //  console.log("responseData", responseData.data)
                dispatch(homeDispatch(responseData.data, DASHBOARD_INFO_SUCCESS))
            })
            .catch((error) => {
                console.log('Error  ', error);
                dispatch(homeDispatch(error, DASHBOARD_INFO_FAIL))
            });
    }
}

export function getAppVersion() {
    return (dispatch) => {

        dispatch(homeDispatch({}, APP_VERSION_PROGRESS))
        RestUtil(URL.APP_VERSION, { useAuthorization: false })
            .then((response) => response.json())
            .then((responseData) => {
                // console.log("getAppVersionResponseData--------------->", responseData)
                var data;
                for (let i = 0; i < responseData.versionInfo.length; i++) {
                    let osType=responseData.versionInfo[i].osType;
                    if (osType.toLowerCase() == Platform.OS) {
                        data = responseData.versionInfo[i];
                    }
                }
                //console.log("getAppVersionData", data)

                dispatch(homeDispatch(data, APP_VERSION_SUCCESS))
            })
            .catch((error) => {
                console.log('Error  ', error);
                dispatch(homeDispatch(error, APP_VERSION_FAIL))
            });
    }
}

homeDispatch = (data, actionType) => {
    return {
        payload: data,
        type: actionType
    }
}