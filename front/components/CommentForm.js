import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import useInput from '@/hooks/useInput';
import { useSelector, useDispatch } from 'react-redux';
import {ADD_COMMENT_REQUEST} from '@/reducer/post';

const CommentForm = ({post}) => {
    const dispatch = useDispatch();
    const { me } = useSelector((state)=>state.user);
    const { addCommentLoading, addCommentDone } = useSelector((state) => state.post);
    const [commentText, onChangeComment, setter] = useInput('');
    useEffect(()=>{
        if(addCommentDone) {
            setter('');
        }
    },[addCommentDone]);
    const onSubmit = useCallback(()=>{
        dispatch({
            type:ADD_COMMENT_REQUEST,
            data:{ content:commentText, PostId:post.id, UserId: me.id }
        })
    },[commentText]);
    return (
        <>
            <Form style={{ marginBottom:40 }} onFinish={onSubmit}>
                <Input.TextArea 
                value={commentText} onChange={onChangeComment}
                maxLength={140} style={{ overflowY:"auto" }} />
                <Button type='primary' loading={addCommentLoading} style={{ float:'right' }} htmlType='submit'>삐약</Button>
            </Form>
        </>
    );
}

export default CommentForm;