import React, { useCallback } from 'react';
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
                    <div key='twit' style={{ cursor:'default' }}>짹짹<br />{me.Post.length}</div>,
                    <div key='followings'><Link href='/profile'>팔로잉<br />{me.Followings.length}</Link></div>,
                    <div key='followers'><Link href='/profile'>팔로워<br />{me.Followers.length}</Link></div>,
                ]}
            >
                <Card.Meta
                    avatar={<Avatar>{me.nickname[0]}</Avatar>}
                    title={me.nickname}
                    description="김영호가 만든다"
                />
                <Button onClick={onLogout} loading={logoutLoading} >로그아웃</Button>
            </Card>
        </>
    );
}

export default UserProfile;