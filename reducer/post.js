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
    }]
}



export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';

const dummyPost = (data) => ({
    id:shortid.generate(),
    content:data.content,
});

const dummyComment = (data) => ({
})

const postReducer = (state = initialState, action) => produce(state, (draft) => {
    switch(action.type) {
        case ADD_COMMENT_REQUEST:
            const post = draft.mainPost((v)=>v.id === action.data.PostId);
            post.Comment.unshift(action.data.content);
            break;
        default :
            break;
    }
});

export default postReducer;