import {
    GETTRANSACTION_FAIL,
    GETTRANSACTION_SUCCESS,
    REQUEST_GETTRANSACTION_PROGRESS,

    SELLGETRET_PROGRESS, SELLGETRET_SUCCESS, SELLGETRET_FAIL,
    REQUEST_HANDALSELL_PROGRESS, HANDALSELL_SUCCESS, HANDALSELL_FAIL
} from "../actions/actionsConstant";

const initialState = {
    isLoading: false,
    sellGoldBalance: 0,
    sellRate: 0.0,
    discountAppliedForSale: false,
    discountSellRate: 0,
    salesTax: 0.0,
    blockId: '',
    weight: "",
    userId: 0,
    updatedAt: "",
    totalAmount: 0.0,
    taxAmount: 0.0,
    skuCode: '',
    roundOffAmount: 0.0,
    razorPayOrderId: "",
    quantity: "",
    productId: "",
    payableAmount: 0.0,
    orderTypeId: 0,
    orderStartAt: "",
    orderId: 0,
    modifiedBy: 0,
    mobileNumber: "",
    marginPercent: 0.0,
    marginGoldRate: 0.0,
    isCompleted: false,
    isActive: false,
    id: 0,
    goldRunningBalance: "",
    goldRate: 0.0,
    goldGstAmount: 0.0,
    customerId: 0,
    createdAt: "",
    branchId: 0,
    blockId: "",
    bankDetailId: 0,
    amount: 0.0,
    tax: 0,
    discountApplied: false,
    previousAmount: 0.0,
    previousWeight: 0.0,
    discountedAmount: 0.0,
    percentApplied: 0.0,
    isPercentApplied: true,
}

const sellGoldReducer = (state = initialState, action) => {
   // console.log('sellGoldReducer', action)

    switch (action.type) {
        case REQUEST_GETTRANSACTION_PROGRESS:
            return {
                ...state,
                isLoading: true,
            }
        case GETTRANSACTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                sellGoldBalance: action.payload.sellGoldBalance,
            }
        case GETTRANSACTION_FAIL:
            return {
                ...state,
                isLoading: false,
            }
        case SELLGETRET_PROGRESS:
            return {
                ...state,
                isLoading: true,
            }
        case SELLGETRET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                sellRate: action.payload.saleGoldRate,
                discountAppliedForSale: action.payload.discountApplied,
                discountSellRate: action.payload.goldRateAfterDiscount,
                salesTax: (action.payload.taxes[0].stateTax.taxPercentage) + (action.payload.taxes[1].stateTax.taxPercentage) + (action.payload.taxes[2].stateTax.taxPercentage),
                blockId: action.payload.blockId
            }
        case SELLGETRET_FAIL:
            return {
                ...state,
                isLoading: false,
            }
        case REQUEST_HANDALSELL_PROGRESS:
            return {
                ...state,
                isLoading: true,
            }
        case HANDALSELL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                weight: action.payload.weight,
                userId: action.payload.userId,
                updatedAt: action.payload.updatedAt,
                totalAmount: action.payload.totalAmount,
                taxAmount: action.payload.taxAmount,
                skuCode: action.payload.skuCode,
                roundOffAmount: action.payload.roundOffAmount,
                razorPayOrderId: action.payload.razorPayOrderId,
                quantity: action.payload.quantity,
                productId: action.payload.productId,
                payableAmount: action.payload.payableAmount,
                orderTypeId: action.payload.orderTypeId,
                orderStartAt: action.payload.orderStartAt,
                orderId: action.payload.orderId,
                modifiedBy: action.payload.modifiedBy,
                mobileNumber: action.payload.mobileNumber,
                marginPercent: action.payload.marginPercent,
                marginGoldRate: action.payload.marginGoldRate,
                isCompleted: action.payload.isCompleted,
                isActive: action.payload.isActive,
                id: action.payload.id,
                goldRunningBalance: action.payload.goldRunningBalance,
                goldRate: action.payload.goldRate,
                goldGstAmount: action.payload.goldGstAmount,
                customerId: action.payload.customerId,
                createdAt: action.payload.createdAt,
                branchId: action.payload.branchId,
                blockId: action.payload.blockId,
                bankDetailId: action.payload.bankDetailId,
                amount: action.payload.amount,
                discountApplied: action.payload.discountDetail.discountApplied,
                previousAmount: action.payload.previousAmount,
                previousWeight: action.payload.previousWeight,
                discountedAmount: action.payload.discountDetail.discountedAmount,
                percentApplied: action.payload.discountDetail.percentApplied,
                isPercentApplied: action.payload.discountDetail.isPercentApplied,
            }
        case HANDALSELL_FAIL:
            return {
                ...state,
                isLoading: false,
            }

        default:
            return state;
    }
}
export default sellGoldReducer;
