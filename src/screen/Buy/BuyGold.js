import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import {
    View, Text,
    ScrollView, StyleSheet, ActivityIndicator, Switch,
    TextInput, SafeAreaView, TouchableOpacity, Image, Dimensions
} from 'react-native';
import { Button } from 'react-native-paper';
import { getTransaction, getRate, handleBuy } from '../../../redux/actions/buyGoldAction';
import PurityContainer from '../../common/PurityContainer';
import { COLORS, IMAGES, FONTS, GLOBALSTYLES } from '../../constants/theme';
import CustomNavigationBar from '../../common/CustomNavigationBar';
import { useTranslation } from 'react-i18next';
import { getAppVersion } from '../../../redux/actions/homePageAction';


const BuyGold = ({ navigation }) => {
    const { t } = useTranslation();
    const [disable, setDisable] = useState(true);
    const [enterAmount, setEnterAmount] = useState();
    const [enterWeight, setEnterWeight] = useState();
    const [isWeight, setIsWeight] = useState(true);

    const dispatch = useDispatch();
    const reducerData = useSelector(state => state.buyGoldReducer)
    // console.log("buyGoldReducerData", reducerData)
    // console.log("buyGoldReducerDataBlockId", reducerData.handalBuyResponse.blockIdgetRet)
    const reducerDataDashboard = useSelector(state => state.homePageReducer);


    useEffect(() => {
        getRateCall();
        const interval = setInterval(() => getRateCall(), 15000)
        return () => {
            clearInterval(interval)
        };
    }, []);

    useEffect(() => {
        handleBuyCall()
        getAppVersionCall();
        getData();
    }, [enterWeight, enterAmount])

    const getData = async () => {
        dispatch(getTransaction());
    }
    getAppVersionCall = () => {
        dispatch(getAppVersion());
    }
    const getRateCall = async () => {
        dispatch(getRate())
    }

    const handleBuyCall = async () => {
        if (reducerData.getRateResponse.blockId != undefined && enterAmount != undefined && enterWeight != undefined) {
            dispatch(handleBuy(reducerData.getRateResponse.blockId, enterAmount, isWeight, enterWeight));
        }
    }

    const updateGoldValue = (val) => {
        console.log('updateGoldValue', val)
        setEnterWeight(val)
        if (!val) {
            setEnterAmount()
        } else {
            setDisable(false);
            setIsWeight(true)
            var goldweight = parseFloat(val);

            var rate;
            if (reducerData.getRateResponse.discountApplied) {
                rate = reducerData.getRateResponse.goldRateAfterDiscount
            } else {
                rate = reducerData.getRateResponse.buyGoldRate
            }

            let value = goldweight * rate;
            let TotVal = value + (goldweight * rate * reducerData.purchaseTax / 100);
            let newValue = (TotVal * 100) / 100;
            setEnterAmount(newValue.toString())
        }
    }

    const updateGoldWeight = (val) => {
        setEnterAmount(val)
        if (!val) {
            setEnterWeight()
        } else {
            setDisable(false);
            setIsWeight(false)
            var goldValue = parseFloat(val);
            var rate1;
            if (reducerData.getRateResponse.discountApplied) {
                rate1 = reducerData.getRateResponse.goldRateAfterDiscount
            } else {
                rate1 = reducerData.getRateResponse.buyGoldRate
            }
            let weight = goldValue / ((1 + reducerData.purchaseTax / 100) * rate1);
            let newWeight = (weight * 10000) / 10000;
            setEnterWeight(newWeight.toString())
        } 
    }

    const buyclick = () => {
        // if (reducerData.getRateResponse.discountApplied) {
        //     // console.log("---------------", reducerData)
            navigation.navigate('payment');
        // } else {
        //     console.log(reducerData)
        //     navigation.navigate('PaymentWithoutDiscount');
        // }
    }

    return (

        <SafeAreaView style={styles.containermain}>

            <CustomNavigationBar headername={t('buys')} icon_name='cart' />
            {reducerData.isLoading ?
                <View
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator />
                </View>
                :
                <ScrollView style={styles.containermain}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.containersmall}>
                        <Image
                            source={IMAGES.background_new} resizeMode="cover" style={styles.image} />

                        <View style={{ alignSelf: "flex-start", marginLeft: 55 }}>
                            <PurityContainer textTitle={reducerData.getRateResponse.discountApplied ? t('buys') + " " + t('rate') + " " + t('rs') + "-" + reducerData.getRateResponse.goldRateAfterDiscount + "/" + t('gm') : t('buyGold') + " " + t('rate') + " " + t('rs') + "-" + reducerData.getRateResponse.buyGoldRate + "/" + t('gm')}
                                optionalTitle={reducerData.getRateResponse.discountApplied ? <Text style={GLOBALSTYLES.optionalText}>{reducerData.getRateResponse.buyGoldRate}/{t('gm')}</Text> : null}
                            />
                        </View>
                        <View style={styles.container}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, margin: 5 }}>
                                <View style={{ flexDirection: 'column', alignSelf: 'flex-start' }}>
                                    <Text style={GLOBALSTYLES.textwithunderline}>{t('gold')} </Text>
                                    <View style={{ flexDirection: "row", alignSelf: 'flex-start' }}>
                                        <View style={{ borderColor: COLORS.pureblue, paddingHorizontal: 12, borderWidth: 4, borderRadius: 5 }} />
                                    </View>
                                </View>
                                <View style={{ marginHorizontal: 6, marginRight: 20 }}>
                                    <Text style={{ fontSize: 14, color: COLORS.black, margin: 2 }}>({t('purity')}: 99.9%)</Text>
                                </View>
                                <View style={{ flexDirection: 'column', alignSelf: 'flex-end' }}>
                                    <Text style={{ fontSize: 16, color: COLORS.black }}>{t('goldBalance')} </Text>
                                    {/* <Text style={styles.textsmall}>Balance(gm) </Text> */}
                                    <Text style={styles.textmedium}>{reducerData.getTransactionData.buyGoldBalance}</Text>
                                </View>
                            </View>

                            <View style={styles.nonStyle}>
                                <Text style={{ fontSize: 16, color: COLORS.black }}> {t('nonInvoiceBalance')} </Text>
                                <Text style={styles.textmedium}>{reducerData.getTransactionData.nonInvoicedBalance}</Text>
                            </View>

                            <View style={styles.nonStyle}>
                                <Text style={{ fontSize: 16, color: COLORS.black }}> {t('lastTransaction')} </Text>
                                <Text style={styles.textmedium}> {reducerData.getTransactionData.amount} </Text>
                            </View>

                            <Text style={{ fontSize: 16, color: COLORS.black, }}>{t('repeatLastTransaction')}? </Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={styles.orStyle}>
                                <Text style={styles.boldText}
                                    onPress={() => {
                                        setEnterAmount(reducerData.getTransactionData.amount)
                                        updateGoldWeight(reducerData.getTransactionData.amount)
                                    }}
                                > {t('yes')} </Text>
                                    <Text style={styles.textPurity}>  {t('or')}  </Text>
                                    <Text style={styles.boldText}
                                        onPress={() => {
                                            setEnterWeight()
                                            updateGoldValue()
                                        }}
                                    > {t('no')} </Text>
                                </View>
                            </View>

                            <View style={GLOBALSTYLES.TextInputView}>
                                <Text style={{ marginHorizontal: 10, fontFamily: 'icomoon', color: COLORS.pureblue, fontSize: 18, flexShrink: 1 }}>k</Text>
                                <TextInput placeholder={t('enterGoldInFourDecimals')}
                                    style={styles.TextInputStyle}
                                    keyboardType='numeric'
                                    returnKeyType="go"
                                    value={enterWeight && String(enterWeight)}
                                    onChangeText={(val) => updateGoldValue(val)}
                                    autoFocus={true}
                                    maxLength={10}>
                                </TextInput>
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <Text style={{ fontFamily: 'icomoon', fontSize: 24, }}>m</Text>
                            </View>
                            <View style={GLOBALSTYLES.TextInputView}>
                                <Text style={{ marginHorizontal: 10, fontFamily: 'icomoon', color: COLORS.pureblue, fontSize: 16, }}>G</Text>

                                <TextInput placeholder={t('enterValueInRoundFigGstExcluded')}
                                    style={styles.TextInputStyle}
                                    keyboardType='numeric'
                                    returnKeyType="go"
                                    value={enterAmount && String(enterAmount)}
                                    onChangeText={(val) => updateGoldWeight(val)}
                                    maxLength={10}>
                                </TextInput>
                            </View>
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    {
                                        backgroundColor: disable ? COLORS.Lightgray : COLORS.pureblue,
                                    },
                                ]}
                                disabled={disable}
                                onPress={() => buyclick()}>
                                <Text style={styles.btnTextstyle}> {t('buys')}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.menuView}>
                            <View style={styles.menuView}>
                                <View style={{ flexDirection: 'row', padding: 10 }}>
                                    <View>
                                        <TouchableOpacity style={styles.squareview}
                                            onPress={() => navigation.navigate('Buy')}>
                                            <Image
                                                style={styles.imgStyle}
                                                source={IMAGES.Buyx} />
                                        </TouchableOpacity>
                                        <Text style={styles.textStyle}>{t('buYGoldC')}</Text>
                                    </View>
                                    <View>
                                        <TouchableOpacity style={styles.squareview}
                                            onPress={() => navigation.navigate('Sell')}>
                                            <Image
                                                style={styles.imgStyle}
                                                source={IMAGES.Sellx}
                                            />
                                        </TouchableOpacity>
                                        <Text style={styles.textStyle}>{t('sellGold')}</Text>
                                    </View>
                                    <View>
                                        <TouchableOpacity style={styles.squareview}
                                            onPress={() => navigation.navigate('Coin')}>
                                            <Image
                                                style={styles.imgStyle}
                                                source={IMAGES.necklace} />
                                        </TouchableOpacity>
                                        <Text style={styles.textStyle}>{t('coinsJewelleryC')}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', padding: 10 }}>
                                    <View>
                                        <TouchableOpacity style={styles.squareview}>
                                            <Text
                                                style={{
                                                    fontFamily: 'icomoon',
                                                    color: COLORS.pureblue, fontSize: 52, padding: 10, margin: 5
                                                }}>x</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.textStyle}>{t('myOrdersC')}</Text>
                                    </View>
                                    <View>
                                        <TouchableOpacity style={styles.squareview}>
                                            <Text
                                                style={{
                                                    fontFamily: 'icomoon',
                                                    color: COLORS.pureblue, fontSize: 52, padding: 10, margin: 5
                                                }}>D</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.textStyle}>{t('myACCOUNT')}</Text>
                                    </View>
                                    <View>
                                        <TouchableOpacity style={styles.squareview}>
                                            <Image
                                                style={styles.imgStyle}
                                                source={IMAGES.SIP} />
                                        </TouchableOpacity>
                                        <Text style={styles.textStyle}>{t('sip')}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.bottomView}>
                            <View style={styles.bottomViewStyle}>
                                <View style={styles.columnview}>
                                    <Text style={styles.bottomTextStyle}>{t('actingAsTrustee')}</Text>
                                    <Image
                                        source={IMAGES.idbi}
                                        style={styles.idbiStle} />
                                </View>
                                <View style={styles.columnview}>
                                    <Text style={styles.bottomTextStyle}>{t('poweredBy')}</Text>
                                    <Image
                                        source={IMAGES.augomont}
                                        style={styles.augomontStyle} />
                                </View>
                            </View>
                            <Image
                                source={IMAGES.muthoot}
                                style={styles.muthootStyle} />
                            <Text style={styles.versionText}>{t('version')} {reducerDataDashboard.versionInfo.currentVersion}</Text>
                        </View>
                    </View>
                </ScrollView>
            }
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({

    containermain: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    containersmall: {
        alignItems: 'center',
        width: Dimensions.get('screen').width - 1,
        justifyContent: "center",
        alignContent: 'center',
        alignItems: 'center',
    },
    container: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.Lightgray,
        marginTop: 10,
        // paddingTop: 25,
        marginHorizontal: 50,
        paddingVertical: 10,
        backgroundColor: COLORS.white,
        borderRadius: 15,
    },
    image: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: Dimensions.get('screen').width - 1,
        justifyContent: "center",
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    menuView: {
        padding: 10,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: COLORS.white,
    },
    nonStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        alignSelf: 'stretch'
    },
    orStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    bottomView: {
      //  flex: 0.28,
        width: "100%",
        backgroundColor: COLORS.pureblue,
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        alignItems: 'center'
    },
    columnview: {
        flexDirection: 'column',
        padding: 10,
        margin: 10
    },
    squareview: {
        borderWidth: 1,
        borderColor: COLORS.pureblue,
        margin: 10,
        borderRadius: 10
    },
    imgStyle: {
        width: 50,
        height: 50,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',
        margin: 15
    },
    textStyle: {
        textAlign: 'center',
        ...FONTS.appFontRegularsmall
    },
    textsmall: {
        fontSize: 15,
        color: COLORS.black,
        // textAlign: 'right',
    },
    textmedium: {
        fontSize: 16,
        color: COLORS.black,
        textAlign: 'right',
        // marginStart: 30,
        alignSelf: 'flex-end'
        // fontWeight: 'bold'
    },
    textPurity: {
        ...FONTS.appFontMedium,
        color: COLORS.black,

    },
    boldText: {
        // ...FONTS.appNimapFont,
        color: COLORS.black,
        fontWeight: 'bold'
    },
    TextInputStyle: {
        padding: '4%',
        marginStart: '1%',
        flexShrink: 1
    },
    button: {
        marginTop: 10,
        paddingHorizontal: 100,
        paddingVertical: 20,
        borderRadius: 8,
    },
    btnTextstyle: {
        color: COLORS.white,
        textAlign: 'center'
    },
    bottomViewStyle: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    bottomTextStyle: {
        color: COLORS.white,
        ...FONTS.appFontMedium,
        margin: 5
    },
    idbiStle: {
        width: 110,
        height: 30,
        resizeMode: 'contain'
    },
    augomontStyle: {
        width: 102,
        height: 25
    },
    muthootStyle: {
        width: 263,
        height: 38,
        justifyContent: 'center'
    },
    versionText: {
        color: COLORS.white,
        // ...FONTS.appNimapFont,
        margin:5
    }

});
export default BuyGold;