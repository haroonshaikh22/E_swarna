import {
    GETTRANSACTION_FAIL,
    GETTRANSACTION_SUCCESS,
    GETTRANSACTION_PROGRESS,
    SELLGETRET_PROGRESS, SELLGETRET_SUCCESS, SELLGETRET_FAIL,
    HANDALSELL_PROGRESS, HANDALSELL_SUCCESS, HANDALSELL_FAIL
} from "../actions/actionsConstant"
import { URL } from '../../src/constants/configure';
import RestUtil from '../../src/util/restUtils';


export function getTransaction() {
    return (dispatch) => {
        dispatch(sellDispatch({}, GETTRANSACTION_PROGRESS));
        RestUtil(URL.TRANSACTION, {})
            .then((response) => response.json())
            .then((responseData) => {
                console.log("getTransactionResponseData", responseData);

                dispatch(sellDispatch(responseData.data, GETTRANSACTION_SUCCESS));
            })
            .catch((error) => {
                console.error("error", error);
                dispatch(sellDispatch(error, GETTRANSACTION_FAIL));

            });
    }
}

export function getRate(navigation) {
    return (dispatch) => {
        dispatch(sellDispatch({}, SELLGETRET_PROGRESS));

        RestUtil(URL.SELL_RATE, {})
            .then((response) => response.json())
            .then((responseData) => {
                console.log("SELLGetRateResponseData", responseData);
                if (responseData.msgKey === "success") {
                    dispatch(sellDispatch(responseData.data, SELLGETRET_SUCCESS));
                } else if (responseData.msgKey === "notLoginUser") {
                    navigation.navigate('Login')
                } else {
                    dispatch(sellDispatch(responseData, SELLGETRET_FAIL));
                }
            })
            .catch((error) => {
                console.error("error", error);
                dispatch(sellDispatch(error, SELLGETRET_FAIL));
            });
    }
}

export function handleSell(blockId, goldAmount, isWeight, orderTypeId, weight) {
    return (dispatch) => {
        var date = new Date().toISOString();
        var bodyparam = {
            blockId: blockId,
            'goldAmount': goldAmount,
            'isWeight': isWeight,
            'orderStartAt': date,
            'orderTypeId': orderTypeId,
            'weight': weight,
        }
        //   console.log(bodyparam)
        var formBody = [];
        for (var property in bodyparam) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(bodyparam[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: formBody,
        };

        dispatch(sellDispatch({}, HANDALSELL_PROGRESS));

        RestUtil(URL.SALE_GOLD, requestOptions)
            .then((response) => response.json())
            .then((responseData) => {
                console.log("handleSellResponseData", responseData);

                if (responseData.msgKey === "success") {
                    dispatch(sellDispatch(responseData.data, HANDALSELL_SUCCESS));
                }
            })
            .catch((error) => {
                console.error("error", error);
                dispatch(sellDispatch(error, HANDALSELL_FAIL));
            });
    }
}



export const sellDispatch = (data, actionType) => {
    return {
        payload: data,
        type: actionType
    }
}
