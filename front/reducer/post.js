import { produce } from "immer";
// import shortid from "shortid";
// import { faker } from '@faker-js/faker';

/*
{
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
    }{
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
    }
*/



const initialState = {
    mainPost: [],
    singlePost: null,
    imagePaths:[],
    likePost:[],
    hasmore:true,
    removePostLoading:false,
    removePostDone:false,
    removePostError:null,
    addPostLoading:false,
    addPostDone:false,
    addPostError:null,
    addCommentLoading:false,
    addCommentDone:false,
    addCommentError:null,
    loadHashtagPostsLoading:false,
    loadHashtagPostsDone:false,
    loadHashtagPostsError:null,
    loadUserPostsLoading:false,
    loadUserPostsDone:false,
    loadUserPostsError:null,
    loadPostsLoading:false,
    loadPostsDone:false,
    loadPostsError:null,
    loadPostLoading:false,
    loadPostDone:false,
    loadPostError:null,
    uploadImageLoading:false,
    uploadImageDone:false,
    uploadImageError:null,
    likeLoading:false,
    likeDone:false,
    likeError:null,
    unlikeLoading:false,
    unlikeDone:false,
    unlikeError:null,
    retweetLoading:false,
    retweetDone:false,
    retweetError:null,
}

export const REMOVE_POST_IMAGE = 'REMOVE_POST_IMAGE';
export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';
export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';
export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';
export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';
export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';
export const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE';
export const LIKE_REQUEST = 'LIKE_REQUEST';
export const LIKE_SUCCESS = 'LIKE_SUCCESS';
export const LIKE_FAILURE = 'LIKE_FAILURE';
export const UNLIKE_REQUEST = 'UNLIKE_REQUEST';
export const UNLIKE_SUCCESS = 'UNLIKE_SUCCESS';
export const UNLIKE_FAILURE = 'UNLIKE_FAILURE';
export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';


// const dummyPost = (data) => ({
//             id:data.id,
//             content:data.content,
//             User:{
//                 id:1,
//                 nickname:'김영호'
//             },
//             Image:[{
//                 src:'https://health.chosun.com/site/data/img_dir/2023/06/20/2023062002262_0.jpg'
//             },{
//                 src:'https://health.chosun.com/site/data/img_dir/2022/05/04/2022050401754_0.jpg'
//             },{
//                 src:'https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRKo5mWOlF8xPviHgJFlo0cexqTPmvZhqxOoGQ_OlPZ3hlNU-0Te4WlGR0peNOXWzbe'
//             },],
//             Comment:[{
//                 id:1,
//                 content:'안녕 친구야',
//                 User:{
//                     id:2,
//                     nickname:'권현주'
//                 }
//             }, {
//                 id:2,
//                 content:'힘내용',
//                 User:{
//                     id:3,
//                     nickname:'김지유'
//                 }
//             }]
//         });

const dummyComment = (data) => ({
    id:data.UserId,
    content:data.content,
    User:{
        id:1,
        nickname:'김영호'
    }
})

// export const generateDummyPost = (number) => ( Array(number).fill().map(()=>({
//     id:shortid.generate(),
//     content:faker.word.words(15),
//     User: {
//         id:shortid.generate(),
//         nickname:faker.person.fullName(),
//     },
//     Image:[{
//         src:faker.image.avatar()
//     },{
//         src:faker.image.urlLoremFlickr(),
//     },{
//         src:faker.image.avatar()
//     },{
//         src:faker.image.urlLoremFlickr(),
//     },{
//         src:faker.image.avatar()
//     },{
//         src:faker.image.urlLoremFlickr(),
//     }],
//     Comment:[{
//         id:shortid.generate(),
//         content:faker.word.words(15),
//         User: {
//             id:shortid.generate(),
//             nickname:faker.person.fullName(),
//         }
//     },{
//         id:shortid.generate(),
//         content:faker.word.words(15),
//         User: {
//             id:shortid.generate(),
//             nickname:faker.person.fullName(),
//         }
//     }]
// })) )


