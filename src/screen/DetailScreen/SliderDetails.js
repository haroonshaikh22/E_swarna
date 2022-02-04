import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import KycDetails from './KycDetails';
import OthersDetails from './OtherDetails';
import NomineeDetails from './NomineeDetails';
import Referral from './Referral';
import { IMAGES, COLORS } from '../../constants/theme';
import EntypoIcon from 'react-native-vector-icons/dist/Entypo';
import AntDesignIcon from 'react-native-vector-icons/dist/AntDesign';
import { useTranslation } from 'react-i18next';


const Tab = createMaterialTopTabNavigator();

const SliderDetails = ({navigation}) => {
  const { t } = useTranslation("common");

  function MyTabBar({ state, descriptors, navigation, position }) {
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          paddingVertical: 25,
        }}
        style={{
          maxHeight: 70,
          flexDirection: 'row',
          marginHorizontal: 20,
          marginBottom: 10,
          borderRadius: 10,
          backgroundColor: '#f7f8fa'
        }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const inputRange = state.routes.map((_, i) => i);
          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map(i => (i === index ? 1 : 0.5)),
          });

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={{ flex: 1, }}
            >
              <Animated.Text
                style={{ opacity, paddingHorizontal: 10 }}>
                {label}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
       <View style={{
                flexDirection: 'row',
                paddingVertical: 20,
                justifyContent:'space-around',
            }}>
                <View style={{flex:1 }}>
                <TouchableOpacity
                    style={{ marginLeft: 10,}}
                    onPress={() => navigation.goBack()}
                >
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
                    flex:1,
                   // marginLeft: '20%'
                }}>
                    <Image
                        source={IMAGES.eSwarna_Logo}
                        resizeMode='contain'
                        style={styles.logostyle}
                    />
                    <Text style={styles.subtitleText}>{t('newCustomer')}</Text>
                </View>
                <View style={{flex:1}}>

                </View>

            </View>
    
       {/* <View style={styles.headercontainer}>
        <Image source={IMAGES.eSwarna_Logo} style={styles.image} />
        <View>
          <Text style={styles.headerText}>New Customer</Text>
        </View>

      </View> */}

      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: "#fff" }}
        tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen name={t('kycDetails')} component={KycDetails} />
        <Tab.Screen name={t('otherDetails')} component={OthersDetails} />
        <Tab.Screen name={t('nomineeDetails')} component={NomineeDetails} />
        <Tab.Screen name={t('referral')} component={Referral} />
      </Tab.Navigator>
    </SafeAreaView>
  ); 
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 8
  },
  headercontainer: {
    alignContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: "#fff"
  },
  image: {
    width: 160,
    height: 35,
    padding: 2,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
    color: COLORS.black,
    marginBottom: 4,
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
    fontSize: 14,
    textAlign: 'center'
  },
});

export default SliderDetails;
