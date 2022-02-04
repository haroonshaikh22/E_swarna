import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
} from 'react-native';
import { FONTS, COLORS, IMAGES, GLOBALSTYLES } from '../../constants/theme';
import EntypoIcon from 'react-native-vector-icons/dist/Entypo';
import AntDesignIcon from 'react-native-vector-icons/dist/AntDesign';
import { useTranslation } from 'react-i18next';

const Successfullupdate = ({ navigation }) => {
    const { t } = useTranslation();

    return (
        <SafeAreaView style={styles.safeContainerStyle}>
            <View
                style={GLOBALSTYLES.backButtonView}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    {Platform.OS == "ios" ?
                        <EntypoIcon name="chevron-thin-left" size={30} />
                        :
                        <AntDesignIcon name="arrowleft" size={30} />
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.headercontainer}>
                    <Image source={IMAGES.eSwarna_Logo} />
                </View>

                <View style={{ margin: 30, alignContent: 'center', marginTop: 40 }}>
                    <Image source={IMAGES.successsmall} />
                </View>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 18,
                    padding: 5,
                    margin: 5
                }}>{t('newPasswordUpdatedSuccess')}</Text>
                <TouchableOpacity
                    style={styles.btnstyle}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.btnTextStyle}>{t('proceed')}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeContainerStyle: {
        flex: 1,
        backgroundColor: 'white',
    },
    mainContainer: {
        alignContent: 'center',
        alignItems: 'center',
        margin: 5,
        padding: 5,
        height: Dimensions.get('screen').height - 40,
    },
    container: {
        alignContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    headercontainer: {
        alignContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
    },
    btnstyle: {
        borderRadius: 10,
        backgroundColor: COLORS.pureblue,
        justifyContent: 'center',
        margin: 10,
        width: Dimensions.get('screen').width - 40,
        marginTop: 100
    },
    btnTextStyle: {
        color: COLORS.white,
        padding: 15,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Successfullupdate;