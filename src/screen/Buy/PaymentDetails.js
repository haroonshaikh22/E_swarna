import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    SafeAreaView,
    TouchableOpacity, Dimensions
} from 'react-native';
import { COLORS, } from '../../constants/theme';
import CustomNavigationBar from '../../common/CustomNavigationBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../../constants/configure';
import RestUtil from '../../util/restUtils';
import { applyPromoCode, removePromoCode } from '../../../redux/actions/buyGoldAction';
import RazorpayCheckout from 'react-native-razorpay';
import { useTranslation } from 'react-i18next';
import { Loader } from '../../common/loader';

const PaymentDetails = ({ navigation, route }) => {
    const { t } = useTranslation();
    const reducerData = useSelector(state => state.buyGoldReducer)
    const dispatch = useDispatch();
    const [promocodeHint, setPromocodeHint] = useState(t('enterPromoCode'));
    const [promocodeColor, setPromocodeColor] = useState(COLORS.pureblue);
    const [voucherColor, setVoucherColor] = useState(COLORS.Matterhorn);
    const [codeFlag, setCodeFlag] = useState(1);
    const [codeText, setCodeText] = useState('')
    var OrderId = [];
    OrderId.push(reducerData.handalBuyResponse.id)
    //console.log("OrderId Array---------->",OrderId)

    // console.log("reducerData21 for payment Details------------>>>>", reducerData.promoCodeResponse)
    //  console.log("reducerDataOrderId", reducerData.handalBuyResponse.orderId)

    const [minutes, setMinutes] = useState(4);
    const [seconds, setSeconds] = useState(30);

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                    navigation.navigate('Buy')
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });

    const applyCodeCall = () => {
        if (codeFlag === 1) {
            dispatch(applyPromoCode(true, OrderId, 1, codeText));
        }

    }
    const removePromcodeCall = () => {

        dispatch(removePromoCode(false, OrderId, 1, codeText));

    }
    const createpayment = async () => {
        try {
            var bodyparam = {
                tempOrderId: reducerData.handalBuyResponse.orderId,
            }
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


            RestUtil(URL.CREATE_PAYMENT, requestOptions)
                .then((response) => response.json())
                .then(async (responseData) => {
                    console.log("response", responseData)

                    if (responseData.isRazorPayUsed === true) {
                        const razorPay = responseData.data.razorPay
                        const razorPayOrderId = responseData.data.razorPayOrderId
                        const payableAmount = responseData.data.payableAmount
                        const email = responseData.data.email
                        const mobileNumber = responseData.data.mobileNumber
                        makpayment(razorPay, razorPayOrderId, payableAmount, email, mobileNumber)
                    }
                })
                .catch((error) => {
                    console.log('Error', error);
                });
        } catch (error) {
            console.log(error);
        }

    }

    const makpayment = (razorPay, razorPayOrderId, payableAmount, email, mobileNumber) => {
        var options = {
            description: 'Buy Gold',
            // image: IMAGES.eSwarnai,
            currency: 'INR',
            key: razorPay,
            amount: payableAmount * 100,
            name: 'Buy Digital Gold',
            order_id: razorPayOrderId,//Replace this with an order_id created using Orders API.
            prefill: {
                email: email,
                contact: mobileNumber,
                name: reducerData.handalBuyResponse.customerName,
            },
            theme: COLORS.pureblue
        }
        RazorpayCheckout.open(options).then((data) => {
            // handle success
            console.log("success--------", data)
            const paymentId = data.razorpay_payment_id
            const razorSignature = data.razorpay_signatur
            const razorpay_order_id = data.razorpay_order_id

            sucessTransaction(paymentId, razorSignature, razorpay_order_id)

        }).catch((error) => {
            // handle failure
            alert(`Error: ${error.description}`);
        });
    }

    const sucessTransaction = async (paymentId, razorSignature, razorpay_order_id) => {
        try {

            const token = await AsyncStorage.getItem('token')
            // var bodyparam = {
            //     razorpay_order_id: razorpay_order_id,
            //     razorpay_signature: razorSignature,
            //     razorpay_payment_id: paymentId,
            //     type: "mob"
            // }
            // var formBody = [];
            // for (var property in bodyparam) {
            //     var encodedKey = encodeURIComponent(property);
            //     var encodedValue = encodeURIComponent(bodyparam[property]);
            //     formBody.push(encodedKey + "=" + encodedValue);
            // }
            // formBody = formBody.join("&");
            // console.log(formBody)
            const requestOptions = {
                url: "https://muthootcustomer.nimapinfotech.com/customer-api/buy-gold/" + route.params.response.orderId,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: {
                    razorpay_order_id: razorpay_order_id,
                    razorpay_signature: razorSignature,
                    razorpay_payment_id: paymentId,
                    type: "mob"
                }

            };
            // const URLRESPONSE = "https://muthootcustomer.nimapinfotech.com/customer-api/buy-gold/" + route.params.response.orderId
            const response = await axios(requestOptions)
            // const dataresponse = await response.json

            console.log("successs transcation--------", response)

        } catch (error) {
            console.log(error);
        }


    }

    const voucherClick = () => {
        setPromocodeHint(t('enterVoucherCode'))
        setPromocodeColor(COLORS.Matterhorn)
        setVoucherColor(COLORS.pureblue)
        setCodeFlag(2)

    }
    const promocodeclick = () => {
        setPromocodeHint(t('enterPromoCode'))
        setPromocodeColor(COLORS.pureblue)
        setVoucherColor(COLORS.Matterhorn)
        setCodeFlag(1)
    }

    return (
        <SafeAreaView style={styles.containermain}>
            <CustomNavigationBar headername="Buy" icon_name='cart' back={true} />
            <View style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center', width: "100%" }}>
                <View style={styles.topView}></View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                        <Text style={{ textAlign: 'center', color: COLORS.white, fontSize: 14, marginTop: "15%" }}>{t('thisPriceWillbeValidFor')} {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Text>
                        <View style={styles.container}>
                            <Text style={{ textAlign: 'center', fontSize: 20, color: COLORS.black, padding: 10, margin: 10, fontWeight: 'bold' }}>{t('paymentDetails')}</Text>
                            <View style={styles.rowview}>
                                <Text style={styles.textheader}>{t('weightingms')}</Text>
                                <Text style={styles.textheader}>{t('amount')}</Text>
                            </View>

                            <View style={styles.rowview}>
                                <Text style={styles.subtext}>{reducerData.handalBuyResponse.weight}</Text>
                                <Text style={styles.subtext}>Rs.{reducerData.handalBuyResponse.previousAmount}</Text>
                            </View>

                            <View style={styles.rowview}>
                                <Text style={styles.textheader}>{t('gstPercent')}</Text>
                                <Text style={styles.textheader}>{t('gst')}</Text>
                            </View>

                            <View style={styles.rowview}>
                                <Text style={styles.subtext}>{reducerData.tax}%</Text>
                                <Text style={styles.subtext}>Rs.{reducerData.handalBuyResponse.taxAmount}</Text>
                            </View>
                            <View style={styles.rowview}>
                                <Text style={styles.textheader}>{t('cessAmount')}</Text>
                                <Text style={styles.textheader}>{t('totalAmount')}</Text>
                            </View>

                            <View style={styles.rowview}>
                                <Text style={styles.subtext}>-</Text>
                                <Text style={styles.subtext}>Rs.{reducerData.handalBuyResponse.totalAmount}</Text>
                            </View>

                            {
                                reducerData.handalBuyResponse.discountDetail.discountApplied === true ?
                                    <View style={styles.rowview}>
                                        <Text style={styles.textheader}>{t('eswarnaDiscountPercent')} </Text>
                                        <Text style={styles.textheader}> {t('eSwarnaDiscount')}</Text>
                                    </View>
                                    : null
                            }
                            {
                                reducerData.handalBuyResponse.discountDetail.discountApplied === true ?
                                    <View style={styles.rowview}>
                                        <Text style={styles.subtext}>{reducerData.handalBuyResponse.discountDetail.percentApplied}%</Text>
                                        <Text style={styles.subtext}>{reducerData.handalBuyResponse.discountDetail.discountedAmount}</Text>
                                    </View>
                                    : null
                            }


                            {
                                (reducerData.handalBuyResponse.discountDetail.discountApplied === true) ?
                                    <View style={styles.rowview}>
                                        <Text style={styles.textheader}>{t('discountedAmount')}</Text>
                                    </View>
                                    : null
                            }
                            {
                                (reducerData.handalBuyResponse.discountDetail.discountApplied === true) ?
                                    <View style={styles.rowview}>
                                        <Text style={styles.subtext}>{reducerData.handalBuyResponse.discountDetail.discountedAmount}</Text>
                                    </View>
                                    : null
                            }
                        </View>
                        <View style={styles.container}>
                            <Text style={styles.textheader}>{t('clickOnBelowLinkIfHaveAny')}</Text>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    padding: 5, margin: 5,
                                    color: promocodeColor,
                                    fontWeight: 'bold', fontSize: 20
                                }}
                                onPress={() => promocodeclick()}
                            >{t('promoCode')}</Text>
                            <Text style={styles.textheader}>{t('or')}</Text>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    padding: 5, margin: 5, color: voucherColor,
                                    fontWeight: 'bold', fontSize: 18
                                }}
                                onPress={() => voucherClick()}
                            >{t('valueGiftVoucher')}</Text>
                            <View style={{ margin: 5, padding: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{
                                    borderWidth: 1,
                                    borderColor: COLORS.black,
                                    borderRadius: 1,
                                    //  margin: 10,
                                    borderStyle: 'dashed'
                                }}>
                                    <TextInput
                                        placeholder={promocodeHint}
                                        style={{ padding: 10, }}
                                        value={codeText}
                                        onChangeText={(data) => setCodeText(data)}

                                    >
                                    </TextInput>
                                </View>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: reducerData.promoCodeApplied ? COLORS.Green : COLORS.pureblue,
                                        padding: 18,
                                        borderTopEndRadius: 10,
                                        borderBottomEndRadius: 10
                                    }}
                                    onPress={() => { applyCodeCall() }}
                                >
                                    <Text style={{ color: COLORS.white, textAlign: 'center' }}
                                    >{reducerData.promoCodeApplied ? (t('applied')) + (reducerData.promoCodeResponse.promoCodeAmount) : (t('apply'))}</Text>
                                </TouchableOpacity>
                            </View>
                            {
                                reducerData.promoCodeApplied ?
                                    <Text style={{ alignSelf: 'center', color: COLORS.pureblue, fontWeight: 'bold', fontSize: 16 }}
                                        onPress={() => { removePromcodeCall() }}
                                    >Remove</Text>
                                    : null

                            }
                        </View>
                        <View style={styles.container}>
                            <Text style={{ textAlign: 'center', fontSize: 20, color: COLORS.black, padding: 2, margin: 2, fontWeight: 'bold' }}>{t('totalPayment')}</Text>

                            <View style={styles.rowview}>
                                <Text style={styles.textheader}>{t('finalAmount')} </Text>
                                {
                                    reducerData.promoCodeApplied ?
                                        <Text style={[styles.textheader,{flexShrink:1}]}>    Amount To be paid (After E-swarna discount promocode)</Text>
                                        : null

                                }
                            </View>
                            <View style={styles.rowview}>
                                <Text style={styles.subtext}>Rs.{reducerData.handalBuyResponse.totalAmount}</Text>
                                {
                                    reducerData.promoCodeApplied ?
                                        <Text style={styles.subtext}>{reducerData.promoCodeResponse.totalAmount}</Text>
                                        : null

                                }
                            </View>
                            <View style={styles.rowview}>
                                <Text style={styles.textheader}>{t('roundOff')} </Text>
                                <Text style={styles.textheader}>{t('payableAmount')}</Text>
                            </View>

                            <View style={styles.rowview}>
                                <Text style={styles.subtext}>{reducerData.handalBuyResponse.roundOffAmount}</Text>
                                <Text style={styles.subtext}>Rs.{reducerData.promoCodeApplied ? (reducerData.promoCodeResponse.payableAmount) : (reducerData.handalBuyResponse.payableAmount)}</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={{
                                backgroundColor: COLORS.pureblue,
                                marginTop: 20, padding: 15,
                                borderRadius: 8,
                                width: Dimensions.get('screen').width - 30,
                            }}
                            onPress={createpayment}>
                            <Text style={{ color: COLORS.white, textAlign: 'center' }}>{t('proceed')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                backgroundColor: "#dddddd",
                                marginTop: 20, padding: 15,
                                borderRadius: 8,
                                width: Dimensions.get('screen').width - 30,
                                marginBottom: 10
                            }}>
                            <Text style={{ color: COLORS.black, textAlign: 'center' }}>{t('cancel')}</Text>
                        </TouchableOpacity>
                        <Loader loading={reducerData.isLoading} />
                    </View>
                </ScrollView>

            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    containermain: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    topView: {
        // width: "100%",
        height: 120,
        backgroundColor: COLORS.pureblue,
        borderBottomStartRadius: 40,
        borderBottomEndRadius: 40,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    container: {
        alignContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.Lightgray,
        padding: 20,
        marginTop: 15,
        width: Dimensions.get('screen').width - 30,
        backgroundColor: COLORS.white,
        borderRadius: 15
    },
    rowview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        padding: 5,
    },
    textheader: {
        color: COLORS.Matterhorn,
        textAlign: 'center',
        padding: 2,
        fontSize: 14,
       
    },
    subtext: {
        color: COLORS.Matterhorn,
        textAlign: 'center',
        padding: 2,
        fontSize: 14,
        fontWeight: 'bold'
    }
});

export default PaymentDetails;