import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    Image,
    SafeAreaView
} from 'react-native';
import PurityContainer from '../../common/PurityContainer';
import { COLORS, IMAGES, FONTS, GLOBALSTYLES } from '../../constants/theme';
import { Button } from 'react-native-paper';
import Slider from '../Slider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomNavigationBar from '../../common/CustomNavigationBar';

const Successfulpayment = ({ navigation, route }) => {

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {

    }
    
    return (
        <SafeAreaView style={styles.containermain}>
            <CustomNavigationBar headername="Buy" icon_name='cart' back={true} />
            <View style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center', width: "100%" }}>
                <View style={styles.topView}></View>
                <ScrollView
                    style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                        <View style={styles.container}>
                            <Text style={{ textAlign: 'center', fontSize: 20, color: COLORS.black, padding: 10, margin: 10, fontWeight: 'bold' }}>Transaction Details</Text>
                            <View style={styles.rowview}>
                                <Text style={styles.textheader}>Transaction Id</Text>
                                <Text style={styles.textheader}>Transaction Amount</Text>
                            </View>

                            <View style={styles.rowview}>
                                <Text style={styles.subtext}>order_id45451521521</Text>
                                <Text style={styles.subtext}>Rs.57451</Text>
                            </View>

                            <View style={styles.rowview}>
                                <Text style={styles.textheader}>Transaction Date</Text>
                                <Text style={styles.textheader}>Transaction Time</Text>
                            </View>

                            <View style={styles.rowview}>
                                <Text style={styles.subtext}>17/12/2021</Text>
                                <Text style={styles.subtext}>04:50:00</Text>
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
                                borderRadius: 8, width: '100%',
                            }}>
                            <Text style={{ color: COLORS.white, textAlign: 'center' }}>Proceed</Text>
                        </TouchableOpacity>

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

export default Successfulpayment;