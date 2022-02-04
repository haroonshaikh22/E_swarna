import {
    LANGUAGELIST_FAIL, LANGUAGELIST_PROGRESS, LANGUAGELIST_SUCCESS,
    LANGUAGEJSON_PROGRESS, LANGUAGEJSON_SUCCESS, LANGUAGEJSON_FAIL

} from '../actions/actionsConstant';

const initialState = {
    isLoading: false,
    languageList: [],
    languageJson: {},
}

const languageReducer = (state = initialState, action) => {
    // console.log("languageReducer", action);
    switch (action.type) {
        case LANGUAGELIST_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case LANGUAGELIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                languageList: action.payload
            };
        case LANGUAGELIST_FAIL:
            return {
                ...state,
                isLoading: false
            };
        case LANGUAGEJSON_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case LANGUAGEJSON_SUCCESS:
            return {
                ...state,
                isLoading: false,
                languageJson: action.payload
            };
        case LANGUAGELIST_FAIL:
            return {
                ...state,
                isLoading: false,
                languageJson: action.payload
            }
        default:
            return state;
    }
}
export default languageReducer;