import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    userData: null,
    error: null,
    loading: false
};

const getUserDataStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const getUserDataSuccess = (state, action) => {
    return updateObject(state, {
        userData: action.userData,
        error: null,
        loading: false
    });
};

const getUserDataFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const saveUserDataStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const saveUserDataSuccess = (state, action) => {
    return updateObject(state, {
        userData: action.userData,
        error: null,
        loading: false
    });
};

const saveUserDataFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USER_DATA_START: return getUserDataStart(state, action);
        case actionTypes.GET_USER_DATA_SUCCESS: return getUserDataSuccess(state, action);
        case actionTypes.GET_USER_DATA_FAIL: return getUserDataFail(state, action);
        case actionTypes.SAVE_USER_DATA_START: return saveUserDataStart(state, action);
        case actionTypes.SAVE_USER_DATA_SUCCESS: return saveUserDataSuccess(state, action);
        case actionTypes.SAVE_USER_DATA_FAIL: return saveUserDataFail(state, action);
        default: return state;
    }
};

export default reducer;