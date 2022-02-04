import React from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import { IMAGES, GLOBALSTYLES, COLORS } from '../constants/theme'
import { WebView } from 'react-native-webview';
import EntypoIcon from 'react-native-vector-icons/dist/Entypo';
import AntDesignIcon from 'react-native-vector-icons/dist/AntDesign';
import { useTranslation } from 'react-i18next';

const TermsCondition = ({ navigation, route }) => {
    const { i18n } = useTranslation();
    let appLang = i18n.language;


    var url = route.params.url + appLang;
    var title = route.params.title;
    console.log('language', url);

    return (
        <SafeAreaView style={styles.containermain}>
            <View style={{
                flexDirection: 'row',
                paddingVertical: 20,
                backgroundColor: '#dddddd',
                justifyContent: 'space-around',
            }}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={{ marginLeft: 10, }}
                        onPress={() => navigation.goBack()}>
                        {Platform.OS == "ios" ?
                            <EntypoIcon name="chevron-thin-left" size={30} />
                            :
                            <AntDesignIcon name="arrowleft" size={30} />
                        }
                    </TouchableOpacity>
                </View>
                <View style={{
                    alignSelf: 'center',
                    alignItems: "center",
                    justifyContent: 'center',
                    alignContent: 'center',
                    flexDirection: 'column',
                    flex: 1,
                }}>
                    <Image
                        source={IMAGES.eSwarna_Logo}
                        resizeMode='contain'
                        style={styles.logostyle} />
                    <Text style={styles.subtitleText}>{title}</Text>
                </View>
                <View style={{ flex: 1 }}>
                </View>

            </View>
            <WebView
                source={{ uri: url }}
                style={{ margin: 5, padding: 5 }}
                startInLoadingState={true}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    containermain: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    logostyle: {
        height: 35,
        width: 100,
        alignContent: 'center',
        justifyContent: 'center',
    },
    subtitleText: {
        color: COLORS.black,
        fontWeight: 'bold',
        alignContent: 'center',
        justifyContent: 'center',
        fontSize: 12
    },
});

export default TermsCondition;