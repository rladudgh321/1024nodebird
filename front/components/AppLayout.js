import React, { useCallback } from 'react';
import { Menu, Input, Row, Col, Card } from 'antd';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import UserProfile from '@/components/UserProfile';
import LoginForm from '@/components/LoginForm';
import useInput from '@/hooks/useInput';
import Router from 'next/router';


const AppLayout = ({children}) => {
    const { me } = useSelector((state)=>state.user);
    const [onHashtag, onChangeHashtag] = useInput('');
    const onSearch = useCallback(()=>{
      Router.push(`/hashtag/${onHashtag}`)
    },[onHashtag]);
    const items = [
        {
          label: <Link href="/">노드버드</Link>,
          key: 'Home',
        },
        {
          label: <Link href='/profile'>프로필</Link>,
          key: 'profile',
        },
        {
          label: <Input.Search enterButton style={{ verticalAlign:'middle' }}
          value={onHashtag} onChange={onChangeHashtag} onSearch={onSearch}
          />,
          key: 'search',
        },
        {
          label: <Link href='/signup'>회원가입</Link>,
          key: 'signup',
        },
    ]
    return (
        <>
            <Menu items={items} mode='horizontal' />
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    { me ? <UserProfile /> : <LoginForm /> }
                </Col>
                <Col xs={24} md={12}>{children}</Col>
                <Col xs={24} md={6}>
                    <a href='https://www.naver.com' target='_blank' rel='noopener noreferrer'>네이버</a>
                </Col>
            </Row>
        </>
    );
}


export default AppLayout;