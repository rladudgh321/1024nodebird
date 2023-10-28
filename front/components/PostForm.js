import React, { useCallback, useRef, useEffect } from 'react';
import { Input, Button, Form } from 'antd';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import useInput from '@/hooks/useInput';
import { ADD_POST_REQUEST, REMOVE_POST_IMAGE } from '@/reducer/post';

const PostForm = () => {
    const dispatch = useDispatch();
    const { imagePaths, addPostLoading, addPostDone } = useSelector((state)=> state.post);
    const [ text, onChangeText, setter ] = useInput('');
    useEffect(()=>{
        if(addPostDone) {
            setter('');
        }
    },[addPostDone]);
    const onRef = useRef();
    const SubmitButton = styled(Button)`
        float:right;
    `;
    const uploadImage = useCallback(()=>{
        onRef.current.click();
    },[onRef.current]);
    const onSubmit = useCallback(()=>{
        dispatch({
            type:ADD_POST_REQUEST,
            data:text
        });
    },[text]);
    return (
        <>
            <Form onFinish={onSubmit} style={{ margin: 10 }} encType='multipart/forom-data'>
                <Input.TextArea maxLength={140} value={text} onChange={onChangeText} />
                <div>
                    {
                        imagePaths.map((v,i) => (
                            <div key={v} style={{display:'inline-block'}}>
                                <img src={v} alt={v} width='200px' />
                                <div>
                                    {console.log("button i", i)}
                                    <Button>지우기</Button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <input type='file' style={{display:'none'}} ref={onRef} />
                <Button onClick={uploadImage}>이미지 업로드</Button>
                <SubmitButton type='primary' htmlType='submit' loading={addPostLoading}>짹잭</SubmitButton>
            </Form>
        </>
    );
}

export default PostForm;