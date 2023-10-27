import { produce } from "immer";
import shortid from "shortid";

const initialState = {
    mainPost: [{
        id:shortid.generate(),
        content:'첫 게시글 #익스프레스 #노드',
        User:{
            id:1,
            nickname:'김영호'
        },
        Image:[{
            src:'https://health.chosun.com/site/data/img_dir/2023/06/20/2023062002262_0.jpg'
        },{
            src:'https://health.chosun.com/site/data/img_dir/2022/05/04/2022050401754_0.jpg'
        },{
            src:'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRKo5mWOlF8xPviHgJFlo0cexqTPmvZhqxOoGQ_OlPZ3hlNU-0Te4WlGR0peNOXWzbe'
        },],
        Comment:[{
            id:1,
            content:'안녕 친구야',
            User:{
                id:2,
                nickname:'권현주'
            }
        }, {
            id:2,
            content:'힘내용',
            User:{
                id:3,
                nickname:'김지유'
            }
        }]
    }],
    removePostLoading:false,
    removePostDone:false,
    removePostError:null,
    addPostLoading:false,
    addPostDone:false,
    addPostError:null,
    addCommentLoading:false,
    addCommentDone:false,
    addCommentError:null,
}


export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';


const dummyPost = (data) => ({
            id:data.id,
            content:data.content,
            User:{
                id:1,
                nickname:'김영호'
            },
            Image:[{
                src:'https://health.chosun.com/site/data/img_dir/2023/06/20/2023062002262_0.jpg'
            },{
                src:'https://health.chosun.com/site/data/img_dir/2022/05/04/2022050401754_0.jpg'
            },{
                src:'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRKo5mWOlF8xPviHgJFlo0cexqTPmvZhqxOoGQ_OlPZ3hlNU-0Te4WlGR0peNOXWzbe'
            },],
            Comment:[{
                id:1,
                content:'안녕 친구야',
                User:{
                    id:2,
                    nickname:'권현주'
                }
            }, {
                id:2,
                content:'힘내용',
                User:{
                    id:3,
                    nickname:'김지유'
                }
            }]
        });

const dummyComment = (data) => ({
    id:data.UserId,
    content:data.content,
    User:{
        id:1,
        nickname:'김영호'
    }
})

const postReducer = (state = initialState, action) => produce(state, (draft) => {
    switch(action.type) {
        case REMOVE_POST_REQUEST :
            draft.removePostLoading = true;
            draft.removePostDone = false;
            draft.removePostError = null;
            break;
        case REMOVE_POST_SUCCESS :
            draft.removePostLoading = false;
            draft.removePostDone = true;
            draft.mainPost = draft.mainPost.filter((v)=>v.id !== action.data);
            break;
        case REMOVE_POST_FAILURE :
            draft.removePostLoading = false;
            draft.removePostError = action.error;
            break;
        case ADD_POST_REQUEST :
            draft.addPostLoading = true;
            draft.addPostDone = false;
            draft.addPostError = null;
            break;
        case ADD_POST_SUCCESS :
            draft.addPostLoading = false;
            draft.addPostDone = true;
            draft.mainPost.unshift(dummyPost(action.data));
            break;
        case ADD_POST_FAILURE :
            draft.addPostLoading = false;
            draft.addPostError = action.error;
            break;
        case ADD_COMMENT_REQUEST :
            draft.addCommentLoading = true;
            draft.addCommentDone = false;
            draft.addCommentError = null;
            break;
        case ADD_COMMENT_SUCCESS :
            draft.addCommentLoading = false;
            draft.addCommentDone = true;
            const post = draft.mainPost.find((v)=>v.id === action.data.PostId);
            post.Comment.unshift(dummyComment(action.data));
            break;
        case ADD_COMMENT_FAILURE :
            draft.addCommentLoading = false;
            draft.addCommentError = action.error;
            break;
        default :
            break;
    }
});

export default postReducer;