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
                    userData = {
                        ...res.data[key],
                        dataId: key
                    };
                }
                dispatch(getNotification());
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

export const saveUserData = (dataId, userData) => {
    return dispatch => {
        dispatch(saveUserDataStart());
        axios.put('/users/' + dataId + '/credentials.json', userData)
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

export const likePost = (postId, dataId) => {
    return dispatch => {
        const postLiked = {
            postId: postId
        };
        axios.post('/users/' + dataId + '/likes.json', postLiked)
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

export const unlikePost = (name, dataId) => {
    return dispatch => {
        axios.delete('/users/' + dataId + '/likes/' + name + '.json')
            .then(
                dispatch(unlikePostSuccess(name))
            )
            .catch(err => {
                dispatch(unlikePostFail(err));
            });
    };
};

export const sendNotificationSuccess = (notification) => {
    return {
        type: actionTypes.SEND_NOTIFICATION_SUCCESS,
        noti: notification
    };
};

export const sendNotificationFail = (error) => {
    return {
        type: actionTypes.SEND_NOTIFICATION_FAIL,
        error: error
    };
};

export const sendNotification = (notification) => {
    return dispatch => {
        axios.post('/notifications.json', notification)
            .then(res => {
                const newNotification = {
                    ...notification,
                    notificationId: res.data.name
                }
                dispatch(sendNotificationSuccess(newNotification));
            })
            .catch(err => {
                dispatch(sendNotificationFail(err));
            });
    };
};

export const getNotificationSuccess = (notifications) => {
    return {
        type: actionTypes.GET_NOTIFICATION_SUCCESS,
        noti: notifications
    };
};

export const getNotificationFail = (error) => {
    return {
        type: actionTypes.GET_NOTIFICATION_FAIL,
        error: error
    };
};

export const getNotification = () => {
    return dispatch => {
        axios.get('/notifications.json')
            .then(res => {
                let notifications = [];
                for (let key in res.data) {
                    notifications.push({
                        ...res.data[key],
                        notificationId: key
                    });
                }
                dispatch(getNotificationSuccess(notifications));
            })
            .catch(err => {
                dispatch(getNotificationFail(err));
            })
    }
}