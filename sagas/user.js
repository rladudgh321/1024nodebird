import { LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE, 
    FOLLOWING_REQUEST, FOLLOWING_SUCCESS, FOLLOWING_FAILURE, 
    UNFOLLOWING_REQUEST, UNFOLLOWING_SUCCESS, UNFOLLOWING_FAILURE, 
    REMOVE_FOLLOWER_REQUEST, REMOVE_FOLLOWER_SUCCESS, REMOVE_FOLLOWER_FAILURE, 
    CHANGE_NICKNAME_EDIT_REQUEST, CHANGE_NICKNAME_EDIT_SUCCESS, CHANGE_NICKNAME_EDIT_FAILURE, 
    SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
    
} from '@/reducer/user';
import axios from 'axios';
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';


function logoutAPI() {
    return axios.post('/user/logout' );
}

function* logout(action) {
    // yield call(logoutAPI);
    yield delay(1000);
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
    // yield call(loginAPI, action.data);
    yield delay(1000);
    try {
        yield put({
            type: LOG_IN_SUCCESS,
            data: action.data
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
    return axios.post('/user/following', data );
}

function* following(action) {
    // yield call(followingAPI, action.data);
    yield delay(1000);
    try {
        yield put({
            type: FOLLOWING_SUCCESS,
            data: action.data
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
    return axios.post('/user/unfollowing', data );
}

function* unfollowing(action) {
    // yield call(unfollowingAPI, action.data);
    yield delay(1000);
    try {
        yield put({
            type: UNFOLLOWING_SUCCESS,
            data: action.data
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
    return axios.post('/user/removeFollower', data );
}

function* removeFollower(action) {
    // yield call(removeFollowerAPI, action.data);
    yield delay(1000);
    try {
        yield put({
            type: REMOVE_FOLLOWER_SUCCESS,
            data: action.data
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
    return axios.post('/user/changeNicknameEdit', data );
}

function* changeNicknameEdit(action) {
    // yield call(changeNicknameEditAPI, action.data);
    yield delay(1000);
    try {
        yield put({
            type: CHANGE_NICKNAME_EDIT_SUCCESS,
            data: action.data
        })
    } catch (err) {
        console.error(err);
        yield put({
            type: CHANGE_NICKNAME_EDIT_FAILURE,
            error:err.response.data
        })
    } 
}

function signupAPI(data) {
    return axios.post('/user', data );
}

function* signup() {
    // yield call(signupAPI, action.data);
    yield delay(1000);
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

function* userSaga() {
    yield all([
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