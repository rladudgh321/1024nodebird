import AppLayout from '@/components/AppLayout';
import React from 'react';
import PostForm from '@/components/PostForm';
import PostCard from '@/components/PostCard';
import { useSelector } from 'react-redux';

const Home = () => {
  const { me } = useSelector((state)=>state.user);
  const { mainPost } = useSelector((state)=>state.post);
  return (
    <>
      <AppLayout>
        { me && <PostForm /> }
        { mainPost.map((post)=> <PostCard post={post} key={post.id} /> ) }
      </AppLayout>
    </>
  );
}

export default Home;
