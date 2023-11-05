import React, { useState, useCallback } from 'react';
import { Card, Button, Avatar, Popover, List } from 'antd';
import FollowButton from './FollowButton';
import PostImage from './PostImage';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { RetweetOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { LIKE_REQUEST, REMOVE_POST_REQUEST, UNLIKE_REQUEST, RETWEET_REQUEST } from '@/reducer/post';
import Link from 'next/link';
import moment from 'moment';

moment.locale('ko');

const PostCard = ({post}) => {
    const dispatch = useDispatch();
    const { me } = useSelector((state)=>state.user);
    const likePostBtn = useCallback(()=>{
        if(!me?.id){
            return null;
        }
        dispatch({
            type:LIKE_REQUEST,
            data:post.id
        })
    },[me]);
    const unlikePostBtn = useCallback(()=>{
        if(!me?.id){
            return null;
        }
        dispatch({
            type:UNLIKE_REQUEST,
            data:post.id
        })
    },[me]);
    const [ openMessage, setOpenMessage ] = useState(false);
    const messageHandler = useCallback(()=>{
        setOpenMessage((prev) => !prev);
    },[]);
    const onRemoveBtn = useCallback(()=>{
        if(!me?.id){
            return null;
        }
        dispatch({
            type:REMOVE_POST_REQUEST,
            data:post.id
        })
    },[me]);
    const onRetweet = useCallback(()=>{
        if(!me?.id){
            return null;
        }
        dispatch({
            type:RETWEET_REQUEST,
            data:post.id
        })
    },[me]);
    const isLiked = post.Likers.find((v) => v.id === me?.id);
    return (
        <div key={post.id}>
            <Card
                extra={ (me && post.User.id !== me.id) && <FollowButton post={post} /> }
                cover={post.Images[0] && <PostImage images={post.Images} />}
                actions={[
                    <RetweetOutlined key='retweet' onClick={onRetweet} />, 
                    me && isLiked //로그인 한사람만 좋아요 누를 수 있도록
                    ? <HeartTwoTone key='like' twoToneColor='red' onClick={unlikePostBtn} />
                    : <HeartOutlined key='unlike' onClick={likePostBtn} />, 
                    <MessageOutlined key='content' onClick={messageHandler} />,
                    <Popover key='more' content={
                        <Button.Group>
                            {
                                me && post.User.id === me.id
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
                {
                    post.RetweetId && post.Retweet
                    ? <Card
                        title={ `${post.User.nickname}님이 리트윗했습니다` }
                        cover={post.Retweet.Images[0] && <PostImage images={post.Retweet.Images} />}
                    >
                        <div style={{float:'right'}}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>
                        <Card.Meta 
                            avatar={<Link href={`/user/${post.Retweet.User.id}`}><Avatar>{post.Retweet.User.nickname[0]}</Avatar></Link>}
                            title={post.Retweet.User.nickname}
                            description={<PostCardContent content={post.Retweet.content} />}
                        />
                    </Card>
                    :
                    <>    
                        <div style={{float:'right'}}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>
                        <Card.Meta
                            avatar={<Link href={`/user/${post.User.id}`}><Avatar>{post.User?.nickname[0]}</Avatar></Link>}
                            title={post.User?.nickname}
                            description={<PostCardContent content={post.content} />}
                        />
                    </>

                }
            </Card>
            {
                openMessage && (<>
                    { me && <CommentForm post={post} />}
                    <List
                        header={`${post.Comments.length}개의 댓글이 있습니다`}
                        bordered
                        size='small'
                        dataSource={post.Comments}
                        renderItem={(item) => (
                            <Card>
                                <div style={{float:'right'}}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>
                                <Card.Meta
                                    avatar={<Link href={`/user/${item.User.id}`}><Avatar>{item.User.nickname[0]}</Avatar></Link>}
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
        </div>
    );
}

export default PostCard;


/*
팔로우 버튼
이미지
내용물
버튼들

*/