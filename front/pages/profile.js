import React, { useCallback, useEffect, useState } from 'react';
import AppLayout from '@/components/AppLayout';
import NicknameFormEdit from '@/components/NicknameFormEdit';
import FollowList from '@/components/FollowList';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import useSWR from 'swr';
import wrapper from '@/store/configureStore';
import { END } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST, UNFOLLOWING_REQUEST } from '@/reducer/user';

// if (error) return <div>failed to load</div>
// if (isLoading) return <div>loading...</div>
// return <div>hello {data.name}!</div>

const Profile = () => {
  const fetcher = (url) => axios.get(url, { withCredentials: true }).then((res) => res.data);
  const { me } = useSelector((state)=>state.user);
  const [followingsLimit, setFollowingsLimit] = useState(3);
  const [followersLimit, setFollowersLimit] = useState(3);

  const { data: followingsData, error: followingError, isLoading: followingLoading } = useSWR(`http://127.0.0.1:3065/user/followings?limit=${followingsLimit}`, fetcher);
  const { data: followersData, error: followerError, isLoading: followerLoading } = useSWR(`http://127.0.0.1:3065/user/followers?limit=${followersLimit}`, fetcher);

  console.log('followingsData', followingsData, followersData);

  
  const loadMoreFollowings = useCallback(()=>{
    setFollowingsLimit((prev) => prev +3);
  },[]);
  
  const loadMoreFollowers = useCallback(()=>{
    setFollowersLimit((prev) => prev +3);
  },[]);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  if (!me) {
    return <div>내정보 로딩중</div>;
  }
  if(followerError || followingError) {
    console.error(followerError || followingError);
    return <div>팔로잉/팔로워 로딩 중 에러가 발생합니다</div>;
  }
  // const Followings = useSelector((state)=>state.user.me?.Followings);
  // const Followers = useSelector((state)=>state.user.me?.Followers);
  return (
    <>
      <AppLayout>
        <NicknameFormEdit />
        <FollowList header="팔로잉 목록" data={followingsData} onClickMore={loadMoreFollowings} loading={followingLoading} />
        <FollowList header="팔로워 목록" data={followersData} onClickMore={loadMoreFollowers} loading={followerLoading}  />
      </AppLayout>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => 
async ({req}) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if(req && cookie) {
  axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch({
    type:LOAD_MY_INFO_REQUEST
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Profile;

