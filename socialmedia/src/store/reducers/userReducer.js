import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    dataId: null,
    credentials: null,
    likes: [],
    notifications: [],
    error: null,
    loading: false
};

// ------------------------------- Fetch User Data --------------------------

const getUserDataStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const getUserDataSuccess = (state, action) => {
    let likes = [];
    if (action.userData.likes) {
        for (let key in action.userData.likes) {
            likes.push({
                name: key,
                postId: action.userData.likes[key].postId
            });
        }
    }
    return updateObject(state, {
        dataId: action.userData.dataId,
        credentials: action.userData.credentials,
        likes: likes,
        error: null,
        loading: false,
    });
};

const getUserDataFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

// ------------------------------ Save User Data --------------------------

const saveUserDataStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const saveUserDataSuccess = (state, action) => {
    return updateObject(state, {
        credentials: action.userData,
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


// ----------------------------- Like Post --------------------------------

const likePostSuccess = (state, action) => {
    return updateObject(state, {
        likes: state.likes.concat(action.like),
        error: null,
        loading: false
    });
};

const likePostFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

// ----------------------------- Unlike Post -----------------------------

const unlikePostSuccess = (state, action) => {
    return updateObject(state, {
        likes: state.likes.filter(
            (like) => like.name !== action.name
        )
    });
};

const unlikePostFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
};

// ----------------------------- Send Notification ----------------------

const sendNotificationSuccess = (state, action) => {
    if (action.noti.senderId !== state.credentials.userId) {
        return updateObject(state, {
            notifications: state.notifications.concat(action.noti),
            error: null,
            loading: false
        });
    }
   return {...state};
};

const sendNotificationFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
};

// --------------------------------- Fetch Notification ----------------------

const getNotificationSuccess = (state, action) => {
    let notifications = [];
    notifications = action.noti.filter(noti => noti.recipientId === state.credentials.userId);
    return updateObject(state, {
        notifications: notifications
    });
};

const getNotificationFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
};

// -------------------------------- Mark Notification Read -------------------

const markNotificationReadSuccess = (state, action) => {
    const index = state.notifications.findIndex( (noti) => noti.notificationId === action.notificationId);
    let notifications = [];
    state.notifications.map(noti => (
        notifications.push({...noti})
    ));
    notifications[index].read = true;
    return updateObject(state, {
        notifications: notifications
    });
};

const markNotificationReadFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
};

// ----------------------------- Logout ------------------------

const logout = (state, action) => {
    return updateObject(state, {
        dataId: null,
        credentials: null,
        likes: []
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
        case actionTypes.LIKE_POST_SUCCESS: return likePostSuccess(state, action);
        case actionTypes.LIKE_POST_FAIL: return likePostFail(state, action);
        case actionTypes.UNLIKE_POST_SUCCESS: return unlikePostSuccess(state, action);
        case actionTypes.UNLIKE_POST_FAIL: return unlikePostFail(state, action);
        case actionTypes.SEND_NOTIFICATION_SUCCESS: return sendNotificationSuccess(state, action);
        case actionTypes.SEND_NOTIFICATION_FAIL: return sendNotificationFail(state, action);
        case actionTypes.GET_NOTIFICATION_SUCCESS: return getNotificationSuccess(state, action);
        case actionTypes.GET_NOTIFICATION_FAIL: return getNotificationFail(state, action);
        case actionTypes.MARK_NOTIFICATION_READ_SUCCESS: return markNotificationReadSuccess(state, action);
        case actionTypes.MARK_NOTIFICATION_READ_FAIL: return markNotificationReadFail(state, action);
        case actionTypes.LOGOUT: return logout(state, action);
        default: return state;
    };
};

export default reducer;