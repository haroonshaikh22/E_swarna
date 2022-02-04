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
    BackHandler,
    TouchableOpacity
} from 'react-native';
import PurityContainer from '../../common/PurityContainer';
import { COLORS, IMAGES, FONTS, GLOBALSTYLES } from '../../constants/theme';
import CustomNavigationBar from '../../common/CustomNavigationBar';
import { getTransaction, getRate, handleSell } from '../../../redux/actions/sellGoldAction';

const SellGold = ({ navigation }) => {

    const dispatch = useDispatch();
    const reducerData = useSelector(state => state.sellGoldReducer)

    const [disable, setDisable] = useState(true);
    const [enterValue, setEnterValue] = useState();
    const [enterRate, setEnterRate] = useState();
    const [isWeight, setIsWeight] = useState(true);

    useEffect(() => {
        const unsubscribe = getRateCall()
        getTransactionCall()
        const interval = setInterval(() => getRateCall(), 15000)
        // BackHandler.addEventListener("hardwareBackPress", this.backAction)
        return () => {
            unsubscribe
            clearInterval(interval)
        };
    }, [])

    useEffect(() => {
        handleSellCall()
    }, [enterRate, enterValue])

    const getTransactionCall = async () => {
        dispatch(getTransaction());
    }

    const getRateCall = async () => {
        dispatch(getRate(navigation));
    }


    const updateGoldValue = (val) => {
        setEnterRate(val)
        if (!val) {
            setEnterValue()
        } else {
            setDisable(false);
            setIsWeight(true)
            var sellgoldweight = parseFloat(val)
            var sellrate;
            if (reducerData.discountAppliedForSale === true) {
                sellrate = reducerData.discountSellRate
            } else {
                sellrate = reducerData.sellRate
            }
            let sellvalue = (sellgoldweight * sellrate) + (sellgoldweight * sellrate * reducerData.salesTax / 100)
            let newSaleValue = (sellvalue * 100) / 100;
            setEnterValue(newSaleValue.toString())
        }
    }
    const updateGoldWeight = (val) => {
        setEnterValue(val)
        if (!val) {
            setEnterRate()
        } else {
            setDisable(false);
            setIsWeight(false)
            var sellgoldValue = parseFloat(val);
            var sellrate1;
            if (reducerData.discountAppliedForSale === true) {
                sellrate1 = reducerData.discountSellRate
            } else {
                sellrate1 = reducerData.sellRate
            }
            let sellweight = sellgoldValue / ((1 + reducerData.salesTax / 100) * sellrate1);
            let sellnewWeight = (sellweight * 10000) / 10000;
            setEnterRate(sellnewWeight.toString())
        }
    }


    const handleSellCall = async () => {
        dispatch(handleSell(reducerData.blockId, enterValue, isWeight, 2, enterRate));
    }

    const sellclick = () => {
        console.log("discountApplied :", reducerData)
        if (reducerData.discountApplied) {
            navigation.navigate('SellPaymentWithDiscount')
        }
        else {
            navigation.navigate('Sellpayment')
        }
    }

    // backAction = () => {
    //     onPress: BackHandler.exitApp();
    // };

    return (
        <SafeAreaView style={styles.containermain}>
            <CustomNavigationBar headername="Sell" icon_name='cart' back={true} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={IMAGES.background_new} resizeMode="stretch" style={styles.image} />

                    <PurityContainer textTitle={
                        reducerData.discountAppliedForSale === true ? "Sell Rate(Rs.)-" + reducerData.discountSellRate + "/Gm" : "Sell Rate(Rs.)-" + reducerData.sellRate + "/Gm"
                    }
                        optionalTitle={
                            reducerData.discountAppliedForSale === true ? <Text style={GLOBALSTYLES.optionalText}>{reducerData.sellRate}/gm</Text> : null
                        }
                    />

                    <View style={styles.container}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                            <Text style={GLOBALSTYLES.textwithunderline}>GOLD </Text>
                            <Text style={{ fontSize: 14, color: COLORS.black, marginTop: 2 }}>(Purity: 99.9%) </Text>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ fontSize: 16, color: COLORS.black, textAlign: 'right', fontWeight: 'bold' }}>{reducerData.sellGoldBalance}</Text>
                                <Text style={{ fontSize: 14, color: COLORS.black }}>Gold Balance(gm)</Text>
                            </View>
                        </View>

                        <View style={GLOBALSTYLES.TextInputView}>
                            <TextInput placeholder="Enter gold in four decimals"
                                style={{ padding: 10 }}
                                value={enterRate}
                                onChangeText={(val) => (updateGoldValue(val))}
                                keyboardType='numeric'
                                returnKeyType="go"
                                maxLength={10}>
                            </TextInput>
                        </View>

                        <View style={GLOBALSTYLES.TextInputView}>
                            <TextInput placeholder="Enter vlaue in round figure (GST)"
                                style={{ padding: 10, }}
                                keyboardType='numeric'
                                returnKeyType="go"
                                value={enterValue}
                                onChangeText={(val) => updateGoldWeight(val)}
                                maxLength={10}>
                            </TextInput>
                        </View>

                        <TouchableOpacity
                            style={
                                {
                                    backgroundColor: disable ? COLORS.Lightgray : COLORS.pureblue,
                                    marginTop: 20, padding: 15,
                                    borderRadius: 8,
                                    width: '100%'
                                }
                            }
                            disabled={disable}
                            onPress={() => sellclick()}>
                            <Text style={{ color: COLORS.white, textAlign: 'center' }}>Sell</Text>
                        </TouchableOpacity>

                        {/* <Button mode='contained' disabled={disable}
                            color={COLORS.pureblue}
                            style={{
                                marginTop: 20, padding: 10,
                                borderRadius: 8
                            }}
                        > Sell
                        </Button> */}
                    </View>

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
    container: {
        alignContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.pureblue,
        padding: 20,
        marginTop: 20,
        marginBottom: '10%',
        width: '85%',
        backgroundColor: COLORS.white,
        borderRadius: 15
    },
    image: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        marginRight: 30,
        justifyContent: "center",
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    text: {
        color: COLORS.black,
        fontSize: 42,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
    }
});

export default SellGold;