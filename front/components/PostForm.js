import React, { useCallback, useRef, useEffect } from 'react';
import { Input, Button, Form } from 'antd';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import useInput from '@/hooks/useInput';
import { ADD_POST_REQUEST, REMOVE_POST_IMAGE, UPLOAD_IMAGE_REQUEST } from '@/reducer/post';

const baseUrl = 'http://127.0.0.1:3065';

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
    const onChangeImage = useCallback((e)=>{
        console.log('e.target.files', e.target.files);
        const formData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            formData.append('images', f);
        });
        dispatch({
            type: UPLOAD_IMAGE_REQUEST,
            data: formData
        })
    },[]);
    const onRemoveImage = useCallback((index) => () => {
        dispatch({
            type: REMOVE_POST_IMAGE,
            data: index,
        })
    },[]);
    const onSubmit = useCallback(()=>{
        dispatch({
            type:ADD_POST_REQUEST,
            data: { content:text, imagePaths }
        });
    },[text, imagePaths]);
    return (
        <>
            <Form onFinish={onSubmit} style={{ margin: 10 }} encType="multipart/form-data">
                <Input.TextArea maxLength={140} value={text} onChange={onChangeText} />
                <div>
                    {
                        imagePaths.map((v,i) => (
                            <div key={v} style={{display:'inline-block'}}>
                                <img src={`${baseUrl}/images/${v}`} alt={v} width='200px' />
                                <div>
                                    <Button onClick={onRemoveImage(i)}>지우기</Button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <input type='file' name='images' style={{display:'none'}} ref={onRef} onChange={onChangeImage} multiple />
                <Button onClick={uploadImage}>이미지 업로드</Button>
                <SubmitButton type='primary' htmlType='submit' loading={addPostLoading}>짹잭</SubmitButton>
            </Form>
        </>
    );
}

export default PostForm;