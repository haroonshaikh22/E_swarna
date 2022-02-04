import {
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   LOGIN_PROGRESS,
   USERCHECK_PROGRESS,
   USERCHECK_SUCCESS,
   USERCHECK_FAIL
} from '../actions/actionsConstant'

const initialState = {
   isLoading: false,
   loginData: {},
   message: '',
   error: null,
   isPasswordBox: false,
   validIdLength: 0
};

const loginReducer = (state = initialState, action) => {
   //console.log('loginReducer', action);
   switch (action.type) {
      case LOGIN_PROGRESS:
         return {
            ...state,
            isLoading: true,
         };
      case LOGIN_SUCCESS:
         return {
            ...state,
            loginData: action.payload,
            message: action.payload.message,
            isLoading: false,
         };
      case LOGIN_FAIL:
         return {
            ...state,
            loginData: action.payload,
            message: action.payload.message,
            isLoading: false
         };
      case USERCHECK_PROGRESS:
         return {
            ...state,
            isLoading: true,
         };
      case USERCHECK_SUCCESS:
         return {
            ...state,
            isPasswordBox: action.payload.isPasswordBox,
            validIdLength: action.payload.validIdLength,
            isLoading: false
         };
      case USERCHECK_FAIL:
         return {
            ...state,
            isPasswordBox: false,
            validIdLength: 0,
            isLoading: false
         };
      default:
         return state;
   }
}

export default loginReducer;
