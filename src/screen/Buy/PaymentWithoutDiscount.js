import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    Image,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import { COLORS, IMAGES, FONTS, GLOBALSTYLES } from '../../constants/theme';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomNavigationBar from '../../common/CustomNavigationBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';
import { URL } from '../../constants/configure';
import RestUtil from '../../util/restUtils';

const PaymentWithoutDiscount = ({ navigation, route }) => {

    const reducerData = useSelector(state => state.buyGoldReducer)
   // console.log("reducerData21", reducerData.handalBuyResponse)

 
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

    const createpayment = async () => {
        try {

            const token = await AsyncStorage.getItem('token')
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
                    dispatch(loginDispatch(error, USER_CHECK_FAIL))
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
                url: "https://muthootcustomer.nimapinfotech.com/customer-api/buy-gold/" + reducerData.handalBuyResponse.orderId,
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
            // const URLRESPONSE = "https://muthootcustomer.nimapinfotech.com/customer-api/buy-gold/" + reducerData.handalBuyResponse.orderId
            const response = await axios(requestOptions)
            // const dataresponse = await response.json

            console.log("successs transcation--------", response)

        } catch (error) {
            console.log(error);
        }


    }

    return (
        <SafeAreaView style={styles.containermain}>
            <CustomNavigationBar headername="Buy" icon_name='cart' back={true} />
            <ScrollView
                style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center', width: "100%" }}>
                    <View style={styles.topView}></View>

                    {/* <View style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}> */}
                    <Text style={{ textAlign: 'center', color: COLORS.white, fontSize: 14, marginTop: "15%" }}>The Price will be valid for {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Text>
                    <View style={styles.container}>
                        <Text style={{ textAlign: 'center', fontSize: 20, color: COLORS.black, padding: 10, margin: 10, fontWeight: 'bold' }}>Payment Details</Text>
                        <View style={styles.rowview}>
                            <Text style={styles.textheader}>Weight (in gms)</Text>
                            <Text style={styles.textheader}>Amount</Text>
                        </View>

                        <View style={styles.rowview}>
                            <Text style={styles.subtext}>{reducerData.handalBuyResponse.weight}</Text>
                            <Text style={styles.subtext}>Rs.{reducerData.handalBuyResponse.previousAmount}</Text>
                        </View>

                        <View style={styles.rowview}>
                            <Text style={styles.textheader}>GST %</Text>
                            <Text style={styles.textheader}>GST</Text>
                        </View>

                        <View style={styles.rowview}>
                            <Text style={styles.subtext}>{reducerData.tax}</Text>
                            <Text style={styles.subtext}>Rs.{reducerData.handalBuyResponse.taxAmount}</Text>
                        </View>
                        <View style={styles.rowview}>
                            <Text style={styles.textheader}>CESS Amount</Text>
                            <Text style={styles.textheader}>Total Amount</Text>
                        </View>

                        <View style={styles.rowview}>
                            <Text style={styles.subtext}>-</Text>
                            <Text style={styles.subtext}>Rs.{reducerData.handalBuyResponse.totalAmount}</Text>
                        </View>
                        <View style={styles.rowview}>
                            <Text style={styles.textheader}>Round Off</Text>
                            <Text style={styles.textheader}>Payable Amount</Text>
                        </View>

                        <View style={styles.rowview}>
                            <Text style={styles.subtext}>{reducerData.handalBuyResponse.roundOffAmount}</Text>
                            <Text style={styles.subtext}>Rs.{reducerData.handalBuyResponse.payableAmount}</Text>
                        </View>

                    </View>
                    <View style={styles.container}>
                        <Text style={styles.textheader}>Click on below link if you have any</Text>
                        <Text style={{ textAlign: 'center', padding: 5, margin: 5, color: COLORS.pureblue, fontWeight: 'bold', fontSize: 16 }}>Promo Code</Text>
                        <Text style={styles.textheader}>OR</Text>
                        <Text style={{ textAlign: 'center', padding: 5, margin: 5, color: COLORS.Matterhorn, fontWeight: 'bold', fontSize: 16 }}>Value Gift Voucher</Text>
                        <View style={{ margin: 5, padding: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{
                                borderWidth: 1,
                                borderColor: COLORS.black,
                                borderRadius: 1,
                                //  margin: 10,
                                borderStyle: 'dashed'
                            }}>
                                <TextInput
                                    placeholder='Enter Promo Code'
                                    style={{ padding: 10, }}
                                    maxLength={10}>
                                </TextInput>
                            </View>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: COLORS.pureblue,
                                    padding: 18,
                                    borderTopEndRadius: 10,
                                    borderBottomEndRadius: 10
                                }} >
                                <Text style={{ color: COLORS.white, textAlign: 'center' }}>Apply</Text>
                            </TouchableOpacity>
                            {/* <Button mode='contained'
                                color={COLORS.pureblue}
                                style={{
                                    // margin:10,
                                    padding: 10,
                                    borderTopEndRadius: 10,
                                    borderBottomEndRadius: 10
                                }}
                            > Apply
                            </Button> */}
                        </View>
                    </View>

                    <TouchableOpacity
                        style={{
                            backgroundColor: COLORS.pureblue,
                            marginTop: 20, padding: 15,
                            borderRadius: 8,
                            width: "80%"
                        }}
                        onPress={createpayment}>
                        <Text style={{ color: COLORS.white, textAlign: 'center' }}>Proceed</Text>
                    </TouchableOpacity>

                    {/* <Button mode='contained'
                        color={COLORS.pureblue}
                        style={{
                            marginTop: 20, padding: 10,
                            borderRadius: 8, width: "80%"
                        }}
                        onPress={createpayment}
                    > Proceed
                    </Button> */}
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#dddddd",
                            marginTop: 20, padding: 15,
                            borderRadius: 8, width: '80%',
                            marginBottom: 10
                        }}>
                        <Text style={{ color: COLORS.black, textAlign: 'center' }}>Cancel</Text>
                    </TouchableOpacity>
                    {/* <Button mode='contained'
                        color='#dddddd'
                        style={{
                            marginTop: 20, padding: 10,
                            borderRadius: 8, width: "80%",
                            marginBottom: 10
                        }}
                    > Cancel
                    </Button> */}


                    {/* </View> */}

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    containermain: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    topView: {
        //width: "100%",
        height: 130,
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
        borderColor: COLORS.pureblue,
        padding: 20,
        marginTop: "8%",
        width: '80%',
        backgroundColor: COLORS.white,
        borderRadius: 15
    },
    rowview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    textheader: {
        color: COLORS.Matterhorn,
        textAlign: 'center',
        padding: 2,
        fontSize: 14
    },
    subtext: {
        color: COLORS.Matterhorn,
        textAlign: 'center',
        padding: 2,
        fontSize: 14,
        fontWeight: 'bold'
    }
});

export default PaymentWithoutDiscount;