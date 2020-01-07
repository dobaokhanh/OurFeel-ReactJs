import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    posts: [],
    comments: [],
    error: null,
    loadingPosts: false,
    loadingComments: false
};

const fetchPostsStart = (state, action) => {
    return updateObject(state, { error: null, loadingPosts: true});
};

const fetchPostsSuccess = (state, action) => {    
    return updateObject(state, {
        posts: action.data,
        error: null,
        loadingPosts: false
    });
};

const fetchPostsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loadingPosts: false
    });
};

const addNewPostSuccess = (state, action) => {
    return updateObject(state, {
        posts: state.posts.concat(action.newPost),
        error: null,
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
        error: action.error
    });
};

const deletePostSuccess = (state, action) => {
    let posts = [];
    posts = state.posts.filter( (post) => post.postId !== action.postId)
    return updateObject(state, {
        posts: posts
    });
};

const deletePostFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
};

const addNewCommentStart = (state, action) => {
    return updateObject(state, {
        loadingComments: true
    })
}

const addNewCommentSuccess = (state, action) => {
    return updateObject(state, {
        comments: state.comments.concat(action.comment),
        loadingComments: false
    });
};

const addNewCommentFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loadingComments: false
    });
};

const commentCountChangeSuccess = (state, action) => {
    const index = state.posts.findIndex( (post) => post.postId === action.postId);
    let posts = [];
    state.posts.map(post => (
        posts.push({...post})
    ));
    posts[index].commentCount = action.commentCount;
    return updateObject(state, {
        posts: posts
    });
};

const commentCountChangeFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    });
};

const fetchCommentsStart = (state, action) => {
    return updateObject(state, {
        loadingComments: true
    });
};

const fetchCommentsSuccess = (state, action) => {
    return updateObject(state, {
        comments: action.comments,
        loadingComments: false
    });
};

const fetchCommentsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loadingComments: false
    });
};

const clearComments = (state, action) => {
    return updateObject(state, {
        comments: []
    });
};

const logout = (state, action) => {
    return updateObject(state, {
        posts: [],
        comments: []
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
        case actionTypes.DELETE_POST_SUCCESS: return deletePostSuccess(state, action);
        case actionTypes.DELETE_POST_FAIL: return deletePostFail(state, action);
        case actionTypes.ADD_NEW_COMMENT_START: return addNewCommentStart(state, action);
        case actionTypes.ADD_NEW_COMMENT_SUCCESS: return addNewCommentSuccess(state, action);
        case actionTypes.ADD_NEW_COMMENT_FAIL: return addNewCommentFail(state, action);
        case actionTypes.COMMENT_COUNT_CHANGE_SUCCESS: return commentCountChangeSuccess(state, action);
        case actionTypes.COMMENT_COUNT_CHANGE_FAIL: return commentCountChangeFail(state, action);
        case actionTypes.FETCH_COMMENTS_START: return fetchCommentsStart(state, action);
        case actionTypes.FETCH_COMMENTS_SUCCESS: return fetchCommentsSuccess(state, action);
        case actionTypes.FETCH_COMMENTS_FAIL: return fetchCommentsFail(state, action);
        case actionTypes.CLEAR_COMMENTS: return clearComments(state, action);
        case actionTypes.LOGOUT: return logout(state, action);
        default: return state;
    }
}

export default reducer;