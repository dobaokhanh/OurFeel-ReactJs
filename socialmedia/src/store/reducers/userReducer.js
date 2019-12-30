import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    credentials: null,
    likes: [],
    error: null,
    loading: false
};

const getUserDataStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const getUserDataSuccess = (state, action) => {
    let likes = [];
    for (let key in action.userData.likes) {
        likes.push({
            name: key,
            postId: action.userData.likes[key].postId
        });
    }
    return updateObject(state, {
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
        default: return state;
    };
};

export default reducer;