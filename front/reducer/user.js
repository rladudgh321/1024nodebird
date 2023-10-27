import { produce } from "immer";
import shortid from "shortid";

const initialState = {
    me: null,
    loginLoading: false,
    loginDone: false,
    loginError: null,
    logoutLoading: false,
    logoutDone: false,
    logoutError: null,
    signupLoading: false,
    signupDone: false,
    signupError: null,
    changeNicknameEditLoading: false,
    changeNicknameEditDone: false,
    changeNicknameEditError: null,
    followLoading: false,
    followDone: false,
    followError: null,
    unfollowLoading: false,
    unfollowDone: false,
    unfollowError: null,
    removeFollowLoading: false,
    removeFollowDone: false,
    removeFollowError: null,
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

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

const dummyUser = (data) => ({
    id:shortid.generate(),
    nickname: data.nickname || '이름을 설정해주세요',
    description: data.description || '나는 행복한 사람이야',
    Post:[{id:1}, {id:2}],
    Followings:[{id:1, nickname:'김소방'},{id:2, nickname:'이소방'},{id:3, nickname:'박소방'},{id:4, nickname:'홍소방'},{id:5, nickname:'푸소방'},{id:6, nickname:'호소방'},{id:7, nickname:'큐소방'},{id:8, nickname:'나소방'},{id:9, nickname:'천소방'}],
    Followers:[{id:1, nickname:'김소방'},{id:2, nickname:'이소방'},{id:3, nickname:'박소방'},{id:4, nickname:'홍소방'},{id:5, nickname:'푸소방'},{id:6, nickname:'호소방'},{id:7, nickname:'큐소방'},{id:8, nickname:'나소방'},{id:9, nickname:'천소방'}]

})

const userReducer = (state = initialState, action) => produce(state, (draft) => {
    switch(action.type) {
        case LOG_IN_REQUEST :
            draft.loginLoading = true;
            draft.loginDone = false;
            draft.loginError = null;
            break;
        case LOG_IN_SUCCESS :
            draft.loginLoading = false;
            draft.loginDone = true;
            draft.me = dummyUser(action.data);
            break;
        case LOG_IN_FAILURE :
            draft.loginLoading = false;
            draft.loginError = action.error;
            break;
        case LOG_OUT_REQUEST :
            draft.logoutLoading = true;
            draft.logoutDone = false;
            draft.logoutError = null;
            break;
        case LOG_OUT_SUCCESS :
            draft.logoutLoading = false;
            draft.logoutDone = true;
            draft.me = null;
            break;
        case LOG_OUT_FAILURE :
            draft.logoutLoading = false;
            draft.logoutError = action.error;
            break;
        case SIGN_UP_REQUEST :
            draft.signupLoading = true;
            draft.signupDone = false;
            draft.signupError = null;
            break;
        case SIGN_UP_SUCCESS :
            draft.signupLoading = false;
            draft.signupDone = true;
            break;
        case SIGN_UP_FAILURE :
            draft.signupLoading = false;
            draft.signupError = action.error;
            break;
        case CHANGE_NICKNAME_EDIT_REQUEST :
            draft.changeNicknameEditLoading = true;
            draft.changeNicknameEditDone = false;
            draft.changeNicknameEditError = null;
            break;
        case CHANGE_NICKNAME_EDIT_SUCCESS :
            draft.changeNicknameEditLoading = false;
            draft.changeNicknameEditDone = true;
            draft.me.nickname = action.data;
            break;
        case CHANGE_NICKNAME_EDIT_FAILURE :
            draft.changeNicknameEditLoading = false;
            draft.changeNicknameEditError = action.error;
            break;
        case FOLLOWING_REQUEST :
            draft.followLoading = true;
            draft.followDone = false;
            draft.followError = null;
            break;
        case FOLLOWING_SUCCESS :
            draft.followLoading = false;
            draft.followDone = true;
            draft.me.Followings.push({id:action.data, nickname:'kkk'});
            break;
        case FOLLOWING_FAILURE :
            draft.followLoading = false;
            draft.followError = action.error;
            break;
        case UNFOLLOWING_REQUEST :
            draft.unfollowLoading = true;
            draft.unfollowDone = false;
            draft.unfollowError = null;
            break;
        case UNFOLLOWING_SUCCESS :
            draft.unfollowLoading = false;
            draft.unfollowDone = true;
            draft.me.Followings = draft.me.Followings.filter((v)=> v.id !== action.data);
            break;
        case UNFOLLOWING_FAILURE :
            draft.unfollowLoading = false;
            draft.unfollowError = action.error;
            break;
        case REMOVE_FOLLOWER_REQUEST :
            draft.removeFollowLoading = true;
            draft.removeFollowDone = false;
            draft.removeFollowError = null;
            break;
        case REMOVE_FOLLOWER_SUCCESS :
            draft.removeFollowLoading = false;
            draft.removeFollowDone = true;
            draft.me.Followers = draft.me.Followers.filter((v)=> v.id !== action.data);
            break;
        case REMOVE_FOLLOWER_FAILURE :
            draft.removeFollowLoading = false;
            draft.removeFollowError = action.error;
            break;
        case ADD_POST_TO_ME :
            draft.me.Post.push({id:action.data});
            break;
        case REMOVE_POST_OF_ME :
            draft.me.Post  = draft.me.Post.filter((v)=>v.id !== action.data);
            break;
        default :
            break;
    }
});

export default userReducer;