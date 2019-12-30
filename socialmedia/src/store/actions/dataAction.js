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
        const token = localStorage.getItem('token');
        const queryParam = '?auth=' + token;
        axios.get('/posts.json' + queryParam)
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
        const token = localStorage.getItem('token');
        const queryParam = '?auth=' + token;
        axios.post('/posts.json' + queryParam, newPostData)
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
        const token = localStorage.getItem('token');
        const queryParam = '?auth=' + token;
        axios.put('/posts/' + postId + '/likeCount.json' + queryParam, likeCount)
            .then(res => {
                dispatch(likeCountChangeSuccess(postId, likeCount));
            })
            .catch(err => {
                console.log(err);
                dispatch(likeCountChangeFail(err));
            });
    };
};
