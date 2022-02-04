import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import registrationReducer from './registrationReducer';
import buyGoldReducer from './buyGoldReducer';
import sellGoldReducer from './sellGoldReducer';
import forgotpasswordReducer from './forgotpasswordReducer';
import languageReducer from './languageReducer';
import homePageReducer from './homePageReducer';

const rootReducer = combineReducers({
    loginReducer: loginReducer,
    registrationReducer: registrationReducer,
    buyGoldReducer: buyGoldReducer,
    sellGoldReducer: sellGoldReducer,
    forgotpasswordReducer: forgotpasswordReducer,
    languageReducer: languageReducer,
    homePageReducer: homePageReducer,
});

export default rootReducer;
