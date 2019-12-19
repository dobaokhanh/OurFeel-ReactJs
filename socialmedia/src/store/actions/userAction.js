import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const getUserDataStart = () => {
    return {
        type: actionTypes.GET_USER_DATA_START
    };
};

export const getUserDataSuccess = (userData) => {
    return {
        type: actionTypes.GET_USER_DATA_SUCCESS,
        userData: userData
    }
};

export const getUserDataFail = (error) => {
    return {
        type: actionTypes.GET_USER_DATA_FAIL,
        error: error
    }
};

export const getUserData = (token, userId) => {
    return dispatch => {
        dispatch(getUserDataStart());
        const queryParam = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/users.json' + queryParam)
            .then(res => {
                let userData = null;
                for(let key in res.data) {
                    userData = {...res.data[key]}
                }
                console.log(userData);
                dispatch(getUserDataSuccess(userData));
            })
            .catch(err => {
                dispatch(getUserDataFail(err.response.data.error));
            });
    };
};

export const saveUserDataStart = () => {
    return {
        type: actionTypes.SAVE_USER_DATA_START
    };
};

export const saveUserDataSuccess = (userId) => {
    return {
        type: actionTypes.GET_USER_DATA_SUCCESS,
        userId: userId
    };
};

export const saveUserDataFail = (error) => {
    return {
        type: actionTypes.SAVE_USER_DATA_FAIL,
        error: error
    };
};

export const saveUserData = (userData) => {
    return dispatch => {
        dispatch(saveUserDataStart());
        axios.post('/users', userData)
            .then(res => {
                dispatch.getUserData(res.data.localId);
            })
            .catch(err => {
                dispatch(saveUserDataFail(err));
            })
    };
};