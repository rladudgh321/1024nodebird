import { all, fork } from 'redux-saga/effects';
import user from './user';
import post from './post';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:3065';
axios.defaults.withCredentials = true;

function* rootSaga() {
    yield all([
        fork(user),
        fork(post),
    ])
}

export default rootSaga;