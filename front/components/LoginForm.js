import React, { useCallback } from 'react';
import { List, Input, Button, Form } from 'antd';
import useInput from '@/hooks/useInput';
import styled from '@emotion/styled'
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { LOG_IN_REQUEST } from '@/reducer/user';

const LoginForm = () => {
    const dispatch = useDispatch();
    const { loginLoading } = useSelector((state) => state.user)
    const [ id, setId ] = useInput('');
    const [ pwd, setPwd ] = useInput('');
    const SignUpButton = styled(Button)`
        float:right;
    `;
    const onSubmit = useCallback(()=>{
        console.log({id,pwd});
        dispatch({
            type:LOG_IN_REQUEST,
            data:{id,pwd}
        })
    },[id,pwd]);
    return (
        <>
            <List>
                <Form onFinish={onSubmit}>
                    <div>
                        <label htmlFor='id'>이메일</label>
                        <Input id='id' value={id} onChange={setId} />
                    </div>
                    <div>
                        <label htmlFor='pwd'>비밀번호</label>
                        <Input id='pwd' value={pwd} onChange={setPwd} />
                    </div>
                    <div>
                        <Button type='primary' htmlType='submit' loading={loginLoading} >로그인</Button>
                        <Link href='/signup'>
                            <SignUpButton>회원가입</SignUpButton>
                        </Link>
                    </div>
                </Form>
            </List>
        </>
    );
}

export default LoginForm;