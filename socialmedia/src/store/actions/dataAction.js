import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const fetchPostsStart = () => {
    return {
        type: actionTypes.FETCH_POSTS_START
    };
};

export const fetchPostsSuccess = (data) => {
    return {
        type: actionTypes.FETCH_POSTS_SUCCESS,
        data: data
    };
};

export const fetchPostsFail = (error) => {
    return {
        type: actionTypes.FETCH_POSTS_FAIL,
        error: error
    };
};

export const fetchPosts = () => {
    return dispatch => {
        dispatch(fetchPostsStart());
        axios.get('/posts.json' )
            .then(res => {
                let postsFetched = [];
                for (let key in res.data) {
                    postsFetched.push({
                        ...res.data[key],
                        postId: key
                    });
                }
                dispatch(fetchPostsSuccess(postsFetched));
            })
            .catch(err => {
                dispatch(fetchPostsFail(err));
            });
    };
};

export const addNewPostSuccess = (newPost) => {
    return {
        type: actionTypes.ADD_NEW_POST_SUCCESS,
        newPost: newPost
    };
};

export const addNewPostFail = (error) => {
    return {
        type: actionTypes.ADD_NEW_POST_FAIL,
        error: error
    };
};

export const addNewPost = (newPostData) => {
    return dispatch => {
        axios.post('/posts.json', newPostData)
            .then(res => {
                const newPost = {
                    ...newPostData,
                    postId: res.data.name
                }
                dispatch(addNewPostSuccess(newPost));
            })
            .catch(err => {
                dispatch(addNewPostFail(err));
            });
    };
};

export const likeCountChangeSuccess = (postId, likeCount) => {
    return {
        type: actionTypes.LIKE_COUNT_CHANGE_SUCCESS,
        postId: postId,
        likeCount: likeCount
    };
};

export const likeCountChangeFail = (error) => {
    return {
        type: actionTypes.LIKE_COUNT_CHANGE_FAIL,
        error: error
    };
};

export const likeCountChange = (postId, likeCount) => {
    return dispatch => {
        axios.put('/posts/' + postId + '/likeCount.json', likeCount)
            .then((
                dispatch(likeCountChangeSuccess(postId, likeCount))
            ))
            .catch(err => {
                dispatch(likeCountChangeFail(err));
            });
    };
};

export const deletePostSuccess = (postId) => {
    return {
        type: actionTypes.DELETE_POST_SUCCESS,
        postId: postId
    };
};

export const deletePostFail = (error) => {
    return {
        type: actionTypes.DELETE_POST_FAIL,
        error: error
    };
};

export const deletePost = (postId) => {
    return dispatch => {
        axios.delete('/posts/' + postId + '.json' )
            .then(
                dispatch(deletePostSuccess(postId))
            )
            .catch(err => {
                dispatch(deletePostFail(err));
            });

    };
};

export const addNewCommentStart = () => {
    return {
        type: actionTypes.ADD_NEW_COMMENT_START
    };
};

export const addNewCommentSuccess = (comment) => {
    return {
        type: actionTypes.ADD_NEW_COMMENT_SUCCESS,
        comment: comment
    };
};

export const addNewCommentFail = (error) => {
    return {
        type: actionTypes.ADD_NEW_COMMENT_FAIL,
        error: error
    };
};

export const addNewComment = (postId, comment) => {
    return dispatch => {
        dispatch(addNewCommentStart());
        axios.post('/comments/' + postId + '.json' , comment)
            .then(res => {
                const newComment = {
                    ...comment,
                    commentId: res.data.name
                }
                dispatch(addNewCommentSuccess(newComment))
            })
            .catch(err => {
                dispatch(addNewCommentFail(err));
        });

    };
};

export const commentCountChangeSuccess = (postId, commentCount) => {
    return {
        type: actionTypes.COMMENT_COUNT_CHANGE_SUCCESS,
        postId: postId,
        commentCount: commentCount
    };
};

export const commentCountChangeFail = (error) => {
    return {
        type: actionTypes.COMMENT_COUNT_CHANGE_FAIL,
        error: error
    };
};

export const commentCountChange = (postId, commentCount) => {
    return dispatch => {
        axios.put('/posts/' + postId + '/commentCount.json' , commentCount)
            .then(dispatch(commentCountChangeSuccess(postId, commentCount)))
            .catch(err => {
                dispatch(commentCountChangeFail(err));
            });
    };
};

export const fetchCommentsStart = () => {
    return {
        type: actionTypes.FETCH_COMMENTS_START
    };
};

export const fetchCommentsSuccess = (comments) => {
    return {
        type: actionTypes.FETCH_COMMENTS_SUCCESS,
        comments: comments
    };
};

export const fetchCommentsFail = (error) => {
    return {
        type: actionTypes.FETCH_COMMENTS_FAIL,
        error: error
    };
};

export const fetchComments = (postId) => {
    return dispatch => {
        dispatch(fetchCommentsStart());
        axios.get('/comments/' + postId +'.json')
            .then(res => {
                let comments = [];
                for (let key in res.data) {
                    comments.push({
                        ...res.data[key],
                        commentId: key
                    });
                };
                dispatch(fetchCommentsSuccess(comments));
            })
            .catch(err => {
                dispatch(fetchCommentsFail(err));
            });
    };
};

export const clearCommentSuccess = () => {
    return {
        type: actionTypes.CLEAR_COMMENTS
    };
};

export const clearComment = () => (dispatch) => dispatch(clearCommentSuccess());
    