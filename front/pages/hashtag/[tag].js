import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';
import { END } from 'redux-saga';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { LOAD_HASHTAG_POSTS_REQUEST } from '@/reducer/post';
import { LOAD_MY_INFO_REQUEST } from '@/reducer/user';
import PostCard from '@/components/PostCard';
import wrapper from '@/store/configureStore';
import AppLayout from '@/components/AppLayout';

const Hashtag = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { tag } = router.query;
    const { mainPost, hasmore, loadPostsLoading } = useSelector((state) => state.post);
    const { userInfo } = useSelector((state) => state.user);

    useEffect(()=>{
        function scrollEvent(){
          if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 500 ) {
            if(hasmore && !loadPostsLoading) {
              const lastId = mainPost[mainPost.length - 1]?.id;
              dispatch({
                type: LOAD_HASHTAG_POSTS_REQUEST,
                lastId,
                data:tag,
              });
            }
          }  
        }
        window.addEventListener('scroll', scrollEvent);
        return () => {
          window.removeEventListener('scroll', scrollEvent);
        }
    
      },[hasmore, loadPostsLoading, mainPost, tag]);
    return (
        <>
            <AppLayout>
                {
                    mainPost.map((v) => (
                        <PostCard key={v.id} post={v} />
                    ))
                }
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
        type:LOAD_HASHTAG_POSTS_REQUEST,
        data:params.id
    });

    store.dispatch(END);
    await store.sagaTask.toPromise();
})

export default Hashtag;