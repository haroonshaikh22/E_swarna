import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window')

export const COLORS = {
    BGColor: "#F7F8FA",
    appBGColor: "#0094da",
    appErrorColor: "#ff0101",
    black: "#000000",
    white: "#FFFFFF",
    Vividorange: "#f7b918",
    pureblue: "#0095da",
    Matterhorn: "#4e4e4e",
    Lightgray: "#c4c4c4",
    Paleblue: "#B6E1FF",
    Red: "#FF0000",
    Green: "#8cd32b",
}

export const FONTS = {
    appFontSemiBold: { fontFamily: 'Poppins-SemiBold', fontSize: 14, },
    appFontMedium: { fontFamily: 'Poppins-Medium', fontSize: 14 },
    appFontRegularsmall: { fontFamily: 'Poppins-Regular', fontSize: 12 },
    // appFontRegular: { fontFamily: 'customFont', fontSize: 14 },
    appIconFont: { fontFamily: 'icomoon', fontSize: 14 },
    appNimapFont: { fontFamily: 'nimapfonts', fontSize: 14 },
    appFontMediumBig: { fontFamily: 'Poppins-Medium', fontSize: 25 },
}

const abc = require("../../assets/images/120-1.png")
//const Buy1x = require("../../assets/images/Buy@1x.png")
const open_ac = require("../../assets/images/open_acc.png")
const goldicon = require("../../assets/images/icongold.png")
const make_payment = require("../../assets/images/make_payment.png")
const necklace = require("../../assets/images/necklace.png")
const Copy = require("../../assets/images/Copy.png")
const Copy_Link = require("../../assets/images/Copy_Link.png")
const Delivered = require("../../assets/images/Delivered.png")
const Delivery = require("../../assets/images/Delivery.png")
const Earn_Credit = require("../../assets/images/Earn_Credit.png")
const Group = require("../../assets/images/Group 13172.png")
//const Icon123 = require("../../assets/images/Icon 1@3x(2).png")
const Tenure = require("../../assets/images/Tenure.png")
const WhatsApp_Image = require("../../assets/images/WhatsApp Image 2021-02-26 at 7.33.55 PM.jpeg")
const alert = require("../../assets/images/alert.png")
const back = require("../../assets/images/back.jpeg")
const backgroud3 = require("../../assets/images/backgroud3.png")
const background_new = require("../../assets/images/backgroud_new.png")
const chcked = require("../../assets/images/chcked.png")
const checkbox = require("../../assets/images/checkbox.jpg")
//const circle_tick = require("../../assets/images/ circle_tick.png")
const checked = require("../../assets/images/ chcked.jpeg")
const commerce_and_shopping = require("../../assets/images/commerce_and_shopping-1.png")
const company3x = require("../../assets/images/bank.png")
const success = require("../../assets/images/success.png")
const successsmall = require("../../assets/images/successsmall.png")
//const download = require("../../assets/images/ download-1.png")
const eSwarna_Logo = require("../../assets/images/eSwarnaLogo.png")
const eSwarna_Logomini = require("../../assets/images/eSwarnaLogomini.png")
const edit_icon = require("../../assets/images/edit_icon.png")
const front = require("../../assets/images/front.jpeg")
//const  gold_bar = require("../../assets/images/ gold_bar.png")
const surface_1 = require("../../assets/images/surface_1.png")
const unchcked = require("../../assets/images/unchcked.png")
const augomont = require("../../assets/images/augmont.png")
const idbi = require("../../assets/images/idbi_logo.png")
const muthoot = require("../../assets/images/Muthootimage1.png")
const SIP = require("../../assets/images/SIP.png")
const Buyx = require("../../assets/images/Buyx.png")
const Sellx = require("../../assets/images/Sellx.png")
const OrderConfirm = require("../../assets/images/OrderConfirm.png")
const updowns = require("../../assets/images/updowns.png")
const rupee = require("../../assets/images/rupee.png")
const goldbar = require("../../assets/images/goldbar.png")


export const IMAGES = {
    abc,
    //Buy1x,
    open_ac,
    goldicon,
    make_payment,
    necklace,
    Copy,
    Copy_Link,
    Delivered,
    Delivery,
    Earn_Credit,
    Group,
    // Icon123,
    Tenure,
    WhatsApp_Image,
    alert,
    back,
    backgroud3,
    background_new,
    chcked,
    checkbox,
    //circle_tick ,
    commerce_and_shopping,
    company3x,
    success,
    successsmall,
    //download,
    eSwarna_Logo,
    eSwarna_Logomini,
    edit_icon,
    front,
    //gold_bar,
    surface_1,
    unchcked,
    augomont,
    idbi,
    muthoot,
    SIP,
    Buyx,
    Sellx,
    OrderConfirm,
    rupee,
    updowns,
    goldbar
}

export const GLOBALSTYLES = StyleSheet.create({
    optionalText: {
        fontSize: 12,
        color: COLORS.Matterhorn,
        textDecorationLine: 'line-through'
    },
    textwithunderline: {
        fontSize: 18,
        //fontWeight: 'bold',
        color: COLORS.black,
        alignSelf:'flex-start'
    //    textDecorationColor: COLORS.pureblue,
    //    borderBottomWidth: 5,
    //    borderBottomColor: COLORS.pureblue,
       // marginEnd:40
    },
    TextInputView: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        width: Dimensions.get('screen').width - 85,
        borderColor: COLORS.pureblue,
        borderRadius: 10,
        alignSelf: 'center',
        margin: 10,
        paddingVertical: 10,
        paddingHorizontal: 8,
    },
    backButtonView:{
        flexDirection: 'row',
        paddingVertical: 15,
        paddingLeft: 10
      }
})



