import AppLayout from '@/components/AppLayout';
import React, { useCallback, useState } from 'react';
import { Input, Button, Form, Checkbox } from 'antd';
import useInput from '@/hooks/useInput';
import { useDispatch } from 'react-redux';
import { SIGN_UP_REQUEST } from '@/reducer/user';
import styled from '@emotion/styled';

const SignUp = () => {
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
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
    if((password === passwordCheck) && term ) {
      console.log({email, password, passwordCheck, term});
      dispatch({
        type: SIGN_UP_REQUEST,
        data: { email, password, nickname }
      })
    }
  },[email, password, nickname, passwordCheck, term]);

  return (
    <>
      <AppLayout>
        <Form onFinish={onSubmit}>
          <div>
            <label htmlFor='email'>이메일</label>
            <Input id='email' value={email} onChange={onChangeEmail} />
          </div>
          <div>
            <label htmlFor='nickname'>닉네임</label>
            <Input id='nickname' value={nickname} onChange={onChangeNickname} />
          </div>
          <div>
            <label htmlFor='password'>비밀번호</label>
            <Input id='password' value={password} onChange={onChangePassword} />
          </div>
          <div>
            <label htmlFor='passwordCheck'>비밀번호 확인</label>
            <Input id='passwordCheck' value={passwordCheck} onChange={onChangePasswordCheck} />
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