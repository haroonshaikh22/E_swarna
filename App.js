import React from 'react';
import { Provider } from "react-redux";
import thunk from 'redux-thunk'
import './src/translations/i18n';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './redux/reducers/rootReducer'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import GuestHomePage from './src/screen/GuestHomePage';
import SellGold from './src/screen/Sell/SellGold';
import Login from './src/screen/login';
import Splashscreen from './src/screen/Splashscreen';
import BuyGold from './src/screen/Buy/BuyGold';
import Coinjwellary from './src/screen/CoinJwellary/Coinjwellary'
import ProductCatlogue from './src/screen/CoinJwellary/ProductCatlogue';
import PaymentDetails from './src/screen/Buy/PaymentDetails'
import PaymentWithoutDiscount from './src/screen/Buy/PaymentWithoutDiscount'
import { LogBox } from "react-native";
import Successfulpayment from './src/screen/Buy/Successfulpayment';
import SellPayment from './src/screen/Sell/SellPayment';
import SellPaymentWithDiscount from './src/screen/Sell/SellPaymentWithDiscount'
import RegisterPage from './src/screen/RegisterPage';
import InputOtp from './src/screen/InputOtp';
import SliderDetails from './src/screen/DetailScreen/SliderDetails';
import SetPassword from './src/screen/SetPassword';
import ForgotPassword from './src/screen/ForGotPassword/ForgotPassword';
import Language from './src/screen/Language';
import EmailOtp from './src/screen/DetailScreen/EmailOtp'
import ForgotPasswordOTP from './src/screen/ForGotPassword/ForgotPasswordOTP';
import KYCVerification from './src/screen/ForGotPassword/KYCVerifiaction';
import ResetPassword from './src/screen/ForGotPassword/ResetPassword';
import Successfullupdate from './src/screen/ForGotPassword/Successfullupdate';
import ExistingCustomer from './src/screen/ExistingCustomer';
import Emailverification from './src/screen/Emailverification';
import TermsCondition from './src/screen/TermsCondition';

import Demo from './src/screen/Demo';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
LogBox.ignoreLogs([" Cannot update a component"]);
const store = createStore(rootReducer, applyMiddleware(thunk));
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            //   header: (props) => <CustomNavigationBar {...props} headername="Home" icon_name='login' />,
            // }}
            headerShown: false
          }}>
             <Stack.Screen name="Demo" component={Demo} />
          <Stack.Screen name="Splash" component={Splashscreen} />
          <Stack.Screen name="Home" component={GuestHomePage} />
          <Stack.Screen name="Sell" component={SellGold} />
          <Stack.Screen name="Buy" component={BuyGold} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Coin" component={Coinjwellary} />
          <Stack.Screen name="Product" component={ProductCatlogue} />
          <Stack.Screen name="payment" component={PaymentDetails} />
          <Stack.Screen name="PaymentWithoutDiscount" component={PaymentWithoutDiscount} />
          <Stack.Screen name="Success" component={Successfulpayment} />
          <Stack.Screen name="Sellpayment" component={SellPayment} />
          <Stack.Screen name="SellPaymentWithDiscount" component={SellPaymentWithDiscount} />
          <Stack.Screen name="RegisterPage" component={RegisterPage} />
          <Stack.Screen name="InputOtp" component={InputOtp} />
          <Stack.Screen name="SliderDetails" component={SliderDetails} />
          <Stack.Screen name="EmailOtp" component={EmailOtp}/>
          <Stack.Screen name="SetPassword" component={SetPassword}/>
          <Stack.Screen name="Language" component={Language}/>
          <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
          <Stack.Screen name="ForgotPasswordOTP" component={ForgotPasswordOTP}/>
          <Stack.Screen name="KYCVerification" component={KYCVerification}/>
          <Stack.Screen name="ResetPassword" component={ResetPassword}/>
          <Stack.Screen name="Successfullupdate" component={Successfullupdate}/>
          <Stack.Screen name='ExistingCustomer' component={ExistingCustomer}/>
          <Stack.Screen name='Emailverification' component={Emailverification}/>
          <Stack.Screen name='TermsCondition' component={TermsCondition}/>



        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App;
