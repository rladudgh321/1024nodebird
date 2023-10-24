import React, { useCallback } from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { FOLLOWING_REQUEST, UNFOLLOWING_REQUEST } from '@/reducer/user';

const FollowButton = ({post}) => {
    const dispatch = useDispatch();
    const { me } = useSelector((state)=>state.user);
    const isFollow = (me.Followings.find((v)=>v.id === post.User.id));
    const onFollowBtn = useCallback(()=>{
        if(isFollow){
            dispatch({
                type:UNFOLLOWING_REQUEST,
                data:post.User.id
            });
        } else {
            dispatch({
                type:FOLLOWING_REQUEST,
                data:post.User.id
            });
        }
    },[isFollow]);
    return (
        <>
            <Button onClick={onFollowBtn}>{ isFollow ? '언팔로우' : '팔로우' }</Button>
        </>
    );
}

export default FollowButton;