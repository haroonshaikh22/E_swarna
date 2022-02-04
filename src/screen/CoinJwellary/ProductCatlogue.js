import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    Image,
    SafeAreaView,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { COLORS, IMAGES, FONTS, GLOBALSTYLES } from '../../constants/theme';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomNavigationBar from '../../common/CustomNavigationBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductCatlogue = ({ navigation, route }) => {
    const [count, setCount] = useState(0);

    const [data1, setData1] = useState([

        { img: IMAGES.Buyx, Name: "Earings", SKU: "MG667847", weight: '0.7gm', product: 'jwellery', purity: '22k', size: '12mm' },
        { img: IMAGES.Buyx, Name: "Earings", SKU: "MG667847", weight: '0.7gm', product: 'jwellery', purity: '22k', size: '12mm' },


    ]);
    function increment() {
        setCount(count + 1);
    };
    function decrement() {
        setCount(count - 1);
    };
    const { name } = route.params;

    return (
        <SafeAreaView style={styles.containermain}>
            <CustomNavigationBar headername="Coin/Jewellery" icon_name='cart' back={true} />
            <View style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center' }}>
                <View style={styles.topView}></View>
                <View style={styles.container}>
                    <Text style={{ textAlign: 'center', fontSize: 20, color: COLORS.black, padding: 10, margin: 10, fontWeight: 'bold' }}>Product Catalog</Text>
                    <View style={styles.viewtext}>
                        <Text style={styles.textview}>{name}</Text>
                    </View>
                    <FlatList
                        data={data1}
                        renderItem={({ item, index }) => (
                            <View style={{ flex: 1, alignItems: 'center', padding: 10, width: "100%" }}>
                                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                    <Image
                                        source={item.img}
                                        key={index}
                                        style={{ width: 40, height: 40 }} />
                                    <Text style={{ fontWeight: 'bold', fontSize: 12, textAlign: 'center', margin: 10 }}>{item.Name}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', padding: 10, width: "100%", justifyContent: 'space-between' }}>
                                    <Text style={{ textAlign: 'center', fontSize: 10 }}>SKU code</Text>
                                    <Text style={{ textAlign: 'center', fontSize: 10 }}>{item.SKU}</Text>
                                    <Text style={{ textAlign: 'center', fontSize: 10 }}>Weight</Text>
                                    <Text style={{ textAlign: 'center', fontSize: 10 }}>{item.weight}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', padding: 10, width: "100%", justifyContent: 'space-between' }}>
                                    <Text style={{ textAlign: 'center', fontSize: 10 }}>Product Type</Text>
                                    <Text style={{ textAlign: 'center', fontSize: 10 }}>{item.product}</Text>
                                    <Text style={{ textAlign: 'center', fontSize: 10 }}>Purity</Text>
                                    <Text style={{ textAlign: 'center', fontSize: 10 }}>{item.purity}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', padding: 10, width: "100%" }}>
                                    <Text style={{ textAlign: 'center', fontSize: 10, margin: 5 }}>Size</Text>
                                    <Text style={{ textAlign: 'center', fontSize: 10, margin: 5 }}>{item.size}</Text>
                                </View>

                                <TouchableOpacity
                                    style={{
                                        backgroundColor: COLORS.pureblue,
                                        marginTop: 20, padding: 15,
                                        borderRadius: 8,
                                    }}>
                                    <Text style={{ color: COLORS.white, textAlign: 'center' }}>Add To Cart</Text>
                                </TouchableOpacity>
                                {/* <Button mode='contained' 
                            color='#0099FF'
                            style={{
                                marginTop: 20, 
                                borderRadius: 8,
                                padding:10
                            }}
                        > Add To Cart
                        </Button> */}
                                <View style={{ flexDirection: 'row', padding: 5, margin: 5, justifyContent: 'space-between', width: "50%" }}>
                                    <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: 'bold' }}>Quantity</Text>
                                    <Text style={{ textAlign: 'center', fontSize: 12, color: COLORS.pureblue, fontWeight: 'bold' }} onPress={increment}>+</Text>
                                    <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: 'bold' }}>{count}</Text>
                                    <Text style={{ textAlign: 'center', fontSize: 12, color: COLORS.pureblue, fontWeight: 'bold' }} onPress={decrement}>-</Text>
                                </View>

                            </View>
                        )}
                    />

                </View>
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
        height: '30%',
        backgroundColor: COLORS.pureblue,
        borderBottomStartRadius: 50,
        borderBottomEndRadius: 50,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
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
        marginTop: "30%",
        marginBottom: "5%",
        width: '85%',
        height: '80%',
        backgroundColor: COLORS.white,
        borderRadius: 15
    },
    textview: {
        textAlign: 'center',
        color: COLORS.white,
        fontSize: 12,
        flexWrap: 'wrap',
        padding: 5
    },
    viewtext: {
        backgroundColor: COLORS.pureblue,
        width: '50%',
        padding: 10,
        borderRadius: 10,
        margin: 5
    }
});

export default ProductCatlogue;