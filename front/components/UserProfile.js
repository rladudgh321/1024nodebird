import React, { useCallback, useEffect, useState } from 'react';
import { Avatar, Button, Card } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { LOG_OUT_REQUEST } from '@/reducer/user';
import Link from 'next/link';

const UserProfile = () => {
    const dispatch = useDispatch();
    
    const { me, logoutLoading } = useSelector((state)=>state.user);

    const onLogout = useCallback(()=>{
        dispatch({
            type:LOG_OUT_REQUEST
        })
    },[]);
    return (
        <>
            <Card
                actions={[
                    <div key='twit'>짹짹<br /><Link href={`/user/${me.id}`}>{me.Posts.length}</Link></div>,
                    <div key='followings'><Link href='/profile'>팔로잉<br />{me.Followings.length}</Link></div>,
                    <div key='followers'><Link href='/profile'>팔로워<br />{me.Followers.length}</Link></div>,
                ]}
            >
                <Card.Meta
                    avatar={<Link href={`/user/${me.id}`}><Avatar>{me.nickname[0]}</Avatar></Link>}
                    title={me.nickname}
                    description={me.description}
                />
                <Button onClick={onLogout} loading={logoutLoading} >로그아웃</Button>
            </Card>
        </>
    );
}

export default UserProfile;