import {
    GETTRANSACTION_SUCCESS, GETTRANSACTION_FAIL,
    GETRET_PROGRESS, GETRET_FAIL, GETRET_SUCCESS,
    HANDALBUY_SUCCESS, HANDALBUY_FAIL,
    GETRECEIPT_PROGRESS, GETRECEIPT_SUCCESS, GETRECEIPT_FAIL,
    APPLYPROMOCODE_PROGRESS, APPLYPROMOCODE_SUCCESS, APPLYPROMOCODE_FAIL,
    APPLYVOUCHER_PROGRESS, APPLYVOUCHER_SUCCESS, APPLYVOUCHER_FAIL,
    REMOVEPROMOCODE_PROGRESS, REMOVEPROMOCODE_SUCCESS, REMOVEPROMOCODE_FAIL,
} from "../actions/actionsConstant"

const initialState = {
    isLoading: false,
    // buyGoldRate: 0,
    // discountApplied: false,
    // goldRateAfterDiscount: 0,
    purchaseTax: 0.0,
    // blockIdgetRet: '',
    // weight: "",
    // userId: 0,
    // updatedAt: "",
    // transactionId: "",
    // totalAmount: 0.0,
    // taxAmount: 0.0,
    // skuCode: '',
    // roundOffAmount: 0.0,
    // razorPayOrderId: "",
    // razorPay: "",
    // quantity: "",
    // productId: "",
    // payableAmount: 0.0,
    // orderTypeId: 0,
    // orderStartAt: "",
    // orderId: 0,
    // modifiedBy: 0,
    // mobileNumber: "",
    // marginPercent: 0.0,
    // marginGoldRate: 0.0,
    // isCompleted: false,
    // isActive: false,
    // id: 0,
    // goldRunningBalance: "",
    // goldRate: 0.0,
    // goldGstAmount: 0.0,
    // email: "",
    // customerName: "",
    // customerId: 0,
    // createdAt: "",
    // branchId: 0,
    // blockId: "",
    // bankDetailId: 0,
    // amount: 0.0,
    tax: 0,
    // previousAmount: 0.0,
    // previousWeight: 0.0,
    // discountedAmount: 0.0,
    // percentApplied: 0.0,
    // isPercentApplied: true,

    getRateResponse: {},
    handalBuyResponse: {},
    discountData: {},
    getTransactionData: {},
    promoCodeApplied: false,
    promoCodeResponse: {},
};

const buyGoldReducer = (state = initialState, action) => {
    //console.log('buyGoldRequest', action)

    switch (action.type) {
        case GETTRANSACTION_SUCCESS:
            return {
                ...state,
                getTransactionData: action.payload,
                isLoading: false,
            }
        case GETTRANSACTION_FAIL:
            return {
                ...state,
                isLoading: false,
            }
        case GETRET_SUCCESS:
            return {
                ...state,
                getRateResponse: action.payload,
                // buyGoldRate: action.payload.buyGoldRate,
                // discountApplied: action.payload.discountApplied,
                // goldRateAfterDiscount: action.payload.goldRateAfterDiscount,
                // blockIdgetRet: action.payload.blockId,
                purchaseTax: (action.payload.taxes[0].stateTax.taxPercentage) + (action.payload.taxes[1].stateTax.taxPercentage) + (action.payload.taxes[2].stateTax.taxPercentage),
                isLoading: false
            }
        case GETRET_FAIL:
            return {
                ...state,
                isLoading: false
            }
        case HANDALBUY_SUCCESS:
            return {
                ...state,
                handalBuyResponse: action.payload,
                // weight: action.payload.weight,
                // userId: action.payload.userId,
                // updatedAt: action.payload.updatedAt,
                // transactionId: action.payload.transactionId,
                // totalAmount: action.payload.totalAmount,
                // taxAmount: action.payload.taxAmount,
                // skuCode: action.payload.skuCode,
                // roundOffAmount: action.payload.roundOffAmount,
                // razorPayOrderId: action.payload.razorPayOrderId,
                // razorPay: action.payload.razorPay,
                // quantity: action.payload.quantity,
                // productId: action.payload.productId,
                // payableAmount: action.payload.payableAmount,
                // orderTypeId: action.payload.orderTypeId,
                // orderStartAt: action.payload.orderStartAt,
                // orderId: action.payload.orderId,
                // modifiedBy: action.payload.modifiedBy,
                // mobileNumber: action.payload.mobileNumber,
                // marginPercent: action.payload.marginPercent,
                // marginGoldRate: action.payload.marginGoldRate,
                // isCompleted: action.payload.isCompleted,
                // isActive: action.payload.isActive,
                // id: action.payload.id,
                // goldRunningBalance: action.payload.goldRunningBalance,
                // goldRate: action.payload.goldRate,
                // goldGstAmount: action.payload.goldGstAmount,
                // email: action.payload.email,
                // customerName: action.payload.customerName,
                // customerId: action.payload.customerId,
                // createdAt: action.payload.createdAt,
                // branchId: action.payload.branchId,
                // blockId: action.payload.blockId,
                // bankDetailId: action.payload.bankDetailId,
                // amount: action.payload.amount,
                tax: ((action.payload.tax[0].taxPercent) + (action.payload.tax[1].taxPercent)),
                // discountApplied: action.payload.discountDetail.discountApplied,
                // previousAmount: action.payload.previousAmount,
                // previousWeight: action.payload.previousWeight,
                // discountedAmount: action.payload.discountDetail.discountedAmount,
                // percentApplied: action.payload.discountDetail.percentApplied,
                // isPercentApplied: action.payload.discountDetail.isPercentApplied,
                promoCodeApplied: false,
                isLoading: false
            }
        case GETRECEIPT_PROGRESS:
            return {
                ...state,
                isLoading: true
            }
        case GETRECEIPT_SUCCESS:
            return {
                ...state,
                isLoading: false,
            }
        case GETRECEIPT_FAIL:
            return {
                ...state,
                isLoading: false,
            }
        case APPLYPROMOCODE_PROGRESS:
            return {
                ...state,
                isLoading: true,

            }
        case APPLYPROMOCODE_SUCCESS:
            return {
                ...state,
                promoCodeResponse: action.payload.Data,
                promoCodeApplied: action.payload.promocode,
                isLoading: false,
            }

        case APPLYPROMOCODE_FAIL:
            return {
                ...state,
                isLoading: false,
            }

        case REMOVEPROMOCODE_PROGRESS:
            return {
                ...state,
                isLoading: true,

            }
        case REMOVEPROMOCODE_SUCCESS:
            return {
                ...state,
                promoCodeResponse: action.payload,
                promoCodeApplied: false,
                isLoading: false
            }
        case REMOVEPROMOCODE_FAIL:
            return {
                ...state,
                isLoading: false,
            }

        case APPLYVOUCHER_PROGRESS:
            return {
                ...state,
                isLoading: true
            }
        case APPLYVOUCHER_SUCCESS:
            return {
                ...state,
                isLoading: false,
            }
        case APPLYVOUCHER_FAIL:
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state;
    }
}
export default buyGoldReducer;
