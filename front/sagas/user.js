import { LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
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
        put({
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
        put({
            type:LOG_IN_FAILURE,
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

function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
    ])
} 

export default userSaga;