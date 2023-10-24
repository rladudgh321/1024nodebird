import AppLayout from '@/components/AppLayout';
import React, { useEffect } from 'react';
import PostForm from '@/components/PostForm';
import PostCard from '@/components/PostCard';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_POSTS_REQUEST } from '@/reducer/post';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state)=>state.user);
  const { mainPost } = useSelector((state)=>state.post);


  //10개 초기에 로딩
  useEffect(()=>{
    dispatch({
      type:LOAD_POSTS_REQUEST
    })
  },[]);
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
