import { combineReducers } from "redux";
import user from './user';
import post from './post';
import { HYDRATE } from "next-redux-wrapper";

const rootReducer = (state, action) => {
    switch(action.type) {
        case HYDRATE :
            // console.log('HYDRATE', action);
            return { ...state, ...action.payload }
        default : {
            const combineReducer = combineReducers({
                user,
                post,
            });
            return combineReducer(state, action);
        }
    }
}

export default rootReducer;