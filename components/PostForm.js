import React, { useCallback, useRef } from 'react';
import { Input, Button, Form } from 'antd';
import styled from '@emotion/styled';


const PostForm = () => {
    const onRef = useRef();
    const SubmitButton = styled(Button)`
        float:right;
    `;
    const uploadImage = useCallback(()=>{
        onRef.current.click();
    },[onRef.current]);
    return (
        <>
            <Form style={{ margin: 10 }}>
                <Input.TextArea maxLength={140} />
                <div>
                    이미지 미리보기
                </div>
                <input type='file' style={{display:'none'}} ref={onRef} />
                <Button onClick={uploadImage}>이미지 업로드</Button>
                <SubmitButton type='primary'>짹잭</SubmitButton>
            </Form>
        </>
    );
}

export default PostForm;