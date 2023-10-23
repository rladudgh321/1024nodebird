import React, { useCallback } from 'react';
import { Avatar, Button, Card } from 'antd';
import { useDispatch } from 'react-redux';
import { LOG_OUT_REQUEST } from '@/reducer/user';

const UserProfile = () => {
    const dispatch = useDispatch();
    const onLogout = useCallback(()=>{
        dispatch({
            type:LOG_OUT_REQUEST
        })
    },[]);
    return (
        <>
            <Card
                actions={[
                    <div key='twit'>짹짹<br />0</div>,
                    <div key='followings'>팔로잉<br />0</div>,
                    <div key='followers'>팔로워<br />0</div>,
                ]}
            >
                <Card.Meta
                    avatar={<Avatar>김</Avatar>}
                    title="김영호"
                    description="김영호가 만든다"
                />
                <Button onClick={onLogout}>로그아웃</Button>
            </Card>
        </>
    );
}

export default UserProfile;