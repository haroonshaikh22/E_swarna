import {
    GETRET_SUCCESS, GETRET_FAIL,
    GETTRANSACTION_SUCCESS, GETTRANSACTION_FAIL,
    HANDALBUY_SUCCESS, HANDALBUY_FAIL,
    GETRECEIPT_PROGRESS, GETRECEIPT_SUCCESS, GETRECEIPT_FAIL,
    APPLYPROMOCODE_PROGRESS, APPLYPROMOCODE_SUCCESS, APPLYPROMOCODE_FAIL,
    APPLYVOUCHER_PROGRESS, APPLYVOUCHER_SUCCESS, APPLYVOUCHER_FAIL,
    REMOVEPROMOCODE_PROGRESS, REMOVEPROMOCODE_SUCCESS, REMOVEPROMOCODE_FAIL,

} from "../actions/actionsConstant"

import RestUtil from "../../src/util/restUtils"
import { URL } from '../../src/constants/configure'

import Toast from 'react-native-simple-toast';

export function getTransaction() {
    return async (dispatch) => {
        RestUtil(URL.TRANSACTION, {})
            .then((response) => response.json())
            .then((responseData) => {
                //console.log('responseData last transcation==========>', responseData)
                dispatch(buyGoldDispatch(responseData.data, GETTRANSACTION_SUCCESS));
            })
            .catch((error) => {
                console.log('transactionDataError  ', error);
                dispatch(buyGoldDispatch(error, GETTRANSACTION_FAIL));
            });
    }
}

export function getRate() {
    return async (dispatch) => {
        RestUtil(URL.BUY_URL, {})
            .then((response) => response.json())
            .then((responseData) => {
                //console.log("getRateResponse===========>", responseData.data)
                dispatch(buyGoldDispatch(responseData.data, GETRET_SUCCESS));
            })
            .catch((error) => {
                console.log("getRateError", error)
                dispatch(buyGoldDispatch(error, GETRET_FAIL))
            });
    }
}

export function handleBuy(blockId, enterValue, isWeight, enterRate) {
    return async (dispatch) => {
        var date = new Date().toISOString();
        var bodyparam = {
            'blockId': blockId,
            'goldAmount': enterValue,
            'isWeight': isWeight,
            'orderStartAt': date,
            'orderTypeId': 1,
            'weight': enterRate,
        }

        var header = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        };

        // console.log("handleBuyResponse", bodyparam)


        var formBody = [];
        for (var property in bodyparam) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(bodyparam[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        RestUtil(URL.V2, { method: "POST", headers: header, body: formBody })
            .then((response) => response.json())
            .then((responseData) => {
                //console.log("handleBuyResponse", responseData)
                if (responseData.msgKey === "success") {
                    dispatch(buyGoldDispatch(responseData.data, HANDALBUY_SUCCESS));
                }
                // else if(ponseData.msgKey === "notLoginUser"){
                //     navigate

                // } 

                else {
                    // Toast.show(responseData.message)
                    dispatch(buyGoldDispatch(responseData.data, HANDALBUY_FAIL));
                }
            })
            .catch((error) => {
                console.log("Error", error)
                dispatch(buyGoldDispatch(error, HANDALBUY_FAIL));
            });
    }
}

export function getReceipt(orderId) {
    return async (dispatch) => {
        let url = URL.GET_RECEIPT + orderId;
        dispatch(buyGoldDispatch({}, GETRECEIPT_PROGRESS));

        RestUtil(url, {})
            .then((response) => response.json())
            .then((responseData) => {
                console.log("getReceiptResponse", responseData.data)
                dispatch(buyGoldDispatch(responseData.data, GETRECEIPT_SUCCESS));
            })
            .catch((error) => {
                console.log("getReceiptError", error)
                dispatch(buyGoldDispatch(error, GETRECEIPT_FAIL))
            });
    }
}


export function applyPromoCode(addpromocode, orderId, orderTypeId, promoCode) {
    return async (dispatch) => {
        dispatch(buyGoldDispatch({}, APPLYPROMOCODE_PROGRESS));

        var bodyData = JSON.stringify({
            'addPromoCode': addpromocode,
            'orderId': orderId,
            'orderTypeId': orderTypeId,
            'promoCode': promoCode
        });
        console.log('DAta-----------', bodyData)
        RestUtil(URL.APPLY_PROMO_CODE, { method: "POST", body: bodyData })
            .then((response) => response.json())
            .then((responseData) => {
                console.log("getPromocodeResponse------->", responseData)
                if (responseData.msgKey === "promoCodeApplied") {
                    Toast.show(responseData.message);
                    dispatch(buyGoldDispatch({
                        promocode: true,
                        Data: responseData.data
                    }, APPLYPROMOCODE_SUCCESS));
                }
                else {
                    Toast.show(responseData.message)
                    dispatch(buyGoldDispatch(responseData.data, APPLYPROMOCODE_FAIL))
                }
            })
            .catch((error) => {
                console.log("getReceiptError", error)
                dispatch(buyGoldDispatch(error, APPLYPROMOCODE_FAIL))
            });
    }
}

export function removePromoCode(addpromocode, orderId, orderTypeId, promoCode) {
    return async (dispatch) => {
        dispatch(buyGoldDispatch({}, REMOVEPROMOCODE_PROGRESS));

        var bodyData = JSON.stringify({
            'addPromoCode': addpromocode,
            'orderId': orderId,
            'orderTypeId': orderTypeId,
            'promoCode': promoCode
        });
        //console.log('DAta-----------', bodyData)
        RestUtil(URL.APPLY_PROMO_CODE, { method: "POST", body: bodyData })
            .then((response) => response.json())
            .then((responseData) => {
                console.log("getPromocodeResponse------->", responseData)
               if (responseData.msgKey === "promoCodeRemoved") {
                    Toast.show(responseData.message)
                    dispatch(buyGoldDispatch(responseData.data, REMOVEPROMOCODE_SUCCESS))
                }
                else {
                    Toast.show(responseData.message)
                    dispatch(buyGoldDispatch(responseData.data, REMOVEPROMOCODE_FAIL))
                }
            })
            .catch((error) => {
                console.log("getReceiptError", error)
                dispatch(buyGoldDispatch(error, REMOVEPROMOCODE_FAIL))
            });
    }
}

export function applyVoucher(orderId) {
    return async (dispatch) => {
        let url = URL.APPLY_VOUCHER + orderId;
        dispatch(buyGoldDispatch({}, APPLYVOUCHER_PROGRESS));

        RestUtil(url, {})
            .then((response) => response.json())
            .then((responseData) => {
                console.log("getReceiptResponse", responseData.data)
                dispatch(buyGoldDispatch(responseData.data, APPLYVOUCHER_SUCCESS));
            })
            .catch((error) => {
                console.log("getReceiptError", error)
                dispatch(buyGoldDispatch(error, APPLYVOUCHER_FAIL))
            });
    }
}



export const buyGoldDispatch = (data, actionType) => {
    return {
        payload: data,
        type: actionType
    }
}
