
const BASE_URL = "https://muthootcustomer.nimapinfotech.com/customer-api/";
const BASE_URL1 = "https://muthootcustomer.nimapinfotech.com/";

export const URL = {
    LOGIN: BASE_URL + "auth/customer-login",
    CHECKUSER: BASE_URL + "auth/check-user",
    SEND_OTP: BASE_URL + "customer-otp/send-otp",
    VERIFY_OTP: BASE_URL + "customer-otp/verify-otp",
    IDENTITY_TYPE: BASE_URL + "identity-type/",
    NOMINEE_RELATION: BASE_URL + "nominee-relation/",
    STATE: BASE_URL + "state/",
    CITY: BASE_URL + "city",
    COMPANY: BASE_URL + "customer/company",
    CREATE_CUSTOMER: BASE_URL + "customer/",
    VERIFY_REFERRAL: BASE_URL + "customer/verify-referral-code",
    SEND_EMAIL_OTP: BASE_URL + "customer-email/send-otp",
    VERIFY_EMAIL_OTP: BASE_URL + "customer-email/",
    DASHBOARD_URL: BASE_URL + "dashboard/",
    SELL_RATE: BASE_URL + "gold-trade/sell-rate",
    BUY_URL: BASE_URL + "gold-trade/buy-rate",
    TRANSACTION: BASE_URL + "gold-trade/last-transaction",
    V2: BASE_URL + "gold-trade/purchase-gold/v2",
    CREATE_PAYMENT: BASE_URL + "gold-trade/create-payment",
    SALE_GOLD: BASE_URL + "gold-trade/sale-gold",
    SET_MPIN: BASE_URL + "customer-email/set-mpin",
    APPLY_PROMO_CODE: BASE_URL + "promo-code/apply/",
    APPLY_VOUCHER: BASE_URL + "voucher/apply",
    GET_RECEIPT: BASE_URL + "mob_receipt/buy/",
    FORGOT_PIN: BASE_URL + "customer-email/Mpin/forgot-pin",
    KYC_TYPE: BASE_URL + "customer/kyc-type/",
    VERIFY_KYC: BASE_URL + "customer/verify-kyc",
    RESET_PASS: BASE_URL + "customer-email/reset-mpin",
    LangauageList: BASE_URL + 'language',
    APP_VERSION: BASE_URL + 'auth/os',
    TERMSANDCONDITION: BASE_URL1 + 'terms-conditions?from=mobile&lang=',
    PRIVACYPOLICY: BASE_URL1 + 'privacy-policy?from=mobile&lang=',
    FAQ: BASE_URL1 + 'faq?from=mobile&lang=',

}
