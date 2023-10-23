import { produce } from "immer";
import shortid from "shortid";

const initialState = {
    me: null,
    signup: false,
    

}

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const CHANGE_NICKNAME_EDIT_REQUEST = 'CHANGE_NICKNAME_EDIT_REQUEST';
export const CHANGE_NICKNAME_EDIT_SUCCESS = 'CHANGE_NICKNAME_EDIT_SUCCESS';
export const CHANGE_NICKNAME_EDIT_FAILURE = 'CHANGE_NICKNAME_EDIT_FAILURE';
export const FOLLOWING_REQUEST = 'FOLLOWING_REQUEST';
export const FOLLOWING_SUCCESS = 'FOLLOWING_SUCCESS';
export const FOLLOWING_FAILURE = 'FOLLOWING_FAILURE';
export const UNFOLLOWING_REQUEST = 'UNFOLLOWING_REQUEST';
export const UNFOLLOWING_SUCCESS = 'UNFOLLOWING_SUCCESS';
export const UNFOLLOWING_FAILURE = 'UNFOLLOWING_FAILURE';
export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const dummyUser = (data) => ({
    ...data,
    id:shortid.generate(),
    nickname:'권현주',
    Followings:[{id:1, nickname:'김소방'},{id:2, nickname:'이소방'},{id:3, nickname:'박소방'},{id:4, nickname:'홍소방'},{id:5, nickname:'푸소방'},{id:6, nickname:'호소방'},{id:7, nickname:'큐소방'},{id:8, nickname:'나소방'},{id:9, nickname:'천소방'}],
    Followers:[{id:1, nickname:'김소방'},{id:2, nickname:'이소방'},{id:3, nickname:'박소방'},{id:4, nickname:'홍소방'},{id:5, nickname:'푸소방'},{id:6, nickname:'호소방'},{id:7, nickname:'큐소방'},{id:8, nickname:'나소방'},{id:9, nickname:'천소방'}]

})

const userReducer = (state = initialState, action) => produce(state, draft => {
    switch(action.type) {
        case LOG_IN_REQUEST :
            draft.me = dummyUser(action.data);
            break;
        case LOG_OUT_REQUEST:
            draft.me = null;
            break;
        case SIGN_UP_REQUEST:
            draft.signup = true;
            break;
        case CHANGE_NICKNAME_EDIT_REQUEST:
            draft.me.nickname = action.data;
            break;
        case FOLLOWING_REQUEST:
            console.log('draft.me.Followings', draft.me.Followings);
            draft.me.Followings.push({id:action.data, nickanme:'ddddddd'});
            break;
        case UNFOLLOWING_REQUEST:
            draft.me.Followings = draft.Followings.filter((v)=> v.id !== action.data);
            break;
        case REMOVE_FOLLOWER_REQUEST:
            draft.me.Followers = draft.Followers.filter((v)=> v.id !== action.data);
            break;
        default :
            break;
    }
});

export default userReducer;