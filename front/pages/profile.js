import React, { useEffect } from 'react';
import AppLayout from '@/components/AppLayout';
import NicknameFormEdit from '@/components/NicknameFormEdit';
import FollowList from '@/components/FollowList';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const Profile = () => {
  const router = useRouter();
  const { me } = useSelector((state)=>state.user);
  useEffect(() => {
    if (!(me && me.id)) {
      router.push('/');
    }
  }, [me && me.id]);

  if (!me) {
    return null;
  }
  const Followings = useSelector((state)=>state.user.me?.Followings);
  const Followers = useSelector((state)=>state.user.me?.Followers);
  return (
    <>
      <AppLayout>
        <NicknameFormEdit />
        <FollowList header="팔로잉 목록" data={Followings}/>
        <FollowList header="팔로워 목록" data={Followers} />
      </AppLayout>
    </>
  );
}

export default Profile;