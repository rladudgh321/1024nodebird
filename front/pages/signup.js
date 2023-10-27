import AppLayout from '@/components/AppLayout';
import React, { useCallback, useEffect, useState } from 'react';
import { Input, Button, Form, Checkbox } from 'antd';
import useInput from '@/hooks/useInput';
import { useSelector, useDispatch } from 'react-redux';
import { SIGN_UP_REQUEST } from '@/reducer/user';
import styled from '@emotion/styled';
import Router from 'next/router';

const SignUp = () => {
  const dispatch = useDispatch();
  const { signupDone } = useSelector((state)=>state.user);
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [description, onChangeDescription] = useInput('');
  const [password, onChangePassword] = useInput('');
  
  const [passwordCheck, setPasswordCehck] = useState('');
  const [passwordError, setPasswordError] = useState(false); 
  const onChangePasswordCheck = useCallback((e)=>{
    setPasswordCehck(e.target.value);
    setPasswordError(false);
  },[]);
  const PwdError = styled.div`
    color:red;
  `;
  
  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e)=>{
    setTerm(e.target.checked);
    setTermError(false);
  },[]);
  const TermError = styled.div`
    color:red;
  `;
  
  const onSubmit = useCallback(()=>{
    if(password !== passwordCheck) {
      setPasswordError(true);
    }
    if(!term) {
      setTermError(true);
    }
    if((password === passwordCheck) && term && description ) {
      console.log({email, nickname, description, password, passwordCheck, term});
      dispatch({
        type: SIGN_UP_REQUEST,
        data: { email, password, nickname, description }
      })
    }
  },[email, password, nickname, description, passwordCheck, term]);
  useEffect(()=>{
    if(signupDone) {
      Router.push('/');
    }
  },[signupDone]);
  return (
    <>
      <AppLayout>
        <Form onFinish={onSubmit}>
          <div>
            <label htmlFor='email'>이메일</label>
            <Input id='email' value={email} onChange={onChangeEmail} placeholder='example@naver.com'/>
          </div>
          <div>
            <label htmlFor='nickname'>닉네임</label>
            <Input id='nickname' value={nickname} onChange={onChangeNickname} />
          </div>
          <div>
            <label htmlFor='description'>나는 어떤사람?</label>
            <Input id='description' value={description} onChange={onChangeDescription} placeholder='나는 행복한 사람입니다' />
          </div>
          <div>
            <label htmlFor='password'>비밀번호</label>
            <Input type='password' id='password' value={password} onChange={onChangePassword} />
          </div>
          <div>
            <label htmlFor='passwordCheck'>비밀번호 확인</label>
            <Input type='password' id='passwordCheck' value={passwordCheck} onChange={onChangePasswordCheck} />
            { passwordError && <PwdError>비밀번호가 다릅니다</PwdError> }
          </div>
          <div>
            <Checkbox checked={term} onChange={onChangeTerm}>약관에 동의합니다</Checkbox>
            { termError && <TermError>약관에 동의하셔야 가입됩니다</TermError> }
          </div>
          <div>
            <Button type='primary' htmlType='submit'>가입하기</Button>
          </div>
        </Form>
      </AppLayout>
    </>
  );
}

export default SignUp;