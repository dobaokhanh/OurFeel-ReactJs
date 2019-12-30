import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    posts: [],
    error: null,
    loading: false
};

const fetchPostsStart = (state, action) => {
    return updateObject(state, { error: null, loading: true});
};

const fetchPostsSuccess = (state, action) => {
    return updateObject(state, {
        posts: action.data,
        error: null,
        loading: false
    });
};

const fetchPostsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const addNewPostSuccess = (state, action) => {
    return updateObject(state, {
        posts: state.posts.concat(action.newPost),
        error: null,
        loading: false
    });
};

const addNewPostFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
};

const likeCountChangeSuccess = (state, action) => {
    const index = state.posts.findIndex( (post) => post.postId === action.postId);
    let posts = [];
    state.posts.map(post => (
        posts.push({...post})
    ));
    posts[index].likeCount = action.likeCount;
    return updateObject(state, {
        posts: posts
    });
};

const likeCountChangeFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_POSTS_START: return fetchPostsStart(state, action);
        case actionTypes.FETCH_POSTS_SUCCESS: return fetchPostsSuccess(state, action);
        case actionTypes.FETCH_POSTS_FAIL: return fetchPostsFail(state, action);
        case actionTypes.ADD_NEW_POST_SUCCESS: return addNewPostSuccess(state, action);
        case actionTypes.ADD_NEW_POST_FAIL: return addNewPostFail(state, action);
        case actionTypes.LIKE_COUNT_CHANGE_SUCCESS: return likeCountChangeSuccess(state, action);
        case actionTypes.LIKE_COUNT_CHANGE_FAIL: return likeCountChangeFail(state, action);
        default: return state;
    }
}

export default reducer;