import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';

import {
    View,
    Text,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Switch,
    TextInput,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Dimensions, Platform
} from 'react-native';

import PurityContainer from '../common/PurityContainer';
import { COLORS, IMAGES, FONTS, GLOBALSTYLES } from '../constants/theme';
import Slider from './Slider';
import CustomNavigationBar from '../common/CustomNavigationBar';
import { getDashboardInfo, getAppVersion } from '../../redux/actions/homePageAction';

const GuestHomePage = ({ navigation }) => {
    const [toggle, setToggle] = useState(false);
    const [disable, setDisable] = useState(true);
    const [enterValue, setEnterValue] = useState();
    const [enterRate, setEnterRate] = useState();
    const { t } = useTranslation();
    // const [data, setData] = useState({
    //     buyRate: 0.0,
    //     sellRate: 0.0,
    //     discountAppliedForBuy: false,
    //     discountAppliedForSale: false,
    //     discountBuyRate: 0,
    //     discountSellRate: 0,
    //     purchaseTax: 0.0,
    //     salesTax: 0.0,
    // })

    const dispatch = useDispatch();
    const reducerData = useSelector(state => state.homePageReducer);

    useEffect(() => {
        const unsubscribe = getDashboardInfoCall();
        const interval = setInterval(() => getDashboardInfoCall(), 15000);
        return () => {
            unsubscribe;
            clearInterval(interval);
        };
    }, [])

    useEffect(() => {
        getAppVersionCall();
    }, [])

    updateGoldValue = (val) => {
        setEnterRate(val)
        if (toggle === true) {
            if (!val) {
                setEnterValue()
            } else {
                setDisable(false);
                var sellgoldweight = parseFloat(val)
                var sellrate;
                if (reducerData.dashboardInfo.discountAppliedForSale === true) {
                    sellrate = reducerData.dashboardInfo.saleGoldRateAfterDiscount
                }
                else {
                    sellrate = reducerData.dashboardInfo.saleGoldRate
                }
                let sellvalue = (sellgoldweight * sellrate) + (sellgoldweight * sellrate * reducerData.salesTax / 100)
                let newSaleValue = (sellvalue * 100) / 100;
                setEnterValue(newSaleValue.toString())
            }
        } else {
            if (!val) {
                setEnterValue()
            } else {
                setDisable(false);
                var goldweight = parseFloat(val);

                var rate;
                if (reducerData.dashboardInfo.discountAppliedForBuy === true) {
                    rate = reducerData.dashboardInfo.buyGoldRateAfterDiscount
                } else {
                    rate = reducerData.dashboardInfo.buyGoldRate
                }

                let value = goldweight * rate;
                let TotVal = value + (goldweight * rate * reducerData.purchaseTax / 100);
                let newValue = (TotVal * 100) / 100;
                setEnterValue(newValue.toString())

            }
        }
    }

    updateGoldWeight = (val) => {
        setEnterValue(val)
        if (toggle === true) {
            if (!val) {
                setEnterRate()
            } else {
                setDisable(false);
                var sellgoldValue = parseFloat(val);
                var sellrate1;
                if (reducerData.dashboardInfo.setDiscountAppliedForSale === true) {
                    sellrate1 = reducerData.dashboardInfo.saleGoldRateAfterDiscount
                } else {
                    sellrate1 = reducerData.dashboardInfo.saleGoldRate
                }
                let sellweight = sellgoldValue / ((1 + reducerData.salesTax / 100) * sellrate1);
                let sellnewWeight = (sellweight * 10000) / 10000;
                setEnterRate(sellnewWeight.toString())
            }

        }
        else {
            if (!val) {
                setEnterRate()
            } else {
                setDisable(false);
                var goldValue = parseFloat(val);
                var rate1;
                if (reducerData.dashboardInfo.discountAppliedForBuy === true) {
                    rate1 = reducerData.dashboardInfo.buyGoldRateAfterDiscount
                } else {
                    rate1 = reducerData.dashboardInfo.buyGoldRate
                }
                let weight = goldValue / ((1 + reducerData.purchaseTax / 100) * rate1);
                let newWeight = (weight * 10000) / 10000;
                setEnterRate(newWeight.toString())
            }
        }
    }

    getDashboardInfoCall = () => {
        dispatch(getDashboardInfo());
    }

    getAppVersionCall = () => {
        dispatch(getAppVersion());
    }

    // buyRate

    return (
        <SafeAreaView style={styles.containermain}>
            <CustomNavigationBar icon_name='login' />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.containermain}
            >
                <ImageBackground
                    source={IMAGES.backgroud3}
                    resizeMode="cover">

                    <View style={{ alignSelf: "flex-start", marginLeft: 55 }}>
                        <PurityContainer textTitle={toggle ?
                            reducerData.dashboardInfo.discountAppliedForSale === true ?
                                t("sellRate") + "(Rs.)-" + reducerData.dashboardInfo.saleGoldRateAfterDiscount + t("sellRate") + "/" + t("gm")
                                :
                                t("sellRate") + "(Rs.)-" + reducerData.dashboardInfo.saleGoldRate + "/" + t("gm")
                            :
                            reducerData.dashboardInfo.discountAppliedForBuy === true ?
                                t('buyRate') + "(Rs.)-" + reducerData.dashboardInfo.buyGoldRateAfterDiscount + "/" + t("gm")
                                :
                                t('buyRate') + "(Rs.)-" + reducerData.dashboardInfo.buyGoldRate + "/" + t("gm")}
                            optionalTitle={toggle ?
                                reducerData.dashboardInfo.discountAppliedForSale === true ?
                                    <Text style={GLOBALSTYLES.optionalText}>{reducerData.dashboardInfo.saleGoldRate}/{t("gm")}</Text>
                                    :
                                    null
                                :
                                reducerData.dashboardInfo.discountAppliedForBuy === true ?
                                    <Text style={GLOBALSTYLES.optionalText}>{reducerData.dashboardInfo.buyGoldRate}/{t("gm")}</Text>
                                    :
                                    null
                            }
                        />
                    </View>

                    <View style={styles.container}>
                        <View style={{ marginHorizontal: 4, flexDirection: 'row', justifyContent: "space-between" }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'column', marginLeft: 6 }}>
                                    <Text style={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        color: COLORS.black,
                                        textDecorationColor: COLORS.pureblue,
                                    }}>{t('gold')} </Text>
                                    <View style={{ flexDirection: "row", marginTop: 5, borderRadius: 20, backgroundColor: COLORS.pureblue }}>
                                        <View style={{ borderColor: COLORS.pureblue, paddingHorizontal: 12, borderWidth: 4, borderRadius: 5 }} />
                                    </View>
                                </View>

                                <View style={{ marginHorizontal: 6 }}>
                                    <Text style={styles.smallText}>({t('purity')}:99.9%) </Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.mediumText}>{t('buys')}</Text>
                                <Switch
                                    trackColor={{ false: COLORS.Lightgray, true: COLORS.Paleblue }}
                                    thumbColor={COLORS.pureblue}
                                    ios_backgroundColor="#ddd"
                                    onValueChange={(value) => setToggle(value)}
                                    value={toggle}
                                />
                                <Text style={styles.mediumText}>{t('sells')}</Text>
                            </View>
                        </View>

                        <View style={GLOBALSTYLES.TextInputView}>
                            <Text style={{ marginHorizontal: 4, fontFamily: 'icomoon', color: COLORS.pureblue, fontSize: 18 }}>k</Text>
                            <TextInput placeholder={t('enterGoldInFourDecimals')}
                                style={styles.textInputStyle}
                                value={enterRate}
                                onChangeText={(val) => (updateGoldValue(val))}
                                keyboardType='numeric'
                                returnKeyType="go"
                                maxLength={10}>
                            </TextInput>
                        </View>

                        <View style={{ alignItems: "center" }}>
                            <Text style={{ marginVertical: 6, fontFamily: 'icomoon', fontSize: 24, }}>m</Text>
                        </View>

                        <View style={GLOBALSTYLES.TextInputView}>
                            <Text style={{ marginHorizontal: 4, fontFamily: 'icomoon', color: COLORS.pureblue, fontSize: 16, }}>G</Text>
                            <TextInput placeholder={t('enterValueInRoundFigGstExcluded')}
                                style={styles.textInputStyle}
                                keyboardType='numeric'
                                returnKeyType="go"
                                value={enterValue}
                                onChangeText={(val) => updateGoldWeight(val)}
                                maxLength={10}>
                            </TextInput>
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.button, {
                                    backgroundColor: disable ?
                                        COLORS.Lightgray
                                        :
                                        COLORS.pureblue
                                },
                            ]}
                            disabled={disable}
                            onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.toggleStyle}> {toggle ?
                                (t('quick') + " " + t('sells')) : (t('quickBuy'))}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.sliderview}>
                        <Text style={styles.bigText}>{t('howItWORKS')}</Text>
                        <Slider />
                    </View>

                    <View style={styles.bottomView}>
                        <View style={styles.bottomViewStyle}>
                            <View style={styles.columnview}>
                                <Text style={styles.bottomText}>{t('actingAsTrustee')}</Text>
                                <Image
                                    source={IMAGES.idbi}
                                    style={styles.idbiStyle} />
                            </View>
                            <View style={styles.columnview}>
                                <Text style={styles.bottomText}>{t('poweredBy')}</Text>
                                <Image
                                    source={IMAGES.augomont}
                                    style={styles.augomontStyle} />
                            </View>
                        </View>
                        <Image
                            source={IMAGES.muthoot}
                            style={styles.muthootStyle} />
                        <Text style={styles.bottomVersionText}>{t('version')} {reducerData.versionInfo.currentVersion}</Text>
                    </View>

                </ImageBackground>
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    containermain: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    container: {
        borderWidth: 1,
        borderColor: COLORS.Lightgray,
        marginTop: 10,
        marginHorizontal: 20,
        paddingTop: 25,
        padding: 10,
        backgroundColor: COLORS.white,
        borderRadius: 15,
    },
    image: {
        height: 1362,
        width: Dimensions.get('screen').width - 1,
        justifyContent: "center",
        alignContent: 'center',
        alignItems: 'center'
    },

    bigText: {
        textAlign: 'center',
        color: COLORS.black,
        fontSize: 30,
        padding: 10
    },
    sliderview: {
        flex: 1,
        padding: 10,
        marginHorizontal: 35,
        ...Platform.select({
            android: {
                height: Dimensions.get("screen").height,
            },
            ios: {
                height: Dimensions.get("screen").height / 1.3,

            }
        })
    },
    columnview: {
        flexDirection: 'column',
        padding: 10,
        margin: 10
    },
    bottomView: {
        // flex: 0.28,
        width: "100%",
        backgroundColor: COLORS.pureblue,
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        alignItems: 'center'
    },
    textStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    smallText: {
        fontSize: 14,
        color: COLORS.black,
        // marginTop: 2,
    },
    mediumText: {
        fontSize: 16,
        color: COLORS.black,
        marginHorizontal: 6,
    },
    text: {
        color: COLORS.black,
        fontSize: 42,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
    },
    button: {
        marginTop: 10,
        paddingHorizontal: 100,
        paddingVertical: 20,
        borderRadius: 8,
    },
    textInputImg: {
        flexDirection: 'row',
        marginTop: 18,
        marginStart: 5
    },
    textInputStyle: {
        padding: 10,
        marginRight: 6,
        flexShrink: 1

    },
    toggleStyle: {
        color: COLORS.white,
        textAlign: 'center'
    },
    bottomViewStyle: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    bottomText: {
        color: COLORS.white,
        fontSize: 14,
        margin: 5
    },
    bottomVersionText: {
        color: COLORS.white,
        fontSize: 16,
        margin: 1
    },
    idbiStyle: {
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
    }

});

export default GuestHomePage;