const postReducer = (state = initialState, action) => produce(state, (draft) => {
    switch(action.type) {
        case REMOVE_POST_IMAGE : 
            draft.imagePaths = draft.imagePaths.filter((v,i) => i !== action.data );
            break;
        case UPLOAD_IMAGE_REQUEST :
            draft.uploadImageLoading = true;
            draft.uploadImageDone = false;
            draft.uploadImageError = null;
            break;
        case UPLOAD_IMAGE_SUCCESS :
            draft.imagePaths = action.data;
            draft.uploadImageLoading = false;
            draft.uploadImageDone = true;
            break;
        case UPLOAD_IMAGE_FAILURE :
            draft.uploadImageLoading = false;
            draft.uploadImageError = action.error;
            break;
        case LIKE_REQUEST :
            draft.likeLoading = true;
            draft.likeDone = false;
            draft.likeError = null;
            break;
        case LIKE_SUCCESS : {
            const post = draft.mainPost.find((v)=> v.id === action.data.PostId);
            post.Likers.push({id:action.data.UserId});
            draft.likeLoading = false;
            draft.likeDone = true;
            break;
        }
        case LIKE_FAILURE :
            draft.likeLoading = false;
            draft.likeError = action.error;
            break;
        case UNLIKE_REQUEST :
            draft.unlikeLoading = true;
            draft.unlikeDone = false;
            draft.unlikeError = null;
            break;
        case UNLIKE_SUCCESS :{
            const post = draft.mainPost.find((v)=> v.id === action.data.PostId);
            post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId );
            draft.unlikeLoading = false;
            draft.unlikeDone = true;
            break;
        }
        case UNLIKE_FAILURE :
            draft.unlikeLoading = false;
            draft.unlikeError = action.error;
            break;
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
            draft.mainPost.unshift(action.data);
            draft.imagePaths = [];
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
            post.Comments.unshift(action.data);
            break;
        case ADD_COMMENT_FAILURE :
            draft.addCommentLoading = false;
            draft.addCommentError = action.error;
            break;
        case LOAD_USER_POSTS_REQUEST :
        case LOAD_HASHTAG_POSTS_REQUEST :
        case LOAD_POSTS_REQUEST :
            draft.loadPostsLoading = true;
            draft.loadPostsDone = false;
            draft.loadPostsError = null;
            break;
        case LOAD_USER_POSTS_SUCCESS :
        case LOAD_HASHTAG_POSTS_SUCCESS :
        case LOAD_POSTS_SUCCESS :
            draft.loadPostsLoading = false;
            draft.loadPostsDone = true;
            draft.mainPost = draft.mainPost.concat(action.data);
            draft.hasmore = action.data.length === 10;
            break;
        case LOAD_USER_POSTS_FAILURE :
        case LOAD_HASHTAG_POSTS_FAILURE :
        case LOAD_POSTS_FAILURE :
            draft.loadPostsLoading = false;
            draft.loadPostsError = action.error;
            break;
        case LOAD_POST_REQUEST :
            draft.loadPostLoading = true;
            draft.loadPostDone = false;
            draft.loadPostError = null;
            break;
        case LOAD_POST_SUCCESS :
            draft.loadPostLoading = false;
            draft.loadPostDone = true;
            draft.singlePost = action.data;
            break;
        case LOAD_POST_FAILURE :
            draft.loadPostLoading = false;
            draft.loadPostError = action.error;
            break;
        case RETWEET_REQUEST :
            draft.retweetLoading = true;
            draft.retweetDone = false;
            draft.retweetError = null;
            break;
        case RETWEET_SUCCESS :
            draft.retweetLoading = false;
            draft.retweetDone = true;
            draft.mainPost.unshift(action.data);
            break;
        case RETWEET_FAILURE :
            draft.retweetLoading = false;
            draft.retweetError = action.error;
            break;
        default :
            break;
    }
});

export default postReducer;