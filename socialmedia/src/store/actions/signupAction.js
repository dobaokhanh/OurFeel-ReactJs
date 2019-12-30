import * as actionTypes from './actionTypes';
import axios from 'axios';
import axiosInstance from '../../axios-orders';
import { checkTimeOut } from './authAction';

export const signUpStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    };
};

export const signUpSuccess = (token, userId) => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const signUpFail = (error) => {
    return {
        type: actionTypes.SIGNUP_FAIL,
        error: error
    };
};

export const signUp = (userSignUpData) => {
    return dispatch => {
        dispatch(signUpStart());
        const signupData = {
            email: userSignUpData.email,
            password: userSignUpData.password,
            returnSecureToken: true
        };
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDEslbGxXqFIDshVngmyWuidYQFr40MZLg', signupData)
            .then(res => {
                dispatch(addNewUserToDb(userSignUpData, res.data));
            })
            .catch(err => {
                dispatch(signUpFail(err.response.data.error));
            })
    }
};

export const addNewUserToDb = (userSignUpData, resData) => {
    return dispatch => {
        const newUserData = {
            credentials: {
                userId: resData.localId,
                userName: userSignUpData.userName,
                email: userSignUpData.email,
                createdAt: new Date(),
                bio: '',
                location: ''
            }
        };

        axiosInstance.post('/users.json?auth=' + resData.idToken, newUserData)
            .then(res => {
                console.log(res);
                const expirationDate = new Date(new Date().getTime() + resData.expiresIn * 1000);
                localStorage.setItem('token', resData.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', resData.localId);
                dispatch(signUpSuccess(resData.idToken, resData.localId));
                dispatch(checkTimeOut(resData.expiresIn));
            })
            .catch(err => {
                console.log(err);
                dispatch(signUpFail(err));
            });
    };
};