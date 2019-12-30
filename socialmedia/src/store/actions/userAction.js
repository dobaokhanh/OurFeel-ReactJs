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
        const queryParam = '?auth=' + token + '&orderBy="credentials/userId"&equalTo="' + userId + '"';
        axios.get('/users.json' + queryParam)
            .then(res => {
                let userData = null;
                for (let key in res.data) {
                    userData = { ...res.data[key] };
                    localStorage.setItem('uId', key);
                }
                dispatch(getUserDataSuccess(userData));
            })
            .catch(err => {
                dispatch(getUserDataFail(err));
            });
    };
};

export const saveUserDataStart = () => {
    return {
        type: actionTypes.SAVE_USER_DATA_START
    };
};

export const saveUserDataSuccess = (userData) => {
    return {
        type: actionTypes.SAVE_USER_DATA_SUCCESS,
        userData: userData
    };
};

export const saveUserDataFail = (error) => {
    return {
        type: actionTypes.SAVE_USER_DATA_FAIL,
        error: error
    };
};

export const saveUserData = (token, userData) => {
    return dispatch => {
        dispatch(saveUserDataStart());
        token = localStorage.getItem('token');
        const uId = localStorage.getItem('uId');
        const queryParam = '?auth=' + token;
        axios.put('/users/' + uId + '/credentials.json' + queryParam, userData)
            .then(res => {
                dispatch(saveUserDataSuccess(userData));
            })
            .catch(err => {
                dispatch(saveUserDataFail(err));
            })
    };
};

export const likePostSuccess = (like) => {
    return {
        type: actionTypes.LIKE_POST_SUCCESS,
        like: like
    };
};

export const likePostFail = (error) => {
    return {
        type: actionTypes.LIKE_POST_FAIL,
        error: error
    };
};

export const likePost = (postId) => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const uId = localStorage.getItem('uId');
        const queryParam = '?auth=' + token;
        const postLiked = {
            postId: postId
        };
        axios.post('/users/' + uId + '/likes.json' + queryParam, postLiked)
            .then(res => {
                const like = {
                    name: res.data.name,
                    postId: postId
                }
                dispatch(likePostSuccess(like));
            })
            .catch(err => {
                dispatch(likePostFail(err.response.data.err));
            })
    };
};

export const unlikePostSuccess = (name) => {
    return {
        type: actionTypes.UNLIKE_POST_SUCCESS,
        name: name
    };
};

export const unlikePostFail = (error) => {
    return {
        type: actionTypes.UNLIKE_POST_FAIL,
        error: error
    };
};

export const unlikePost = (name) => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const uId = localStorage.getItem('uId');
        const queryParam = '?auth=' + token;
        axios.delete('/users/' + uId + '/likes/' + name + '.json' + queryParam)
            .then(
                dispatch(unlikePostSuccess(name))
            )
            .catch(err => {
                dispatch(unlikePostFail(err));
            });
    };
};