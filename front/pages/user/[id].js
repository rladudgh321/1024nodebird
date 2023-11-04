import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';
import { END } from 'redux-saga';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { LOAD_USER_POSTS_REQUEST } from '@/reducer/post';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_INFO_REQUEST } from '@/reducer/user';
import PostCard from '@/components/PostCard';
import wrapper from '@/store/configureStore';
import AppLayout from '@/components/AppLayout';

const User = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const { mainPost, hasmore, loadPostsLoading } = useSelector((state) => state.post);
    const { userInfo } = useSelector((state) => state.user);

    useEffect(()=>{
        function scrollEvent(){
          if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 500 ) {
            if(hasmore && !loadPostsLoading) {
              const lastId = mainPost[mainPost.length - 1]?.id;
              dispatch({
                type: LOAD_USER_POSTS_REQUEST,
                lastId,
                data:id,
              });
            }
          }  
        }
        window.addEventListener('scroll', scrollEvent);
        return () => {
          window.removeEventListener('scroll', scrollEvent);
        }
    
      },[hasmore, loadPostsLoading, mainPost, id]);
    return (
        <>
            <AppLayout>
                <Head>
                    <title>
                        {`${userInfo.nickname}님의 글`}
                    </title>
                    <meta name='description' content={userInfo.description} />
                    <meta property='og:title' content={`${userInfo.nickname}님의 게시글`} />
                    <meta property='og:description' content={userInfo.description} />
                    <meta property='og:image' content= 'http://127.0.0.1:3060/favicon.ico' />
                    <meta property='og:url' content={`http://127.0.0.1:3060/post/${id}`} />
                </Head>
                {
                userInfo
                ? (
                    <Card
                        actions={[
                            <div key='twit' style={{ cursor:'default' }}>짹짹<br />{userInfo.Posts}</div>,
                            <div key='followings'><Link href='/profile'>팔로잉<br />{userInfo.Followings}</Link></div>,
                            <div key='followers'><Link href='/profile'>팔로워<br />{userInfo.Followers}</Link></div>,
                        ]}
                    >
                        <Card.Meta
                            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
                            title={userInfo.nickname}
                            description={userInfo.description}
                        />
                    </Card>
                )
                : null }
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
        type:LOAD_USER_POSTS_REQUEST,
        data:params.id
    });
    store.dispatch({
        type:LOAD_USER_INFO_REQUEST,
        data:params.id
    });
    store.dispatch(END);
    await store.sagaTask.toPromise();
})

export default User;