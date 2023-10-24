import React, { useState, useCallback } from 'react';
import { Card, Button, Avatar, Popover, List } from 'antd';
import FollowButton from './FollowButton';
import PostImage from './PostImage';
import CommentForm from './CommentForm';
import { RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { REMOVE_POST_REQUEST } from '@/reducer/post';

const PostCard = ({post}) => {
    const dispatch = useDispatch();
    const { me } = useSelector((state)=>state.user);
    const [ openMessage, setOpenMessage ] = useState(false);
    const messageHandler = useCallback(()=>{
        setOpenMessage((prev) => !prev);
    },[]);
    const onRemoveBtn = useCallback(()=>{
        dispatch({
            type:REMOVE_POST_REQUEST,
            data:post.id
        })
    },[]);
    return (
        <>
            <Card
                extra={ <FollowButton post={post} /> }
                cover={post.Image[0] && <PostImage images={post.Image} />}
                actions={[
                    <RetweetOutlined key='retweet' />, 
                    <HeartOutlined key='like' />, 
                    <MessageOutlined key='content' onClick={messageHandler} />,
                    <Popover key='more' content={
                        <Button.Group>
                            {
                                me & post.User.id === me?.id
                                ?
                                <>
                                    <Button>수정</Button>
                                    <Button onClick={onRemoveBtn}>삭제</Button>
                                </>
                                :
                                <Button>신고</Button>}
                        </Button.Group>
                    }>
                        <EllipsisOutlined />
                    </Popover>
                ]}
            >
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={post.content}
                />

            </Card>
            {
                openMessage && (<>
                    { me && <CommentForm post={post} />}
                    <List
                        header={`${post.Comment.length}개의 댓글이 있습니다`}
                        bordered
                        size='small'
                        dataSource={post.Comment}
                        renderItem={(item) => (
                            <Card>
                                <Card.Meta
                                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                    title={item.User.nickname}
                                    description={item.content}
                                />
                            </Card>
                        )}
                    >
                        
                    </List>
                    </>
                )
            }
        </>
    );
}

export default PostCard;


/*
팔로우 버튼
이미지
내용물
버튼들

*/