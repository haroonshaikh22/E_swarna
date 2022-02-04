import React from "react";

import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../constants/theme'
import { useTranslation } from 'react-i18next';


const PurityContainer = ({ textTitle, optionalTitle }) => {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <Text style={styles.textstyleRegular}> {textTitle}</Text>
            {optionalTitle}
            <Text style={styles.textstyleRegular}> (24k 99.9% ){t('purity')}</Text>
            <Text style={styles.textstylesmall}> {t('gstNotIncluded')}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        //  flexDirection: 'column',
        padding: 5,
        marginTop: "35%",
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.Vividorange,
        marginLeft: 8,
        // marginRight: 12,
        // width: '60%',
        borderBottomRightRadius: 25,
    },
    textstyleRegular: {
        color: COLORS.Matterhorn,
        ...FONTS.appFontMedium,
    },
    textstylesmall: {
        color: COLORS.Matterhorn,
        ...FONTS.appFontRegularsmall,
        fontSize:10
    }
});

export default PurityContainer;
