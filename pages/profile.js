import React from 'react';
import AppLayout from '@/components/AppLayout';
import NicknameFormEdit from '@/components/NicknameFormEdit';
import FollowList from '@/components/FollowList';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { Followings, Followers } = useSelector((state)=>state.user);

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