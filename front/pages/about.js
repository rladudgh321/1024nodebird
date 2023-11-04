import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { END } from 'redux-saga';
import Link from 'next/link';
import { Avatar, Card } from 'antd';
import AppLayout from '@/components/AppLayout';
import wrapper from '@/store/configureStore';
import { LOAD_USER_INFO_REQUEST } from '@/reducer/user';

const About = () => {
    const { userInfo } = useSelector((state) => state.user);
    return (
        <AppLayout>
            <Head>
                <title>about | page</title>
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
        </AppLayout>
    );
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
    store.dispatch({
        type: LOAD_USER_INFO_REQUEST,
        data: 1
    });
    store.dispatch(END);
    await store.sagaTask.toPromise();
});

export default About;