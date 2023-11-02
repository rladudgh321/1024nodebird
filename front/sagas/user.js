import { LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE, 
    FOLLOWING_REQUEST, FOLLOWING_SUCCESS, FOLLOWING_FAILURE, 
    UNFOLLOWING_REQUEST, UNFOLLOWING_SUCCESS, UNFOLLOWING_FAILURE, 
    REMOVE_FOLLOWER_REQUEST, REMOVE_FOLLOWER_SUCCESS, REMOVE_FOLLOWER_FAILURE, 
    CHANGE_NICKNAME_EDIT_REQUEST, CHANGE_NICKNAME_EDIT_SUCCESS, CHANGE_NICKNAME_EDIT_FAILURE, 
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, 
    LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE,
    
} from '@/reducer/user';
import axios from 'axios';
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';


function logoutAPI() {
    return axios.post('/user/logout' );
}

function* logout() {
    yield call(logoutAPI);
    try {
        yield put({
            type: LOG_OUT_SUCCESS,
        })
    } catch (err) {
        console.error(err);
        yield put({
            type:LOG_OUT_FAILURE,
            error:err.response.data
        })
    } 
}

function loginAPI(data) {
    return axios.post('/user/login', data );
}

function* login(action) {
    try {
        const result = yield call(loginAPI, action.data);
        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data
        })
    } catch (err) {
        console.error(err);
        yield put({
            type:LOG_IN_FAILURE,
            error:err.response.data
        })
    } 
}

function followingAPI(data) {
    return axios.post(`/user/${data}/following`);
}

function* following(action) {
    const result = yield call(followingAPI, action.data);
    try {
        yield put({
            type: FOLLOWING_SUCCESS,
            data: result.data
        })
    } catch (err) {
        console.error(err);
        yield put({
            type:FOLLOWING_FAILURE,
            error:err.response.data
        })
    } 
}

function unfollowingAPI(data) {
    return axios.delete(`/user/${data}/following` );
}

function* unfollowing(action) {
    const result = yield call(unfollowingAPI, action.data);
    try {
        yield put({
            type: UNFOLLOWING_SUCCESS,
            data: result.data
        })
    } catch (err) {
        console.error(err);
        yield put({
            type:UNFOLLOWING_FAILURE,
            error:err.response.data
        })
    } 
}

function removeFollowerAPI(data) {
    return axios.post(`/user/${data}/removeFollower`);
}

function* removeFollower(action) {
    const result = yield call(removeFollowerAPI, action.data);
    try {
        yield put({
            type: REMOVE_FOLLOWER_SUCCESS,
            data: result.data
        })
    } catch (err) {
        console.error(err);
        yield put({
            type: REMOVE_FOLLOWER_FAILURE,
            error:err.response.data
        })
    } 
}

function changeNicknameEditAPI(data) {
    return axios.patch('/user/changeNicknameEdit', data );
}

function* changeNicknameEdit(action) {
    const result = yield call(changeNicknameEditAPI, action.data);
    try {
        yield put({
            type: CHANGE_NICKNAME_EDIT_SUCCESS,
            data: result.data
        })
    } catch (err) {
        console.error(err);
        yield put({
            type: CHANGE_NICKNAME_EDIT_FAILURE,
            error:err.response.data
        })
    } 
}

//email, password, nickname 
function signupAPI(data) {
    return axios.post('/user', data );
}

function* signup(action) {
    yield call(signupAPI, action.data);
    try {
        yield put({
            type: SIGN_UP_SUCCESS,
        })
    } catch (err) {
        console.error(err);
        yield put({
            type: SIGN_UP_FAILURE,
            error:err.response.data
        })
    } 
}

function loadMyInfoAPI() {
    return axios.get('/user');
}

function* loadMyInfo() {
    const result = yield call(loadMyInfoAPI);
    try {
        yield put({
            type: LOAD_MY_INFO_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.error(err);
        yield put({
            type: LOAD_MY_INFO_FAILURE,
            error:err.response.data
        })
    } 
}

function* watchLogout() {
    yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* watchLogin() {
    yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchFollowing() {
    yield takeLatest(FOLLOWING_REQUEST, following);
}

function* watchunFollowing() {
    yield takeLatest(UNFOLLOWING_REQUEST, unfollowing);
}

function* watchRemoveFollower() {
    yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function* watchunChangeNicknameEdit() {
    yield takeLatest(CHANGE_NICKNAME_EDIT_REQUEST, changeNicknameEdit);
}

function* watchSignup() {
    yield takeLatest(SIGN_UP_REQUEST, signup);
}

function* watchLoadMyInfo() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* userSaga() {
    yield all([
        fork(watchLoadMyInfo),
        fork(watchSignup),
        fork(watchunChangeNicknameEdit),
        fork(watchunFollowing),
        fork(watchRemoveFollower),
        fork(watchFollowing),
        fork(watchLogin),
        fork(watchLogout),
    ])
} 

export default userSaga;