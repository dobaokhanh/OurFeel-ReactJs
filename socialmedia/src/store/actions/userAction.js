import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const signUpStart = () => {
    return {
        type: actionTypes.SIGNUP_START
    }
}

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

export const signUp = (userSignUpData, history) => {
    return dispatch => {
        dispatch(signUpStart());
        const signupData = {
            email: userSignUpData.email,
            password: userSignUpData.password,
            returnSecureToken: true
        };
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDEslbGxXqFIDshVngmyWuidYQFr40MZLg', signupData)
            .then(res => {
                console.log(res);
                console.log(res.data);
                dispatch(addNewUserToDb(userSignUpData, res.data.localId));
                dispatch(signUpSuccess(res.data.idToken, res.data.localId));
                history.push('/home');
            })
            .catch(err => {
                console.log(err);
            })
    }
};

export const addNewUserToDb = (userSignUpData, userId) => {
    return dispatch => {
        const newUserData = {
            userId: userId,
            userName: userSignUpData.name,
            email: userSignUpData.email,
            createdAt: new Date()
        }
        axios.post('/users.json', newUserData)
            .then(res => {
                console.log(res);
                dispatch(signUpSuccess(res.data.idToken, res.data.localId));
            })
            .catch(err => {
                dispatch(signUpFail(err));
            });
    };
};

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

export const getUserData = (userId) => {
    return dispatch => {
        axios.get('/users/' + userId + '.json')
        .then(res => {
            console.log(res);
            dispatch(getUserDataSuccess(res.data));
        })
        .catch(err => {
            dispatch(getUserDataFail(err));
        });
    }
} 