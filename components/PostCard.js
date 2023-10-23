import React, { useState, useCallback } from 'react';
import { Card, Button, Avatar, Popover, List } from 'antd';
import FollowButton from './FollowButton';
import PostImage from './PostImage';
import CommentForm from './CommentForm';
import { RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';

const PostCard = ({post}) => {
    const [ openMessage, setOpenMessage ] = useState(false);
    const messageHandler = useCallback(()=>{
        setOpenMessage((prev) => !prev);
    },[]);
    return (
        <>
            <Card
                extra={ <FollowButton post={post} /> }
                cover={post.Image[0] && <PostImage images={post.Image} />}
                actions={[
                    <RetweetOutlined />, 
                    <HeartOutlined />, 
                    <MessageOutlined onClick={messageHandler} />,
                    <Popover content={
                        <Button.Group>
                            <Button>수정</Button>
                            <Button>삭제</Button>
                            <Button>신고</Button>
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
                    <CommentForm post={post} />
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