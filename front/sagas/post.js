import { ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE, LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE, generateDummyPost, 
    UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAILURE,

} from '@/reducer/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '@/reducer/user';
import axios from 'axios';
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import shortid from 'shortid';

function addCommentAPI(data) {
    return axios.post('/user/addComment', data );
}

function* addComment(action) {
    // yield call(addCommentAPI, action.data);
    yield delay(1000);
    try {
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.data
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
    return axios.post('/user/removePost', data );
}

function* removePost(action) {
    // yield call(removePostAPI, action.data);
    yield delay(1000);
    try {
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.data
        });
        yield put({
            type: REMOVE_POST_OF_ME,
            data: action.data
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
    return axios.post('/post/addPost', {content: data} );
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

function loadPostsAPI(data) {
    return axios.post('/post/loadPosts', data );
}

function* loadPosts(action) {
    try {
    const result = yield call(loadPostsAPI, action.data);
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

function* watchLoadPosts() {
    yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchUploadImage() {
    yield takeLatest(UPLOAD_IMAGE_REQUEST, uploadImage);
}

function* postSaga() {
    yield all([
        fork(watchUploadImage),
        fork(watchRemovePost),
        fork(watchAddPost),
        fork(watchLoadPosts),
        fork(watchAddComment),
    ])
} 

export default postSaga;