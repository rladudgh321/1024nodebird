import { 
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, 
    REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE, 
    LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE, 
    LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE, 
    UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAILURE, 
    LIKE_REQUEST, LIKE_SUCCESS, LIKE_FAILURE, 
    UNLIKE_REQUEST, UNLIKE_SUCCESS, UNLIKE_FAILURE, 
    RETWEET_REQUEST, RETWEET_SUCCESS, RETWEET_FAILURE, 
    LOAD_USER_POSTS_REQUEST, LOAD_HASHTAG_POSTS_REQUEST, LOAD_USER_POSTS_SUCCESS, 
    LOAD_USER_POSTS_FAILURE, LOAD_HASHTAG_POSTS_SUCCESS, LOAD_HASHTAG_POSTS_FAILURE,

} from '@/reducer/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '@/reducer/user';
import axios from 'axios';
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';

function retweetAPI(data) {
    return axios.post(`/post/${data}/retweet` );
}

function* retweet(action) {
    try {
        const result = yield call(retweetAPI, action.data);
        yield put({
            type: RETWEET_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.error(err);
        yield put({
            type:RETWEET_FAILURE,
            error:err.response.data
        })
    } 
}

function addCommentAPI(data) {
    return axios.post(`/post/${data.PostId}/addComment`, data );
}

function* addComment(action) {
    try {
        const result = yield call(addCommentAPI, action.data);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.error(err);
        yield put({
            type:ADD_COMMENT_FAILURE,
            error:err.response.data
        })
    } 
}

function removePostAPI(data) {
    return axios.delete(`/post/${data}/removePost`);
}

function* removePost(action) {
    try {
        const result = yield call(removePostAPI, action.data);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: result.data
        });
        yield put({
            type: REMOVE_POST_OF_ME,
            data: result.data
        })
    } catch (err) {
        console.error(err);
        yield put({
            type:REMOVE_POST_FAILURE,
            error:err.response.data
        })
    } 
}

function addPostAPI(data) {
    return axios.post('/post/addPost', { content:data.content, image:data.imagePaths } );
}

function* addPost(action) {
    try {
        const result = yield call(addPostAPI, action.data);
        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data,
        });
        yield put({
            type: ADD_POST_TO_ME,
            data: result.data.id
        })
    } catch (err) {
        console.error(err);
        yield put({
            type:ADD_POST_FAILURE,
            error:err.response.data
        })
    } 
}

function loadPostAPI(data) {
    return axios.get(`/post/${data}`);
}

function* loadPost(action) {
    try {
    const result = yield call(loadPostAPI, action.data);
        yield put({
            type: LOAD_POST_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type:LOAD_POST_FAILURE,
            error:err.response.data,
        })
    } 
}

function loadUserPostsAPI(data, lastId) {
    return axios.get(`/user/${data}/posts?lastId=${lastId || 0 }`);
}

function* loadUserPosts(action) {
    try {
    const result = yield call(loadUserPostsAPI, action.data, action.lastId);
        yield put({
            type: LOAD_USER_POSTS_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type:LOAD_USER_POSTS_FAILURE,
            error:err.response.data,
        })
    } 
}

function loadHashtagPostsAPI(data, lastId) {
    return axios.get(`/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0 }`);
}

function* loadHashtagPosts(action) {
    try {
        console.log('loadHashtagPosts****************************')
    const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
        yield put({
            type: LOAD_HASHTAG_POSTS_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type:LOAD_HASHTAG_POSTS_FAILURE,
            error:err.response.data,
        })
    } 
}

function loadPostsAPI(lastId) {
    return axios.get(`/posts?lastId=${lastId || 0 }`);
}

function* loadPosts(action) {
    try {
    const result = yield call(loadPostsAPI, action.lastId);
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type:LOAD_POSTS_FAILURE,
            error:err.response.data,
        })
    } 
}

function likeAPI(data) {
    return axios.patch(`/post/${data}/like`);
}

function* like(action) {
    try {
    const result = yield call(likeAPI, action.data);
        yield put({
            type: LIKE_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LIKE_FAILURE,
            error:err.response.data,
        })
    } 
}

function unlikeAPI(data) {
    return axios.delete(`/post/${data}/like`);
}

function* unlike(action) {
    try {
    const result = yield call(unlikeAPI, action.data);
        yield put({
            type: UNLIKE_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: UNLIKE_FAILURE,
            error:err.response.data,
        })
    } 
}

function uploadImageAPI(data) {
    return axios.post('/post/image', data );
}

function* uploadImage(action) {
    try {
    const result = yield call(uploadImageAPI, action.data);
        yield put({
            type: UPLOAD_IMAGE_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type:UPLOAD_IMAGE_FAILURE,
            error:err.response.data,
        })
    } 
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchLoadUserPosts() {
    yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

function* watchLoadHashtagPosts() {
    yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

function* watchLoadPosts() {
    yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

function* watchLoadPost() {
    yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchUploadImage() {
    yield takeLatest(UPLOAD_IMAGE_REQUEST, uploadImage);
}

function* watchLike() {
    yield takeLatest(LIKE_REQUEST, like);
}

function* watchunLike() {
    yield takeLatest(UNLIKE_REQUEST, unlike);
}

function* watchRetweet() {
    yield takeLatest(RETWEET_REQUEST, retweet);
}

function* postSaga() {
    yield all([
        fork(watchRetweet),
        fork(watchLike),
        fork(watchunLike),
        fork(watchUploadImage),
        fork(watchRemovePost),
        fork(watchAddPost),
        fork(watchLoadUserPosts),
        fork(watchLoadHashtagPosts),
        fork(watchLoadPosts),
        fork(watchLoadPost),
        fork(watchAddComment),
    ])
} 

export default postSaga;