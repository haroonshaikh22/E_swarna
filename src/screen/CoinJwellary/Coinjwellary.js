import { View, Text, ScrollView, StyleSheet, TextInput, Image, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { COLORS, IMAGES, FONTS, GLOBALSTYLES } from '../../constants/theme';
import { Button } from 'react-native-paper';
import CustomNavigationBar from '../../common/CustomNavigationBar';
import React from 'react';

const Coinjwellary = ({ navigation }) => {
    function passjwellery() {
        navigation.navigate('Product', {
            name: ' SwarnaVasham Jewellery'
        })
    };

    function passcoin() {
        navigation.navigate('Product', {
            name: "SwarnaVasham Coin"
        })
    };

    return (
        <SafeAreaView style={styles.containermain}>
            <CustomNavigationBar headername="Coin/Jewellery" icon_name='cart' back={true} />
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.smallContainer}>
                    <Image
                        source={IMAGES.background_new} resizeMode="stretch" style={styles.image} />
                    <View style={styles.container}>
                        <View style={styles.containerBox}>
                            <Text style={GLOBALSTYLES.textwithunderline}>GOLD </Text>
                            <Text style={styles.purityText}>(Purity: 99.9%) </Text>
                        </View>
                        <View style={styles.viewtext}>
                            <Text style={styles.zeroText}>0.0000(gms)</Text>
                            <Text style={styles.zeroStyle}> 0.0000(gms) </Text>
                        </View>
                        <View style={styles.viewtext}>
                            <Text style={styles.textStyle}>Gold available for Redemption(gm)</Text>
                            <Text style={styles.textStyle1}>Redeem jewellery upto(gm)</Text>
                        </View>
                        <View style={GLOBALSTYLES.TextInputView}>
                            <Image source={IMAGES.goldbar}
                                style={styles.textInputImg} />
                            <TextInput placeholder="Enter gold in four decimals"
                                style={styles.textInputStyle}
                                keyboardType='numeric'
                                returnKeyType="go"
                                //autoFocus={true}
                                maxLength={10}>
                            </TextInput>
                        </View>

                        <Button mode='contained'
                            color='#0099FF'
                            style={styles.buttonStyle}
                            onPress={passjwellery}
                        > Redeem as Jewellery
                        </Button>

                        <Button mode='contained'
                            color='#0099FF'
                            style={styles.buttonStyle}
                            onPress={passcoin}
                        > Redeem as coin
                        </Button>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    containermain: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    smallContainer: {
        flex: 1,
        justifyContent: "center",
        alignContent: 'center',
        alignItems: 'center',
    },
    image: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: Dimensions.get('screen').width - 1,
    },
    container: {
        alignContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.Lightgray,
        padding: '4%',
        marginTop: "55%",
        marginBottom: '10%',
        //  width: '85%',
        backgroundColor: COLORS.white,
        borderRadius: 15,
        width: Dimensions.get('screen').width - 50,
    },
    containerBox: {
        flexDirection: 'row',
        padding: '3%',
    },
    purityText: {
        ...FONTS.appFontMedium,
        color: 'black',
        margin: '1%'
    },
    viewtext: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '2%',
        flexWrap: 'wrap',

    },
    zeroText: {
        ...FONTS.appFontMedium,
        color: 'black',
        fontWeight: 'bold'
    },
    zeroStyle: {
        ...FONTS.appFontMedium,
        color: 'black',
        textAlign: 'right',
        fontWeight: 'bold'
    },
    textStyle: {
        ...FONTS.appFontMedium,
        color: 'black',
        textAlign: 'left',
        flex: 0.5,
        flexWrap: 'wrap',
    },
    textStyle1: {
        ...FONTS.appFontMedium,
        color: 'black',
        textAlign: 'right',
        flex: 0.6,
        flexWrap: 'wrap',

    },
    textInputStyle: {
        padding: '4%',
    },
    textInputImg: {
        flexDirection: 'row',
        marginTop: 18,
        marginStart: 5
    },
    buttonStyle: {
        marginTop: '5%',
        padding: '3%',
        borderRadius: 8,
        width: Dimensions.get('screen').width - 85
    }
});
export default Coinjwellary;