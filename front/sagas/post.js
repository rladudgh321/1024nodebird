import { ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE, LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE, generateDummyPost,

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
    return axios.post('/user/addPost', data );
}

function* addPost(action) {
    // yield call(addPostAPI, action.data);
    const id = shortid.generate();
    yield delay(1000);
    try {
        yield put({
            type: ADD_POST_SUCCESS,
            data: { content: action.data,
                    id }
        });
        yield put({
            type: ADD_POST_TO_ME,
            data: id
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
    return axios.post('/user/loadPosts', data );
}

function* loadPosts(action) {
    // yield call(loadPostsAPI, action.data);
    yield delay(1000);
    try {
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: generateDummyPost(10),
        });
    } catch (err) {
        console.error(err);
        yield put({
            type:LOAD_POSTS_FAILURE,
            error:err.response.data
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

function* postSaga() {
    yield all([
        fork(watchRemovePost),
        fork(watchAddPost),
        fork(watchLoadPosts),
        fork(watchAddComment),
    ])
} 

export default postSaga;