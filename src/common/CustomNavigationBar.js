import React, { useState } from 'react';
import { Appbar, Menu } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { IMAGES, GLOBALSTYLES, COLORS } from '../constants/theme'
import { useNavigation } from '@react-navigation/native'
import { URL } from '../constants/configure';
import { useTranslation } from 'react-i18next';


function CustomNavigationBar({ navigation, back, headername, icon_name }) {
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const { t } = useTranslation();

    navigation = useNavigation();

    function navfun() {
        if (icon_name === "login") {
            navigation.navigate('Login');
        }
    };

    handelClick = (screenName, param = {}) => {
        closeMenu();
        navigation.navigate(screenName, param);
    }

    return (
        <Appbar.Header style={styles.appbarstyle} >
            {back ?
                <Appbar.BackAction onPress={() => {
                    navigation.goBack();
                }} color={COLORS.pureblue} />
                :
                <View style={{ width: 50, backgroundColor: 'blue' }}></View>
            }

            <View style={{ alignItems: "center", justifyContent: 'center', }}>
                <Image
                    source={IMAGES.eSwarna_Logo}
                    resizeMode='contain'
                    style={styles.logostye}
                />
                {headername != null ?
                    <Text style={styles.subtitleText}>{headername}</Text> 
                    :
                    null}
            </View>
            <View style={{ flexDirection: "row" }}>
                {icon_name === 'login' ?
                    <TouchableOpacity
                        onPress={() => navfun()}
                        style={{ justifyContent: "center", paddingHorizontal: 6, }}>
                        <Text style={{ fontFamily: 'icomoon', color: COLORS.pureblue, fontSize: 24 }}>Z</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        onPress={() => navfun()}
                        style={{ justifyContent: "center", paddingHorizontal: 6 }}>
                        <Text style={{ fontFamily: 'icomoon', color: COLORS.pureblue, fontSize: 24 }}>f</Text>
                    </TouchableOpacity>

                }
                {!back ? (
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={
                            <Appbar.Action icon="dots-vertical" color={COLORS.pureblue} onPress={openMenu} style={{ margin: 0 }} />
                        }>
                        <Menu.Item onPress={() => { handelClick("Login") }} title="Log In" />
                        <Menu.Item
                            title={t('termsNConditions')}
                            onPress={() => {
                                handelClick("TermsCondition", { title: (t('termsNConditions')), url: URL.TERMSANDCONDITION });
                            }} />
                        <Menu.Item
                            title={t('contactUs')}
                            onPress={() => { }} />
                        <Menu.Item
                            title={t('faqs')}
                            onPress={() => {
                                handelClick("TermsCondition", { title: (t('faqs')), url: URL.FAQ });

                            }} />
                        <Menu.Item
                            title={t('privacyPolicy')}
                            onPress={() => {
                                handelClick("TermsCondition", { title: (t('privacyPolicy')), url: URL.PRIVACYPOLICY });

                            }} />
                        <Menu.Item
                            title={t('aboutUsF')}
                            onPress={() => { }} />
                        <Menu.Item
                            title={t('sip')}
                            onPress={() => { }} />
                        <Menu.Item
                            title={t('sipBenefits')}
                            onPress={() => { }} />
                        <Menu.Item
                            title={t('trusteeCertificate')}
                            onPress={() => { }} />
                        <Menu.Item
                            title={t('language')}
                            onPress={() => {
                                handelClick("Language");
                            }} />
                    </Menu>
                ) : (<Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={

                        <Appbar.Action icon="dots-vertical" color={COLORS.pureblue} onPress={openMenu} style={{ margin: 0 }} />
                    }>
                    <Menu.Item onPress={() => { }} title="Log In" />
                    <Menu.Item onPress={() => { }} title="Terms & Conditions" />
                    <Menu.Item onPress={() => { }} title="Contact Us" />
                    <Menu.Item onPress={() => { }} title="FAQ's" />
                    <Menu.Item onPress={() => { }} title="Privacy Policy" />
                    <Menu.Item onPress={() => { }} title="About Us" />
                    <Menu.Item onPress={() => { }} title="SIP" />
                    <Menu.Item onPress={() => { }} title="SIP Benifit's" />
                    <Menu.Item onPress={() => { }} title="Trustee Certificate" />
                    <Menu.Item onPress={() => { }} title="Language" />
                </Menu>)}
            </View>

        </Appbar.Header>
    );
}
const styles = StyleSheet.create({
    appbarstyle: {
        backgroundColor: COLORS.white,
        height: 60,
        alignContent: "center",
        justifyContent: 'space-between',
        headerTintColor: COLORS.pureblue
    },
    subtitleText: {
        color: COLORS.pureblue,
        fontWeight: 'bold',
        alignContent: 'center',
        justifyContent: 'center',
    },
    logostye: {
        height: 35,
        width: 100,
        alignContent: 'center',
        justifyContent: 'center',
    },
    titlestyle: {
        alignItems: "center",
        justifyContent: 'center',
        alignContent: 'center',
        color: COLORS.pureblue,
    }
});

export default CustomNavigationBar;