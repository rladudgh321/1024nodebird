import { ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE
} from '@/reducer/post';
import axios from 'axios';
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';

function addPostAPI(data) {
    return axios.post('/user/addPost', data );
}

function* addPost(action) {
    // yield call(addPostAPI, action.data);
    yield delay(1000);
    try {
        yield put({
            type: ADD_POST_SUCCESS,
            data: action.data
        })
    } catch (err) {
        console.error(err);
        put({
            type:ADD_POST_FAILURE,
            error:err.response.data
        })
    } 
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* postSaga() {
    yield all([
        fork(watchAddPost),
    ])
} 

export default postSaga;