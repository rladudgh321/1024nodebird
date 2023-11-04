import React from 'react';
import { useRouter } from 'next/router';
import wrapper from '@/store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '@/reducer/user';
import { LOAD_POST_REQUEST } from '@/reducer/post';
import { END } from 'redux-saga';
import axios from 'axios';
import AppLayout from '@/components/AppLayout';
import PostCard from '@/components/PostCard';
import { useSelector } from 'react-redux';
import Head from 'next/head';


const Post = () => {
    const { singlePost } = useSelector((state)=>state.post);
    const router = useRouter();
    const { id } = router.query;
    return (
        <>
            <Head>
                <title>
                    {`${singlePost.User.nickname}님의 글`}
                </title>
                <meta name='description' content={singlePost.content} />
                <meta property='og:title' content={`${singlePost.User.nickname}님의 게시글`} />
                <meta property='og:description' content={singlePost.content} />
                <meta property='og:image' content={singlePost.Images[0] ? singlePost.Images[0].src : `http://127.0.0.1:3060/favicon.ico` } />
                <meta property='og:url' content={`http://127.0.0.1:3060/post/${id}`} />
            </Head>
            <AppLayout>
                <PostCard post={singlePost} />
            </AppLayout>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async({req,params}) => {
    console.log("[id].js params.id", params.id);
    const cookie = req.headers.cookie;
    axios.defaults.headers.Cookie = '';
    if(req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }
    store.dispatch({
        type:LOAD_MY_INFO_REQUEST,
    });
    store.dispatch({
        type:LOAD_POST_REQUEST,
        data:params.id
    });
    store.dispatch(END);
    await store.sagaTask.toPromise();
})

export default Post;