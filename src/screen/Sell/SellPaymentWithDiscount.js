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
import CustomNavigationBar from '../../common/CustomNavigationBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";

const SellPaymentWithDiscount = ({ navigation, route }) => {

    const reducerData = useSelector(state => state.sellGoldReducer)
    console.log("PaymentDetails", reducerData);

    const [minutes, setMinutes] = useState(4);
    const [seconds, setSeconds] = useState(30);

    const [modalVisible, setModalVisible] = useState(false);
    const [bankmodalVisible, setBankModalVisible] = useState(false);

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
    const modalcancel = () => {
        setModalVisible(false)
    }

    const showBankmodal = () => {
        setBankModalVisible(true)
    }

    const bankmodalcancel = () => {
        setBankModalVisible(false)
    }

    return (
        <SafeAreaView style={styles.containermain}>
            <CustomNavigationBar headername="Sell" icon_name='cart' back={true} />
            <View style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center', width: "100%" }}>
                <View style={styles.topView}></View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                        <Text style={{ textAlign: 'center', color: COLORS.white, fontSize: 14, marginTop: "15%" }}>The Price will be valid for {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Text>
                        <View style={styles.container}>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 20,
                                color: COLORS.black,
                                padding: 10,
                                margin: 10,
                                fontWeight: 'bold'
                            }}>Payment Details</Text>
                            <View style={styles.rowview}>
                                <Text style={styles.textheader}>Available Quantity (in gms)</Text>
                                <Text style={styles.textheader}>Weight (in gms)</Text>
                            </View>

                            <View style={styles.rowview}>
                                <Text style={styles.subtext}>{reducerData.goldRunningBalance}</Text>
                                <Text style={styles.subtext}>{reducerData.weight}</Text>
                            </View>

                            <View style={styles.rowview}>
                                <Text style={styles.textheader}>Amount</Text>
                                <Text style={styles.textheader}>GST %</Text>
                            </View>

                            <View style={styles.rowview}>
                                <Text style={styles.subtext}>Rs.{reducerData.previousAmount}</Text>
                                <Text style={styles.subtext}>0%</Text>
                            </View>
                            <View style={styles.rowview}>
                                <Text style={styles.textheader}>GST</Text>
                                <Text style={styles.textheader}>CESS Amount</Text>
                            </View>

                            <View style={styles.rowview}>
                                <Text style={styles.subtext}>0.00</Text>
                                <Text style={styles.subtext}>-</Text>
                            </View>

                            <View style={styles.rowview}>
                                <Text style={styles.textheader}>Total Amount</Text>
                                <Text style={styles.textheader}>Round Off</Text>
                            </View>

                            <View style={styles.rowview}>
                                <Text style={styles.subtext}>Rs.{reducerData.totalAmount}</Text>
                                <Text style={styles.subtext}>{reducerData.roundOffAmount}</Text>
                            </View>
                            <View style={styles.rowview}>
                                <Text style={styles.textheader}>E-Swarna discont %</Text>
                                <Text style={styles.textheader}>E-Swarna discont</Text>
                            </View>

                            <View style={styles.rowview}>
                                <Text style={styles.subtext}>{reducerData.percentApplied}</Text>
                                <Text style={styles.subtext}>{reducerData.discountedAmount}</Text>
                            </View>
                            <View style={styles.rowview}>
                                <Text style={styles.textheader}>Payable Amount</Text>
                                <Text style={styles.textheader}>Offered Amount</Text>
                            </View>

                            <View style={styles.rowview}>
                                <Text style={styles.subtext}>Rs.{reducerData.payableAmount}</Text>
                                <Text style={styles.subtext}>Rs.{reducerData.amount}</Text>
                            </View>

                        </View>

                        {/* <Button mode='contained'
                            color={COLORS.pureblue}
                            style={{
                                marginTop: 20, padding: 10,
                                borderRadius: 8, width: "100%"
                            }}
                        > Proceed
                        </Button> */}

                        <TouchableOpacity
                            style={{
                                backgroundColor: COLORS.pureblue,
                                marginTop: 20, padding: 15,
                                borderRadius: 8,
                                width: "100%"
                            }}
                            onPress={() => setModalVisible(true)}
                        >
                            <Text style={{ color: COLORS.white, textAlign: 'center', fontWeight: 'bold' }}>Confirm Bank Details</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#dddddd",
                                marginTop: 20, padding: 15,
                                borderRadius: 8, width: '100%',
                                marginBottom: 10
                            }}>
                            <Text style={{ color: COLORS.black, textAlign: 'center', fontWeight: 'bold' }}>Cancel</Text>
                        </TouchableOpacity>

                        {/* Confirm Bank modal */}
                        <Modal
                            isVisible={modalVisible}
                            onBackButtonPress={() => { setModalVisible(false) }}
                            swipeDirection="down"
                            onSwipeComplete={(e) => { setModalVisible(false); }}
                            deviceWidth={1}
                            deviceHeight={1}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Bank Details</Text>
                                    <View
                                        style={{
                                            height: 1,
                                            width: '100%',
                                            backgroundColor: '#dddddd'
                                        }}
                                    />
                                    <Text style={{
                                        padding: 5,
                                        fontSize: 25,
                                        margin: 10,
                                        fontWeight: 'bold',
                                        color: COLORS.black,
                                        textAlign: "center"
                                    }}>No Data Found</Text>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: COLORS.pureblue,
                                            marginTop: 40, padding: 15,
                                            borderRadius: 8,
                                            width: "100%"
                                        }}
                                        onPress={showBankmodal}
                                    >
                                        <Text style={{ color: COLORS.white, textAlign: 'center', fontWeight: 'bold' }}>Add New Bank </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: COLORS.pureblue,
                                            marginTop: 20, padding: 15,
                                            borderRadius: 8,
                                            width: "100%"
                                        }}

                                    >
                                        <Text style={{ color: COLORS.white, textAlign: 'center', fontWeight: 'bold' }}>Proceed</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: "#dddddd",
                                            marginTop: 20, padding: 15,
                                            borderRadius: 8, width: '100%',
                                            marginBottom: 10
                                        }}
                                        onPress={modalcancel}>
                                        <Text style={{ color: COLORS.black, textAlign: 'center', fontWeight: 'bold' }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>

                        {/* Bank Detalis Modal */}
                        <Modal
                            isVisible={bankmodalVisible}
                            onBackButtonPress={() => { setBankModalVisible(false) }}
                            swipeDirection="down"
                            onSwipeComplete={(t) => { setBankModalVisible(false); }}
                            deviceWidth={1}
                            deviceHeight={1}
                        >
                            <ScrollView>
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalText}>Add new Bank</Text>
                                        <View
                                            style={{
                                                height: 1,
                                                width: '100%',
                                                backgroundColor: '#dddddd'
                                            }}
                                        />
                                        <View style={styles.textInputView}>
                                            <Text style={styles.textStyle}>
                                                IFSC Code
                                                <Text style={{ color: 'red' }}> *</Text>
                                            </Text>
                                            <TextInput style={styles.textinput} placeholder="Enter IFSC Code" />
                                        </View>

                                        <View style={styles.textInputView}>
                                            <Text style={styles.textStyle}>
                                                Bank Name
                                                <Text style={{ color: 'red' }}> *</Text>
                                            </Text>
                                            <TextInput style={styles.textinput} placeholder="XYZ Bank" />
                                        </View>
                                        <View style={styles.textInputView}>
                                            <Text style={styles.textStyle}>
                                                Bank Branch
                                                <Text style={{ color: 'red' }}> *</Text>
                                            </Text>
                                            <TextInput style={styles.textinput} placeholder="XYZ Branch" />
                                        </View>
                                        <View style={styles.textInputView}>
                                            <Text style={styles.textStyle}>
                                                A/C holder Name
                                                <Text style={{ color: 'red' }}> *</Text>
                                            </Text>
                                            <TextInput style={styles.textinput} placeholder="John Smith" />
                                        </View>
                                        <View style={styles.textInputView}>
                                            <Text style={styles.textStyle}>
                                                A/C Number
                                                <Text style={{ color: 'red' }}> *</Text>
                                            </Text>
                                            <TextInput style={styles.textinput} placeholder="83237492399923" />
                                        </View>
                                        <View style={styles.textInputView}>
                                            <Text style={styles.textStyle}>
                                                Confirm A/C Number
                                                <Text style={{ color: 'red' }}> *</Text>
                                            </Text>
                                            <TextInput style={styles.textinput} placeholder="83237492399923" />
                                        </View>
                                        <TouchableOpacity
                                            style={{
                                                backgroundColor: COLORS.pureblue,
                                                marginTop: 20, padding: 15,
                                                borderRadius: 8,
                                                width: "100%"
                                            }}
                                        >
                                            <Text style={{ color: COLORS.white, textAlign: 'center', fontWeight: 'bold' }}>Proceed</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{
                                                backgroundColor: "#dddddd",
                                                marginTop: 20, padding: 15,
                                                borderRadius: 8, width: '100%',
                                                marginBottom: 2
                                            }}
                                            onPress={bankmodalcancel}
                                        >
                                            <Text style={{ color: COLORS.black, textAlign: 'center', fontWeight: 'bold' }}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        </Modal>

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
        flex: 0.28,
        width: "100%",
        height: '25%',
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
        marginTop: "10%",
        width: '100%',
        backgroundColor: COLORS.white,
        borderRadius: 15
    },
    rowview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        // width:"100%",
        // margin:"0%",
        bottom: 0,
        alignItems: "center",
        //marginTop: 22,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 0
    },
    modalView: {
        flex: 1,
        //  margin: 20,
        backgroundColor: COLORS.white,
        //  borderRadius: 20,
        padding: 35,
        width: '100%',
        height: '50%',
        marginTop: "50%",
        marginBottom: '0%',
        bottom: 0,
        alignItems: "center",
        borderTopEndRadius: 50,
        borderTopStartRadius: 50,

    },
    modalText: {
        padding: 5,
        fontSize: 20,
        color: COLORS.black,
        textAlign: "justify"
    },
    textInputView: {
        borderWidth: 1,
        borderColor: COLORS.pureblue,
        borderRadius: 10,
        marginVertical: 12,
        marginHorizontal: 20,
        padding: 7,
        width: "100%"
    },
    textStyle: {
        paddingTop: 4,
        ...FONTS.appFontSemiBold,
        marginStart: 5,
        fontWeight: 'bold',
    },

    textinput: {
        margin: 1,
        marginStart: 2,
    },

});

export default SellPaymentWithDiscount;