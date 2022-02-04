import React from "react";
import { View, Text, StyleSheet, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { IMAGES, COLORS } from '../constants/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
//import { t } from "i18next";
import { useTranslation } from 'react-i18next';

function BuyScreen() {
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white }}>
      <Image
        source={IMAGES.open_ac}
        style={{ height: 100, width: 111, marginTop: 20 }}
      />
      <Text style={styles.text}>{t('openAnAccount')}</Text>
      <Text style={styles.text1}>A</Text>
      <Image
        source={IMAGES.goldicon}
        style={{ height: 100, width: 111 }}
      />
      <Text style={styles.text}>{t('enterGRAMSofGOLD')}</Text>
      <Text style={{ fontFamily: 'icomoon', color: COLORS.pureblue, fontSize: 30, paddingVertical: 15 }}>A</Text>
      <Image
        source={IMAGES.make_payment}
        resizeMode="stretch"
        style={{ height: 76, width: 111 }}
      />
      <Text style={styles.text}>{t('makePayment')}</Text>
    </View>
  );
}
function SellScreen() {
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white }}>
      <Image
        source={IMAGES.goldicon}
        style={{ height: 100, width: 111, marginTop: 20 }}
      />
      <Text style={styles.text}>{t('chooseToSellbyWeight')}</Text>
      <Text style={styles.text1}>A</Text>

      <Image
        source={IMAGES.surface_1}
        style={{ height: 95, width: 110 }}
        resizeMode="stretch"
      />
      <Text style={styles.text}>{t('selectAccountToCredit')}</Text>
      <Text style={styles.text1}>A</Text>

      <Image
        source={IMAGES.make_payment}

        style={{ height: 70, width: 111 }}
        resizeMode="stretch"
      />
      <Text style={styles.text}>{t('receiveYourFunds')}</Text>
    </View>
  );
}

function CoinScreen() {
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white }}>
      <Image
        source={IMAGES.necklace}
        style={{ height: 100, width: 110, marginTop: 20 }}
        resizeMode="stretch"
      />
      <Text style={styles.text}>{t('selectYourCoinOrJewellery')}</Text>
      <Text style={styles.text1}>A</Text>

      <Image
        source={IMAGES.make_payment}
        resizeMode="stretch"
        style={{ height: 76, width: 111 }}
      />
      <Text style={styles.text}>{t('completePayment')}</Text>
      <Text style={styles.text1}>A</Text>

      <Image
        source={IMAGES.company3x}

        style={{ height: 95, width: 110 }}
        resizeMode="stretch"
      />
      <Text style={styles.text}>{t('collectItFrom')}{t('selectedBranch')}</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();
const Slider = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator screenOptions={{
      tabBarLabelStyle: { fontSize: 13, textAlign: 'center', textTransform: 'none', },
      tabBarItemStyle: { textAlign: 'center' },
      tabBarIndicatorStyle: { backgroundColor: COLORS.pureblue },
      swipeEnabled: true
    }}>
      <Tab.Screen name={t('buys')} component={BuyScreen} />
      <Tab.Screen name={t('sells')} component={SellScreen} />
      <Tab.Screen name={t('coinJewellery')} component={CoinScreen} />

    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  text: {
    justifyContent: "center",
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 16,
    padding: 5,
  },
  text1: {
    fontFamily: 'icomoon',
    color: COLORS.pureblue,
    fontSize: 30,
    paddingVertical: 15,
  }
});

export default Slider;