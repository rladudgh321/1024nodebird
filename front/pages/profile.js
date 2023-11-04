import React, { useCallback, useEffect, useState } from 'react';
import AppLayout from '@/components/AppLayout';
import NicknameFormEdit from '@/components/NicknameFormEdit';
import FollowList from '@/components/FollowList';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url, { withCredentials:true }).then((result)=>result.data).catch((err)=>{ console.error(err); });
// if (error) return <div>failed to load</div>
// if (isLoading) return <div>loading...</div>
// return <div>hello {data.name}!</div>

const Profile = () => {
  const router = useRouter();
  const { me } = useSelector((state)=>state.user);
  const [followingsLimit, setFollowingsLimit] = useState(3);
  const [followersLimit, setFollowersLimit] = useState(3);

  const { data:followingsData, error:followingError, isLoading:followingLoading } = useSWR(`http://127.0.0.1:3065/user/followings?limit=${followingsLimit}`, fetcher);
  const { data:followersData, error:followerError, isLoading:followerLoading } = useSWR(`http://127.0.0.1:3065/user/followers?limit=${followersLimit}`, fetcher);
  console.log('followingsData', followingsData, followersData);

  useEffect(() => {
    if (!(me && me.id)) {
      router.push('/');
    }
  }, [me && me.id]);

  const loadMoreFollowings = useCallback(()=>{
    setFollowingsLimit((prev) => prev +3);
  },[]);

  const loadMoreFollowers = useCallback(()=>{
    setFollowersLimit((prev) => prev +3);
  },[]);

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

export default Profile;
